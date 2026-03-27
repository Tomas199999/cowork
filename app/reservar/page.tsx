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
  MessageSquare,
  AlertCircle,
} from "lucide-react";

const WHATSAPP_ANDREA = "5491158846186";

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
  {
    key: "holistica",
    icon: Heart,
    name: "Holística",
    desc: "Terapias holísticas (sábados exclusivo)",
    color: "purple",
  },
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

function getDayOfWeek(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getDay(); // 0=domingo, 1=lunes, ..., 6=sábado
}

function getTimeSlotsForDay(dayOfWeek: number): string[] {
  if (dayOfWeek === 0) return []; // Domingo cerrado
  if (dayOfWeek === 6) {
    // Sábado 10 a 15 (último turno 14:00 a 15:00)
    return ["10:00", "11:00", "12:00", "13:00", "14:00"];
  }
  // Lunes a viernes 8 a 19 (último turno 18:00 a 19:00)
  return [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
  ];
}

function getBlockedSlots(dayOfWeek: number): { slots: string[]; reason: string }[] {
  const blocked: { slots: string[]; reason: string }[] = [];

  // Miércoles 15 a 19 - Oficina Técnica
  if (dayOfWeek === 3) {
    blocked.push({
      slots: ["15:00", "16:00", "17:00", "18:00"],
      reason: "Oficina Técnica",
    });
  }

  // Viernes 19 a 20 - Yoga
  if (dayOfWeek === 5) {
    blocked.push({
      slots: ["19:00"],
      reason: "Yoga",
    });
  }

  return blocked;
}

function getDayNote(dayOfWeek: number): string | null {
  if (dayOfWeek === 0) return "Domingos cerrado";
  if (dayOfWeek === 3) return "Miércoles de 15 a 19: Oficina Técnica (no disponible)";
  if (dayOfWeek === 5) return "Viernes 19 a 20: Yoga";
  if (dayOfWeek === 6) return "Sábados: exclusivamente holística. Solo se puede reservar el espacio Holística.";
  return null;
}

export default function ReservarPage() {
  const [step, setStep] = useState(1);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
  });

  // Read espacio from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const espacio = params.get("espacio");
    if (espacio && SPACES.some((s) => s.key === espacio)) {
      setSelectedSpace(espacio);
      setStep(2);
    }
  }, []);

  function toggleSlot(slot: string) {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  }

  function getEndTime(startTime: string) {
    const hour = parseInt(startTime.split(":")[0]) + 1;
    return `${hour.toString().padStart(2, "0")}:00`;
  }

  function handleWhatsApp() {
    const space = SPACES.find((s) => s.key === selectedSpace);
    const slotsText = selectedSlots
      .sort()
      .map((s) => `${s} a ${getEndTime(s)}`)
      .join(", ");
    const msg = encodeURIComponent(
      `Hola Andrea! Quiero reservar un turno en cowork.arquita:\n\n` +
        `📍 Espacio: ${space?.name}\n` +
        `📅 Fecha: ${formatDateDisplay(selectedDate)}\n` +
        `🕐 Horarios: ${slotsText}\n` +
        `👤 Nombre: ${formData.name}\n` +
        `📞 Teléfono: ${formData.phone}\n` +
        (formData.notes ? `📝 Notas: ${formData.notes}\n` : "")
    );
    window.open(`https://wa.me/${WHATSAPP_ANDREA}?text=${msg}`, "_blank");
  }

  const dayOfWeek = selectedDate ? getDayOfWeek(selectedDate) : -1;
  const isSaturday = dayOfWeek === 6;
  const isHolisticSpace = selectedSpace === "holistica";
  const spaceConflict = selectedDate
    ? (isSaturday && !isHolisticSpace) || (!isSaturday && isHolisticSpace)
    : false;
  const timeSlots = selectedDate && !spaceConflict ? getTimeSlotsForDay(dayOfWeek) : [];
  const blockedInfo = selectedDate ? getBlockedSlots(dayOfWeek) : [];
  const allBlockedSlots = blockedInfo.flatMap((b) => b.slots);
  const dayNote = selectedDate ? getDayNote(dayOfWeek) : null;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Reservar turno</h1>
          <p className="text-gray-300">
            Seleccioná tu espacio, día y horario. Se atiende siempre con cita previa.
          </p>
        </div>
      </section>

      {/* Horarios generales */}
      <div className="bg-teal-50 border-b border-teal-100">
        <div className="container-custom py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm text-teal-800">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Horarios:</span>
            </div>
            <span>Lunes a Viernes: 8 a 19 hs</span>
            <span>|</span>
            <span>Sábados: 10 a 15 hs</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            {[
              { num: 1, label: "Espacio" },
              { num: 2, label: "Día y horario" },
              { num: 3, label: "Confirmar por WhatsApp" },
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
              ¿Qué tipo de espacio necesitás?
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
              Elegí día y horario
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
                {dayNote && (
                  <div className="flex items-start gap-2 mt-3 text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{dayNote}</span>
                  </div>
                )}
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
                    Seleccioná una fecha primero
                  </p>
                ) : dayOfWeek === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="font-medium">Domingos cerrado</p>
                    <p className="text-sm">Elegí otro día</p>
                  </div>
                ) : spaceConflict ? (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                    {isSaturday && !isHolisticSpace ? (
                      <>
                        <p className="font-medium">Los sábados son exclusivamente para holística</p>
                        <p className="text-sm mt-1">Volvé al paso anterior y seleccioná el espacio &quot;Holística&quot;</p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium">El espacio Holística solo está disponible los sábados</p>
                        <p className="text-sm mt-1">Elegí un sábado o volvé al paso anterior y seleccioná otro espacio</p>
                      </>
                    )}
                    <button
                      onClick={() => { setStep(1); setSelectedSpace(null); }}
                      className="mt-4 text-teal-600 font-medium hover:underline text-sm"
                    >
                      Cambiar espacio
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => {
                      const isBlocked = allBlockedSlots.includes(slot);
                      const blockReason = blockedInfo.find((b) =>
                        b.slots.includes(slot)
                      )?.reason;
                      const isSelected = selectedSlots.includes(slot);
                      return (
                        <button
                          key={slot}
                          disabled={isBlocked}
                          onClick={() => toggleSlot(slot)}
                          title={isBlocked ? blockReason : undefined}
                          className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                            isBlocked
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
                {selectedDate && dayOfWeek !== 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    Podés seleccionar múltiples horarios. Los tachados no están disponibles.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Atrás
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

        {/* Step 3: Confirm and send WhatsApp */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-6">Confirmá y enviá por WhatsApp</h2>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-semibold text-sm text-gray-500 uppercase mb-3">Resumen de tu reserva</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Espacio:</span>{" "}
                  {SPACES.find((s) => s.key === selectedSpace)?.name}
                </p>
                <p>
                  <span className="font-medium">Fecha:</span>{" "}
                  {formatDateDisplay(selectedDate)}
                </p>
                <p>
                  <span className="font-medium">Horarios:</span>{" "}
                  {selectedSlots
                    .sort()
                    .map((s) => `${s} a ${getEndTime(s)}`)
                    .join(", ")}
                </p>
              </div>
            </div>

            <div className="max-w-lg space-y-4">
              <div>
                <label className="label flex items-center gap-2">
                  <User className="h-4 w-4" /> Tu nombre *
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
                  <Phone className="h-4 w-4" /> Teléfono *
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
                  <MessageSquare className="h-4 w-4" /> Notas (opcional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="input min-h-[80px]"
                  placeholder="Algún detalle adicional"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium inline-flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Atrás
                </button>
                <button
                  disabled={!formData.name || !formData.phone}
                  onClick={handleWhatsApp}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  Enviar por WhatsApp
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
