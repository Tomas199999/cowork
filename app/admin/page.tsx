"use client";

import { useState, useEffect } from "react";
import { Trash2, Calendar, Clock, User, MapPin } from "lucide-react";

interface Booking {
  id: string;
  spaceId: string;
  date: string;
  startTime: string;
  endTime: string;
  clientName: string;
  clientPhone: string;
  notes: string | null;
  status: string;
  createdAt: string;
  space: {
    name: string;
    type: string;
  };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch {
      // error
    }
    setLoading(false);
  }

  async function deleteBooking(id: string) {
    if (!confirm("¿Seguro que querés eliminar esta reserva?")) return;
    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b.id !== id));
      }
    } catch {
      // error
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchBookings();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === "1926") {
                setAuthenticated(true);
              } else {
                alert("Contraseña incorrecta");
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="input w-full"
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-medium"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // Group bookings by date
  const grouped = bookings.reduce(
    (acc, b) => {
      const dateKey = b.date.split("T")[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(b);
      return acc;
    },
    {} as Record<string, Booking[]>
  );

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Panel de administración</h1>
          <p className="text-gray-300 text-sm mt-1">
            Gestionar reservas ({bookings.length} total)
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-gray-500 text-center py-12">Cargando reservas...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No hay reservas</p>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((dateKey) => (
              <div key={dateKey}>
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  {formatDate(dateKey)}
                </h2>
                <div className="space-y-3">
                  {grouped[dateKey]
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">
                              {booking.startTime} - {booking.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{booking.space?.name || "Espacio"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{booking.clientName}</span>
                          </div>
                          <span className="text-gray-400">
                            {booking.clientPhone}
                          </span>
                          {booking.notes && (
                            <span className="text-gray-400 italic">
                              {booking.notes}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Eliminar reserva"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
