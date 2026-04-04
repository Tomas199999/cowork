"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Briefcase,
  Users,
  Heart,
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
    key: "gabinete_consultorio",
    icon: Heart,
    name: "Gabinete/Consultorio",
    desc: "Terapias, sesiones privadas y consultas",
    color: "purple",
  },
  {
    key: "holistica",
    icon: Heart,
    name: "Holística",
    desc: "Terapias holísticas",
    color: "purple",
  },
];



function getToday() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toDateStr(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function CalendarPicker({
  value,
  onChange,
  saturdaysOnly,
}: {
  value: string;
  onChange: (dateStr: string) => void;
  saturdaysOnly: boolean;
}) {
  const today = getToday();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const firstDay = new Date(viewYear, viewMonth, 1);
  // Lunes = 0, Domingo = 6
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="font-semibold text-sm">
          {monthNames[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-1">
        <span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sá</span><span>Do</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const dateStr = toDateStr(date);
          const isPast = date < today;
          const isSunday = date.getDay() === 0;
          const isSaturday = date.getDay() === 6;
          const disabled = isPast || isSunday || (saturdaysOnly && !isSaturday);
          const isSelected = value === dateStr;

          return (
            <button
              key={dateStr}
              disabled={disabled}
              onClick={() => onChange(dateStr)}
              className={`py-1.5 rounded text-sm transition-all ${
                isSelected
                  ? "bg-teal-600 text-white font-bold"
                  : disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : saturdaysOnly && isSaturday
                      ? "text-teal-700 font-semibold hover:bg-teal-100 bg-teal-50"
                      : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      {saturdaysOnly && (
        <p className="text-xs text-amber-600 mt-2 text-center">Solo sábados disponibles para Holística</p>
      )}
    </div>
  );
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

  return blocked;
}

function getDayNote(dayOfWeek: number): string | null {
  if (dayOfWeek === 0) return "Domingos cerrado";
  if (dayOfWeek === 3) return "Miércoles de 15 a 19: Oficina Técnica (no disponible)";
  if (dayOfWeek === 5) return "Viernes 19 a 20: Yoga (fuera de horario de reservas)";
  if (dayOfWeek === 6) return "Sábados: 10 a 15 hs. Se atiende con turno previo.";
  return null;
}

export default function ReservarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ReservarContent />
    </Suspense>
  );
}

function ReservarContent() {
  const [step, setStep] = useState(1); // 1 = día/horario, 2 = confirmar WhatsApp
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStart, setSelectedStart] = useState<string>("");
  const [selectedHours, setSelectedHours] = useState<number>(3);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
  });

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
        setBookedSlots([]);
      }
    }
    fetchBookings();
  }, [selectedSpace, selectedDate]);

  const searchParams = useSearchParams();

  // Read espacio from URL and react to changes
  useEffect(() => {
    const espacio = searchParams.get("espacio");
    if (espacio && SPACES.some((s) => s.key === espacio)) {
      setSelectedSpace(espacio);
      setSelectedDate("");
      setSelectedStart("");
      setSelectedHours(3);
      setSelectedSlots([]);
      setStep(1);
    }
  }, [searchParams]);

  function getSlotsFromStart(start: string, hours: number): string[] {
    const startHour = parseInt(start.split(":")[0]);
    const slots: string[] = [];
    for (let i = 0; i < hours; i++) {
      slots.push(`${(startHour + i).toString().padStart(2, "0")}:00`);
    }
    return slots;
  }

  function getMaxHoursFrom(start: string, available: string[]): number {
    const startHour = parseInt(start.split(":")[0]);
    let max = 0;
    for (let i = 0; i < 12; i++) {
      const slot = `${(startHour + i).toString().padStart(2, "0")}:00`;
      if (!available.includes(slot)) break;
      max++;
    }
    return max;
  }

  // Update selectedSlots when start or hours change
  useEffect(() => {
    if (selectedStart && selectedHours >= 3) {
      setSelectedSlots(getSlotsFromStart(selectedStart, selectedHours));
    } else {
      setSelectedSlots([]);
    }
  }, [selectedStart, selectedHours]);



  async function handleWhatsApp() {
    const space = SPACES.find((s) => s.key === selectedSpace);

    // Guardar reserva en la base de datos
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceType: selectedSpace,
          date: selectedDate,
          slots: selectedSlots,
          clientName: formData.name,
          clientEmail: "",
          clientPhone: formData.phone,
          notes: formData.notes,
        }),
      });
    } catch {
      // Si falla la API, igual abrimos WhatsApp
    }

    const endTime = `${(parseInt(selectedStart.split(":")[0]) + selectedHours).toString().padStart(2, "0")}:00`;
    const msg = encodeURIComponent(
      `Hola Andrea! Quiero reservar un turno en cowork.arquita:\n\n` +
        `Espacio: ${space?.name}\n` +
        `Fecha: ${formatDateDisplay(selectedDate)}\n` +
        `Horario: ${selectedStart} a ${endTime} (${selectedHours} horas)\n` +
        `Nombre: ${formData.name}\n` +
        `Telefono: ${formData.phone}\n` +
        (formData.notes ? `Notas: ${formData.notes}\n` : "")
    );
    window.open(`https://wa.me/${WHATSAPP_ANDREA}?text=${msg}`, "_blank");
    window.location.href = "/";
  }

  const dayOfWeek = selectedDate ? getDayOfWeek(selectedDate) : -1;
  const isHolistica = selectedSpace === "holistica";
  const timeSlots = selectedDate ? getTimeSlotsForDay(dayOfWeek) : [];
  const blockedInfo = selectedDate ? getBlockedSlots(dayOfWeek) : [];
  const allBlockedSlots = [...blockedInfo.flatMap((b) => b.slots), ...bookedSlots];
  const dayNote = selectedDate ? getDayNote(dayOfWeek) : null;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Reservar turno</h1>
          <p className="text-gray-300">
            Seleccioná tu espacio, día y horario. Se trabaja con reserva anticipada (mínimo 3 horas).
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
              { num: 1, label: "Día y horario" },
              { num: 2, label: "Confirmar por WhatsApp" },
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
        {/* Step 1: Select date and time */}
        {step === 1 && (
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
                <CalendarPicker
                  value={selectedDate}
                  onChange={(dateStr) => {
                    setSelectedDate(dateStr);
                    setSelectedStart("");
                    setSelectedHours(3);
                    setSelectedSlots([]);
                  }}
                  saturdaysOnly={isHolistica}
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
                  Horario y duración
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
                ) : (
                  <div className="space-y-4">
                    {/* Hora de inicio */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Hora de inicio
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((slot) => {
                          const isBlocked = allBlockedSlots.includes(slot);
                          const maxFromHere = getMaxHoursFrom(
                            slot,
                            timeSlots.filter((s) => !allBlockedSlots.includes(s))
                          );
                          const notEnough = maxFromHere < 3;
                          const disabled = isBlocked || notEnough;
                          const isSelected = selectedStart === slot;
                          return (
                            <button
                              key={slot}
                              disabled={disabled}
                              onClick={() => {
                                setSelectedStart(slot);
                                const max = getMaxHoursFrom(
                                  slot,
                                  timeSlots.filter((s) => !allBlockedSlots.includes(s))
                                );
                                setSelectedHours(Math.min(3, max));
                              }}
                              title={
                                isBlocked
                                  ? "Horario reservado"
                                  : notEnough
                                    ? "No hay 3 horas consecutivas disponibles desde acá"
                                    : undefined
                              }
                              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                                disabled
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
                    </div>

                    {/* Cantidad de horas */}
                    {selectedStart && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Cantidad de horas (mínimo 3)
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            disabled={selectedHours <= 3}
                            onClick={() => setSelectedHours(selectedHours - 1)}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="text-2xl font-bold text-teal-600 w-12 text-center">
                            {selectedHours}
                          </span>
                          <button
                            disabled={
                              selectedHours >=
                              getMaxHoursFrom(
                                selectedStart,
                                timeSlots.filter((s) => !allBlockedSlots.includes(s))
                              )
                            }
                            onClick={() => setSelectedHours(selectedHours + 1)}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                          <span className="text-sm text-gray-500">
                            {selectedStart} a{" "}
                            {`${(parseInt(selectedStart.split(":")[0]) + selectedHours).toString().padStart(2, "0")}:00`}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Resumen visual */}
                    {selectedStart && selectedSlots.length >= 3 && (
                      <div className="bg-teal-50 rounded-lg p-3 text-sm text-teal-800">
                        Reserva de <strong>{selectedHours} horas</strong>: {selectedStart} a{" "}
                        {`${(parseInt(selectedStart.split(":")[0]) + selectedHours).toString().padStart(2, "0")}:00`}
                      </div>
                    )}

                    <p className="text-xs text-gray-400">
                      Reserva mínima: 3 horas. Los horarios tachados no están disponibles.
                    </p>
                    {dayOfWeek === 3 && (
                      <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-700 mt-2">
                        Miércoles: Oficina Técnica ocupa de 15 a 19 hs. Último horario de inicio disponible: 12:00 (reserva hasta las 15:00).
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                disabled={!selectedDate || selectedSlots.length < 3}
                onClick={() => setStep(2)}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Confirm and send WhatsApp */}
        {step === 2 && (
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
                  <span className="font-medium">Horario:</span>{" "}
                  {selectedStart} a{" "}
                  {`${(parseInt(selectedStart.split(":")[0]) + selectedHours).toString().padStart(2, "0")}:00`}{" "}
                  ({selectedHours} horas)
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
                  onClick={() => setStep(1)}
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
