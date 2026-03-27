import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: any = { available: true };

    if (category && category !== "ALL") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { title: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    const professionals = await prisma.professional.findMany({
      where,
      include: {
        user: { select: { name: true, image: true } },
        reviews: { select: { rating: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = professionals.map((p) => ({
      id: p.id,
      userId: p.userId,
      name: p.user.name,
      image: p.user.image,
      title: p.title,
      bio: p.bio,
      category: p.category,
      location: p.location,
      hourlyRate: p.hourlyRate,
      experience: p.experience,
      available: p.available,
      rating:
        p.reviews.length > 0
          ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
          : 0,
      reviewCount: p.reviews.length,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return NextResponse.json(
      { error: "Error al obtener profesionales" },
      { status: 500 }
    );
  }
}
