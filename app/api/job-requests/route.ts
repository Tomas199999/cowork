import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const role = (session.user as any).role;

    let jobRequests;

    if (role === "PROFESSIONAL") {
      const professional = await prisma.professional.findUnique({
        where: { userId },
      });
      if (!professional) {
        return NextResponse.json([]);
      }
      jobRequests = await prisma.jobRequest.findMany({
        where: { professionalId: professional.id },
        include: { client: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else {
      jobRequests = await prisma.jobRequest.findMany({
        where: { clientId: userId },
        include: {
          professional: {
            include: { user: { select: { name: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(jobRequests);
  } catch (error) {
    console.error("Error fetching job requests:", error);
    return NextResponse.json(
      { error: "Error al obtener solicitudes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();

    const { professionalId, serviceType, description, location, preferredDate, budget } = body;

    if (!professionalId || !serviceType || !description || !location) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const jobRequest = await prisma.jobRequest.create({
      data: {
        clientId: userId,
        professionalId,
        serviceType,
        description,
        location,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        budget: budget ? parseFloat(budget) : null,
      },
    });

    return NextResponse.json(jobRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating job request:", error);
    return NextResponse.json(
      { error: "Error al crear solicitud" },
      { status: 500 }
    );
  }
}
