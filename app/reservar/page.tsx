"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Calendar,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

const WHATSAPP_NUMBER = "5491140626107";

const SPACES = [
  {
    key: "oficina",
    icon: Briefcase,
    name: "Oficina",
    desc: "Espacio de trabajo profesional",
    color: "teal",
  },
  {
    key: "aula_taller",
    icon: Users,
    name: "Aula Taller",
    desc: "Talleres y capacitaciones",
    color: "amber",
  },
  {
    key: "gabinete",
    icon: Heart,
    name: "Gabinete",
    desc: "Terapias y sesiones privadas",
    color: "purple",
  },
  {
    key: "consultorio",
    icon: Sparkles,
    name: "Consultorio",
    desc: "Consultas y terapias alternativas",
    color: "rose",
  },
];

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const colorClasses: Record<string, { selected: string; hover: string }> = {
  teal: {
    selected: "border-teal-500 bg-teal-50 ring-2 ring-teal-500",
    hover: "hover:border-teal-300",
  },
  amber: {
    selected: "border-amber-500 bg-amber-50 ring-2 ring-amber-500",
    hover: "hover:border-amber-300",
  },
  purple: {
    selected: "border-purple-500 bg-purple-50 ring-2 ring-purple-500",
    hover: "hover:border-purple-300",
  },
  rose: {
    selected: "border-rose-500 bg-rose-50 ring-2 ring-rose-500",
    hover: "hover:border-rose-300",
  },
};

function getMinDate() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function formatDateDisplay(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ReservarPage() {
  const [step, setStep] = useState(1);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Read espacio from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const espacio = params.get("espacio");
    if (espacio && SPACES.some((s) => s.key === espacio)) {
      setSelectedSpace(espacio);
      setStep(2);
    }
  }, []);

  // Fetch booked slots when space and date change
  useEffect(() => {
    if (!selectedSpace || !selectedDate) return;

    async function fetchBookings() {
      try {
        const res = await fetch(
          `/api/bookings?spaceType=${selectedSpace}&date=${selectedDate}`
        );
        if (res.ok) {
          const data = await res.json();
          setBookedSlots(data.bookedSlots || []);
        }
      } catch {
        // API not available, all slots available
        setBookedSlots([]);
      }
    }

    fetchBookings();
  }, [selectedSpace, selectedDate]);

  function toggleSlot(slot: string) {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  }

  function getEndTime(startTime: string) {
    const hour = parseInt(startTime.split(":")[0]) + 1;
    return `${hour.toString().padStart(2, "0")}:00`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const space = SPACES.find((s) => s.key === selectedSpace);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceType: selectedSpace,
          date: selectedDate,
          slots: selectedSlots,
          clientName: formData.name,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          notes: formData.notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al crear la reserva");
      }

      setSuccess(true);
    } catch {
      // If API fails, redirect to WhatsApp as fallback
      const slotsText = selectedSlots
        .sort()
        .map((s) => `${s} a ${getEndTime(s)}`)
        .join(", ");
      const msg = encodeURIComponent(
        `Hola! Quiero reservar un turno en cowork.arquita:\n\n` +
          `Espacio: ${space?.name}\n` +
          `Fecha: ${formatDateDisplay(selectedDate)}\n` +
          `Horarios: ${slotsText}\n` +
          `Nombre: ${formData.name}\n` +
          `Telefono: ${formData.phone}\n` +
          (formData.notes ? `Notas: ${formData.notes}\n` : "")
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    const space = SPACES.find((s) => s.key === selectedSpace);
    const slotsText = selectedSlots
      .sort()
      .map((s) => `${s} a ${getEndTime(s)}`)
      .join(", ");
    const whatsappMsg = encodeURIComponent(
      `Hola! Reservé un turno en cowork.arquita:\n\n` +
        `Espacio: ${space?.name}\n` +
        `Fecha: ${formatDateDisplay(selectedDate)}\n` +
        `Horarios: ${slotsText}\n` +
        `Nombre: ${formData.name}\n` +
        `Telefono: ${formData.phone}`
    );

    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Reserva enviada!</h1>
          <p className="text-gray-600 mb-2">
            Tu solicitud de reserva fue registrada. Te confirmaremos a la
            brevedad.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm mb-6">
            <p>
              <span className="font-medium">Espacio:</span> {space?.name}
            </p>
            <p>
              <span className="font-medium">Fecha:</span>{" "}
              {formatDateDisplay(selectedDate)}
            </p>
            <p>
              <span className="font-medium">Horarios:</span> {slotsText}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-medium inline-flex items-center justify-center gap-2"
            >
              Confirmar por WhatsApp
            </a>
            <button
              onClick={() => {
                setSuccess(false);
                setStep(1);
                setSelectedSpace(null);
                setSelectedDate("");
                setSelectedSlots([]);
                setFormData({ name: "", phone: "", email: "", notes: "" });
              }}
              className="text-teal-600 font-medium hover:underline"
            >
              Hacer otra reserva
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Reservar turno</h1>
          <p className="text-gray-300">
            Selecciona tu espacio, dia y horario en simples pasos
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            {[
              { num: 1, label: "Espacio" },
              { num: 2, label: "Dia y horario" },
              { num: 3, label: "Datos de contacto" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`h-px w-8 ${step >= s.num ? "bg-teal-500" : "bg-gray-300"}`}
                  />
                )}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s.num
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.num ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={`text-sm hidden sm:inline ${step >= s.num ? "text-teal-600 font-medium" : "text-gray-500"}`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Step 1: Select space */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-6">
              Que tipo de espacio necesitas?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {SPACES.map((space) => {
                const colors = colorClasses[space.color];
                const isSelected = selectedSpace === space.key;
                return (
                  <button
                    key={space.key}
                    onClick={() => setSelectedSpace(space.key)}
                    className={`card p-6 text-left transition-all ${
                      isSelected ? colors.selected : colors.hover
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <space.icon
                        className={`h-8 w-8 flex-shrink-0 ${isSelected ? "text-gray-900" : "text-gray-400"}`}
                      />
                      <div>
                        <h3 className="font-bold text-lg">{space.name}</h3>
                        <p className="text-gray-600 text-sm">{space.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end mt-8">
              <button
                disabled={!selectedSpace}
                onClick={() => setStep(2)}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select date and time */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-6">
              Elegí dia y horario
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Date */}
              <div>
                <label className="label flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4" />
                  Fecha
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedSlots([]);
                  }}
                  className="input"
                />
              </div>

              {/* Time slots */}
              <div>
                <label className="label flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4" />
                  Horarios disponibles
                  {selectedSlots.length > 0 && (
                    <span className="text-teal-600 text-xs font-normal">
                      ({selectedSlots.length}{" "}
                      {selectedSlots.length === 1 ? "hora" : "horas"}{" "}
                      seleccionada{selectedSlots.length === 1 ? "" : "s"})
                    </span>
                  )}
                </label>
                {!selectedDate ? (
                  <p className="text-gray-400 text-sm py-4">
                    Selecciona una fecha primero
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = selectedSlots.includes(slot);
                      return (
                        <button
                          key={slot}
                          disabled={isBooked}
                          onClick={() => toggleSlot(slot)}
                          className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                            isBooked
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                              : isSelected
                                ? "bg-teal-600 text-white ring-2 ring-teal-600 ring-offset-1"
                                : "bg-white border border-gray-300 hover:border-teal-400 hover:bg-teal-50"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}
                {selectedDate && (
                  <p className="text-xs text-gray-400 mt-2">
                    Podes seleccionar multiples horarios. Los tachados ya estan reservados.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Atras
              </button>
              <button
                disabled={!selectedDate || selectedSlots.length === 0}
                onClick={() => setStep(3)}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact info */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-6">Datos de contacto</h2>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Espacio:</span>
                  {SPACES.find((s) => s.key === selectedSpace)?.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Fecha:</span>
                  {formatDateDisplay(selectedDate)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Horarios:</span>
                  {selectedSlots
                    .sort()
                    .map((s) => `${s}-${getEndTime(s)}`)
                    .join(", ")}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
              <div>
                <label className="label flex items-center gap-2">
                  <User className="h-4 w-4" /> Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="label flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Telefono *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="input"
                  placeholder="11 1234-5678"
                />
              </div>

              <div>
                <label className="label flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input"
                  placeholder="tu@email.com (opcional)"
                />
              </div>

              <div>
                <label className="label flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Notas
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="input min-h-[80px]"
                  placeholder="Algun detalle adicional (opcional)"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium inline-flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Atras
                </button>
                <button
                  type="submit"
                  disabled={submitting || !formData.name || !formData.phone}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {submitting ? "Enviando..." : "Confirmar reserva"}
                  {!submitting && <CheckCircle2 className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
