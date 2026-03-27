"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Calendar,
  Clock,
  Plus,
  Briefcase,
  Users,
  Heart,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

const spaceIcons: Record<string, any> = {
  oficina: Briefcase,
  aula_taller: Users,
  gabinete: Heart,
  consultorio: Sparkles,
};

const spaceNames: Record<string, string> = {
  oficina: "Oficina",
  aula_taller: "Aula Taller",
  gabinete: "Gabinete",
  consultorio: "Consultorio",
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  CONFIRMED: { label: "Confirmada", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelada", color: "bg-red-100 text-red-800", icon: XCircle },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardCliente() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings/my");
        if (res.ok) {
          const data = await res.json();
          setBookings(data.bookings || []);
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const upcoming = bookings.filter(
    (b) => b.status !== "CANCELLED" && new Date(b.date) >= new Date(new Date().toDateString())
  );
  const past = bookings.filter(
    (b) => b.status === "CANCELLED" || new Date(b.date) < new Date(new Date().toDateString())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Mi panel</h1>
              <p className="text-gray-600">
                Hola, {session?.user?.name || "Usuario"}
              </p>
            </div>
            <Link
              href="/reservar"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition font-medium flex items-center gap-2 text-sm"
            >
              <Plus className="h-4 w-4" /> Reservar turno
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="card p-4">
            <p className="text-2xl font-bold text-teal-600">{upcoming.length}</p>
            <p className="text-sm text-gray-600">Reservas proximas</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "CONFIRMED").length}
            </p>
            <p className="text-sm text-gray-600">Confirmadas</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "PENDING").length}
            </p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
        </div>

        {/* Proximas reservas */}
        <h2 className="text-lg font-bold mb-4">Proximas reservas</h2>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Cargando...</div>
        ) : upcoming.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No tenes reservas proximas</p>
            <Link
              href="/reservar"
              className="text-teal-600 font-medium"
            >
              Reservar un turno
            </Link>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {upcoming.map((booking) => {
              const status = statusConfig[booking.status] || statusConfig.PENDING;
              const SpaceIcon = spaceIcons[booking.space?.type?.toLowerCase()] || Briefcase;
              return (
                <div key={booking.id} className="card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <SpaceIcon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {spaceNames[booking.space?.type?.toLowerCase()] || booking.space?.name || "Espacio"}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {booking.startTime} - {booking.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Historial */}
        {past.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-4 mt-8">Historial</h2>
            <div className="space-y-3">
              {past.map((booking) => {
                const status = statusConfig[booking.status] || statusConfig.PENDING;
                return (
                  <div key={booking.id} className="card p-4 opacity-60">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-sm">
                          {spaceNames[booking.space?.type?.toLowerCase()] || booking.space?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {formatDate(booking.date)} | {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
