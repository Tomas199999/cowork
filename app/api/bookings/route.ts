import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Fetch booked slots for a space and date
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const spaceType = searchParams.get("spaceType");
    const date = searchParams.get("date");

    if (!spaceType || !date) {
      return NextResponse.json(
        { error: "spaceType y date son requeridos" },
        { status: 400 }
      );
    }

    const startOfDay = new Date(date + "T00:00:00");
    const endOfDay = new Date(date + "T23:59:59");

    // Find spaces of the given type
    const spaces = await prisma.space.findMany({
      where: {
        type: spaceType.toUpperCase() as any,
      },
      select: { id: true },
    });

    const spaceIds = spaces.map((s) => s.id);

    // Find bookings for those spaces on the given date
    const bookings = await prisma.booking.findMany({
      where: {
        spaceId: { in: spaceIds },
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: { not: "CANCELLED" },
      },
      select: { startTime: true },
    });

    const bookedSlots = bookings.map((b) => b.startTime);

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Error al obtener las reservas" },
      { status: 500 }
    );
  }
}

// POST - Create a new booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { spaceType, date, slots, clientName, clientEmail, clientPhone, notes } = body;

    if (!spaceType || !date || !slots?.length || !clientName || !clientPhone) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Find a space of the given type
    let space = await prisma.space.findFirst({
      where: {
        type: spaceType.toUpperCase() as any,
        available: true,
      },
    });

    // If no space exists yet, create one
    if (!space) {
      const spaceNames: Record<string, string> = {
        oficina: "Oficina",
        aula_taller: "Aula Taller",
        gabinete: "Gabinete",
        consultorio: "Consultorio",
      };
      space = await prisma.space.create({
        data: {
          name: spaceNames[spaceType] || spaceType,
          type: spaceType.toUpperCase() as any,
          description: `Espacio de ${spaceNames[spaceType] || spaceType}`,
          capacity: 1,
          pricePerHour: 0,
        },
      });
    }

    const bookingDate = new Date(date + "T00:00:00");

    // Check for conflicts
    const existing = await prisma.booking.findMany({
      where: {
        spaceId: space.id,
        date: bookingDate,
        startTime: { in: slots },
        status: { not: "CANCELLED" },
      },
    });

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Algunos horarios ya estan reservados" },
        { status: 409 }
      );
    }

    // Create bookings for each slot
    const bookings = await Promise.all(
      (slots as string[]).map((slot: string) => {
        const hour = parseInt(slot.split(":")[0]) + 1;
        const endTime = `${hour.toString().padStart(2, "0")}:00`;
        return prisma.booking.create({
          data: {
            spaceId: space!.id,
            date: bookingDate,
            startTime: slot,
            endTime,
            clientName,
            clientEmail: clientEmail || "",
            clientPhone,
            notes: notes || null,
          },
        });
      })
    );

    return NextResponse.json({ success: true, bookings }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Error al crear la reserva" },
      { status: 500 }
    );
  }
}
