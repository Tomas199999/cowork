"use client";

import { useState, useEffect } from "react";
import { Trash2, Calendar, Clock, User, MapPin, Plus, X } from "lucide-react";

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
  const [showForm, setShowForm] = useState(false);
  const [newBooking, setNewBooking] = useState({
    spaceType: "oficina",
    date: "",
    startHour: "08",
    hours: 1,
    clientName: "",
    clientPhone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

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

  async function createBooking() {
    setSubmitting(true);
    try {
      const slots: string[] = [];
      for (let i = 0; i < newBooking.hours; i++) {
        slots.push(`${(parseInt(newBooking.startHour) + i).toString().padStart(2, "0")}:00`);
      }
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceType: newBooking.spaceType,
          date: newBooking.date,
          slots,
          clientName: newBooking.clientName,
          clientEmail: "",
          clientPhone: newBooking.clientPhone,
          notes: newBooking.notes,
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setNewBooking({ spaceType: "oficina", date: "", startHour: "08", hours: 1, clientName: "", clientPhone: "", notes: "" });
        fetchBookings();
      } else {
        const data = await res.json();
        alert(data.error || "Error al crear la reserva");
      }
    } catch {
      alert("Error al crear la reserva");
    }
    setSubmitting(false);
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

  // Group consecutive bookings from same client into one entry
  interface GroupedBooking {
    ids: string[];
    startTime: string;
    endTime: string;
    clientName: string;
    clientPhone: string;
    notes: string | null;
    spaceName: string;
  }

  function groupConsecutive(dayBookings: Booking[]): GroupedBooking[] {
    const sorted = [...dayBookings].sort((a, b) => a.startTime.localeCompare(b.startTime));
    const groups: GroupedBooking[] = [];

    for (const b of sorted) {
      const last = groups[groups.length - 1];
      if (
        last &&
        last.clientName === b.clientName &&
        last.clientPhone === b.clientPhone &&
        last.spaceName === (b.space?.name || "Espacio") &&
        last.endTime === b.startTime
      ) {
        last.ids.push(b.id);
        last.endTime = b.endTime;
      } else {
        groups.push({
          ids: [b.id],
          startTime: b.startTime,
          endTime: b.endTime,
          clientName: b.clientName,
          clientPhone: b.clientPhone,
          notes: b.notes,
          spaceName: b.space?.name || "Espacio",
        });
      }
    }
    return groups;
  }

  // Group bookings by date (use T12:00 stored dates, extract date part)
  const grouped = bookings.reduce(
    (acc, b) => {
      // Handle timezone: stored as UTC, display as Argentina time
      const d = new Date(b.date);
      const dateKey = new Date(d.getTime() - 3 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
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
        {/* Botón nueva reserva */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition font-medium inline-flex items-center gap-2"
          >
            {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showForm ? "Cancelar" : "Nueva reserva"}
          </button>
        </div>

        {/* Formulario nueva reserva */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Crear reserva</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Espacio</label>
                <select
                  value={newBooking.spaceType}
                  onChange={(e) => setNewBooking({ ...newBooking, spaceType: e.target.value })}
                  className="input w-full"
                >
                  <option value="oficina">Oficina</option>
                  <option value="aula_taller">Aula Taller</option>
                  <option value="gabinete_consultorio">Gabinete/Consultorio</option>
                  <option value="holistica">Holística</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Fecha</label>
                <input
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Hora inicio</label>
                <select
                  value={newBooking.startHour}
                  onChange={(e) => setNewBooking({ ...newBooking, startHour: e.target.value })}
                  className="input w-full"
                >
                  {Array.from({ length: 11 }, (_, i) => i + 8).map((h) => (
                    <option key={h} value={h.toString().padStart(2, "0")}>
                      {h.toString().padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Horas</label>
                <input
                  type="number"
                  min={1}
                  max={11}
                  value={newBooking.hours}
                  onChange={(e) => setNewBooking({ ...newBooking, hours: parseInt(e.target.value) || 1 })}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Nombre cliente</label>
                <input
                  type="text"
                  value={newBooking.clientName}
                  onChange={(e) => setNewBooking({ ...newBooking, clientName: e.target.value })}
                  className="input w-full"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={newBooking.clientPhone}
                  onChange={(e) => setNewBooking({ ...newBooking, clientPhone: e.target.value })}
                  className="input w-full"
                  placeholder="11 1234-5678"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Notas (opcional)</label>
              <input
                type="text"
                value={newBooking.notes}
                onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                className="input w-full"
                placeholder="Notas adicionales"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                disabled={submitting || !newBooking.date || !newBooking.clientName || !newBooking.clientPhone}
                onClick={createBooking}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? "Creando..." : "Crear reserva"}
              </button>
            </div>
          </div>
        )}

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
                  {groupConsecutive(grouped[dateKey]).map((group) => {
                    const hours = group.ids.length;
                    return (
                      <div
                        key={group.ids[0]}
                        className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">
                              {group.startTime} - {group.endTime} ({hours}h)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{group.spaceName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{group.clientName}</span>
                          </div>
                          <span className="text-gray-400">
                            {group.clientPhone}
                          </span>
                          {group.notes && (
                            <span className="text-gray-400 italic">
                              {group.notes}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={async () => {
                            if (!confirm("¿Seguro que querés eliminar esta reserva?")) return;
                            for (const id of group.ids) {
                              await fetch(`/api/admin/bookings?id=${id}`, { method: "DELETE" });
                            }
                            setBookings(bookings.filter((b) => !group.ids.includes(b.id)));
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Eliminar reserva"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
