import Link from "next/link";
import {
  Briefcase,
  Users,
  Heart,
  Sparkles,
  Wifi,
  Coffee,
  AirVent,
  Monitor,
  Armchair,
  Lock,
  ArrowRight,
  Clock,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espacios - cowork.arquita",
  description:
    "Alquiler de espacios de trabajo en modulos horarios: oficina, aula taller, gabinete y consultorio. Coworking profesional en Buenos Aires.",
};

const spaces = [
  {
    icon: Briefcase,
    name: "Oficina",
    desc: "Espacio de trabajo profesional equipado con escritorio, silla ergonomica, buena iluminacion y conectividad. Ideal para profesionales independientes, freelancers y pequenos equipos que buscan un ambiente productivo.",
    amenities: [
      { icon: Wifi, label: "Wi-Fi de alta velocidad" },
      { icon: Monitor, label: "Escritorio equipado" },
      { icon: Coffee, label: "Acceso a cocina" },
      { icon: AirVent, label: "Climatizacion" },
    ],
    color: "teal",
    ideal: "Freelancers, profesionales independientes, equipos de trabajo",
  },
  {
    icon: Users,
    name: "Aula Taller",
    desc: "Espacio amplio y versatil para talleres, capacitaciones, cursos, workshops y actividades grupales. Configuracion flexible que se adapta a distintos formatos de encuentro.",
    amenities: [
      { icon: Users, label: "Capacidad grupal" },
      { icon: Monitor, label: "Pantalla/proyector" },
      { icon: Armchair, label: "Mobiliario flexible" },
      { icon: AirVent, label: "Climatizacion" },
    ],
    color: "amber",
    ideal: "Docentes, capacitadores, facilitadores de talleres",
  },
  {
    icon: Heart,
    name: "Gabinete",
    desc: "Espacio privado y tranquilo, pensado para profesionales de la salud mental, terapeutas y coaches. Ambiente acogedor que garantiza confidencialidad y comodidad para sesiones individuales o de pareja.",
    amenities: [
      { icon: Lock, label: "Privacidad total" },
      { icon: Armchair, label: "Ambiente acogedor" },
      { icon: AirVent, label: "Climatizacion" },
      { icon: Coffee, label: "Acceso a cocina" },
    ],
    color: "purple",
    ideal: "Psicologos, terapeutas, coaches, mediadores",
  },
  {
    icon: Sparkles,
    name: "Consultorio",
    desc: "Consultorio equipado para consultas de salud, terapias alternativas y holisticas. Espacio limpio y profesional que transmite confianza, adaptado para distintas disciplinas terapeuticas.",
    amenities: [
      { icon: Lock, label: "Privacidad total" },
      { icon: Sparkles, label: "Ambiente terapeutico" },
      { icon: AirVent, label: "Climatizacion" },
      { icon: Wifi, label: "Wi-Fi disponible" },
    ],
    color: "rose",
    ideal: "Terapeutas holisticos, nutricionistas, profesionales de salud",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "hover:border-teal-300",
    badge: "bg-teal-50 text-teal-700",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    border: "hover:border-amber-300",
    badge: "bg-amber-50 text-amber-700",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "hover:border-purple-300",
    badge: "bg-purple-50 text-purple-700",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-600",
    border: "hover:border-rose-300",
    badge: "bg-rose-50 text-rose-700",
  },
};

export default function EspaciosPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Nuestros espacios</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Alquiler de espacios de trabajo en modulos horarios. Elegí el
            espacio que mejor se adapte a tu actividad profesional.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Como funciona
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                step: "1",
                title: "Elegi tu espacio",
                desc: "Selecciona el tipo de espacio que necesitas segun tu actividad.",
              },
              {
                step: "2",
                title: "Reserva tu turno",
                desc: "Elegí dia y horario. Modulos de 1 hora con disponibilidad en tiempo real.",
              },
              {
                step: "3",
                title: "Usa tu espacio",
                desc: "Llega, trabaja y aprovecha todas las comodidades del multiespacio.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Espacios */}
      <section className="section">
        <div className="container-custom">
          <div className="space-y-12">
            {spaces.map((space, idx) => {
              const colors = colorMap[space.color];
              return (
                <div
                  key={space.name}
                  className={`card p-8 ${colors.border}`}
                >
                  <div
                    className={`flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}
                        >
                          <space.icon
                            className={`h-6 w-6 ${colors.text}`}
                          />
                        </div>
                        <h3 className="text-2xl font-bold">{space.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{space.desc}</p>
                      <div
                        className={`inline-flex items-center gap-2 ${colors.badge} px-3 py-1.5 rounded-full text-sm mb-6`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        Modulos horarios flexibles
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        <span className="font-medium text-gray-700">
                          Ideal para:{" "}
                        </span>
                        {space.ideal}
                      </p>
                    </div>
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold mb-4">
                          Incluye
                        </h4>
                        <div className="space-y-3">
                          {space.amenities.map((a) => (
                            <div
                              key={a.label}
                              className="flex items-center gap-3"
                            >
                              <a.icon className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {a.label}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Link
                          href={`/reservar?espacio=${space.name.toLowerCase().replace(" ", "_")}`}
                          className="mt-6 w-full bg-teal-600 text-white px-4 py-2.5 rounded-lg hover:bg-teal-700 transition font-medium text-sm inline-flex items-center justify-center gap-2"
                        >
                          Reservar turno <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Reserva tu espacio ahora
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Modulos horarios flexibles. Sin compromisos a largo plazo. El
            espacio que necesitas, cuando lo necesitas.
          </p>
          <Link
            href="/reservar"
            className="bg-teal-500 text-white px-8 py-4 rounded-lg hover:bg-teal-600 transition font-semibold text-lg inline-flex items-center gap-2"
          >
            Reservar turno <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
