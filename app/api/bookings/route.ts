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

    const spaceTypeUpper = spaceType.toUpperCase();

    // Find spaces of the given type
    const spaces = await prisma.space.findMany({
      where: { type: spaceTypeUpper },
      select: { id: true },
    });

    const spaceIds = spaces.map((s) => s.id);

    if (spaceIds.length === 0) {
      return NextResponse.json({ bookedSlots: [] });
    }

    // Wide range to handle timezone differences (Argentina is UTC-3)
    const dayBefore = new Date(date + "T00:00:00.000Z");
    dayBefore.setDate(dayBefore.getDate() - 1);
    const dayAfter = new Date(date + "T23:59:59.999Z");
    dayAfter.setDate(dayAfter.getDate() + 1);

    const bookings = await prisma.booking.findMany({
      where: {
        spaceId: { in: spaceIds },
        date: {
          gte: dayBefore,
          lte: dayAfter,
        },
        status: { not: "CANCELLED" },
      },
      select: { startTime: true, date: true },
    });

    // Filter bookings that match the requested date (handle timezone)
    const requestedDate = date; // "YYYY-MM-DD"
    const filteredBookings = bookings.filter((b) => {
      const bDate = new Date(b.date);
      const bDateStr = bDate.toISOString().split("T")[0];
      // Also check with timezone offset for Argentina (UTC-3)
      const bDateLocal = new Date(bDate.getTime() - 3 * 60 * 60 * 1000);
      const bDateLocalStr = bDateLocal.toISOString().split("T")[0];
      return bDateStr === requestedDate || bDateLocalStr === requestedDate;
    });

    const bookedSlots = filteredBookings.map((b) => b.startTime);

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

    const spaceTypeUpper = spaceType.toUpperCase();

    // Find a space of the given type
    let space = await prisma.space.findFirst({
      where: {
        type: spaceTypeUpper,
        available: true,
      },
    });

    // If no space exists yet, create one
    if (!space) {
      const spaceNames: Record<string, string> = {
        oficina: "Oficina",
        aula_taller: "Aula Taller",
        gabinete_consultorio: "Gabinete/Consultorio",
        holistica: "Holística",
      };
      space = await prisma.space.create({
        data: {
          name: spaceNames[spaceType] || spaceType,
          type: spaceTypeUpper,
          description: `Espacio de ${spaceNames[spaceType] || spaceType}`,
          capacity: 1,
          pricePerHour: 0,
        },
      });
    }

    const bookingDate = new Date(date + "T12:00:00.000Z");

    // Check for conflicts - wide range to handle timezone
    const startOfDay = new Date(date + "T00:00:00.000Z");
    const endOfDay = new Date(date + "T23:59:59.999Z");

    const existing = await prisma.booking.findMany({
      where: {
        spaceId: space.id,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
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
