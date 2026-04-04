import Link from "next/link";
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  Sparkles,
  Briefcase,
  Heart,
  Palette,
  HardHat,
  FileText,
  ShieldCheck,
  Zap,
  MessageCircle,
} from "lucide-react";

const spaces = [
  {
    icon: Briefcase,
    name: "Oficina",
    desc: "Espacio de trabajo equipado para profesionales independientes y equipos.",
  },
  {
    icon: Users,
    name: "Aula Taller",
    desc: "Ambiente amplio para talleres, capacitaciones y actividades grupales.",
  },
  {
    icon: Heart,
    name: "Gabinete",
    desc: "Espacio privado ideal para terapeutas, psicologos y profesionales de la salud.",
  },
  {
    icon: Sparkles,
    name: "Consultorio",
    desc: "Consultorio equipado para consultas medicas, terapias alternativas y holisticas.",
  },
];

const techServices = [
  { icon: Building2, name: "Arquitectura y construccion" },
  { icon: ShieldCheck, name: "Seguridad e higiene" },
  { icon: FileText, name: "Planos y habilitaciones" },
  { icon: Zap, name: "Puesta a tierra y DCI" },
  { icon: HardHat, name: "Instalaciones en general" },
  { icon: Briefcase, name: "Asesoramiento tecnico" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container-custom relative py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-sm font-medium">
                Multiespacio profesional
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Tu espacio para{" "}
              <span className="text-teal-400">crear, trabajar</span> y{" "}
              <span className="text-amber-400">crecer</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-4 max-w-2xl">
              Multiespacio profesional donde conviven profesionales tecnicos,
              especialistas en terapias clasicas y alternativas holisticas, y se
              abre espacio para la creacion y el arte.
            </p>
            <p className="text-base text-gray-400 mb-8 max-w-2xl italic">
              El trabajo en comunidad y la integracion enriquecen los saberes y
              fortalecen las experiencias personales y laborales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/reservar"
                className="bg-teal-500 text-white px-8 py-4 rounded-lg hover:bg-teal-600 transition font-semibold text-lg inline-flex items-center justify-center gap-2"
              >
                Reservar espacio
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/servicios"
                className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition font-semibold text-lg inline-flex items-center justify-center"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Espacios */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nuestros espacios
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Alquiler de espacios en modulos horarios, adaptados a cada
              profesional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {spaces.map((space) => (
              <div
                key={space.name}
                className="card p-6 group hover:border-teal-300"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-200 transition">
                  <space.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{space.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{space.desc}</p>
                <Link
                  href="/reservar"
                  className="text-teal-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Reservar turno <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/espacios"
              className="text-teal-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Ver todos los espacios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Oficina Tecnica */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wide">
                Oficina Tecnica
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 mt-2">
                Servicios profesionales de arquitectura y construccion
              </h2>
              <p className="text-gray-600 mb-6">
                Contamos con profesionales matriculados que brindan servicios en
                Capital Federal y Provincia de Buenos Aires.
              </p>

              <div className="space-y-3 mb-8">
                {techServices.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-700">{s.name}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/servicios"
                className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition font-semibold inline-flex items-center gap-2"
              >
                Conoce nuestros servicios <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-teal-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Nuestro equipo</h3>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Dionicio Alejandro</h4>
                      <p className="text-sm text-teal-600 font-medium">
                        Tecnico superior matriculado
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Matricula habilitante en CABA y Prov. de Buenos Aires
                      </p>
                      <ul className="mt-2 space-y-1">
                        {[
                          "Electricidad",
                          "Puesta a tierra (Res. 900/15)",
                          "Medidores monofasicos y trifasicos",
                          "Informe tecnico",
                          "Habilitaciones de comercios",
                          "Plano electromecanico",
                          "Seguridad e higiene",
                          "DCI",
                          "Instalaciones en general",
                        ].map((s) => (
                          <li key={s} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <CheckCircle2 className="h-3 w-3 text-amber-500 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="https://wa.me/5491140626107?text=Hola!%20Quisiera%20consultar%20con%20Dionicio%20Alejandro%20por%20sus%20servicios%20tecnicos."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition text-xs font-medium inline-flex items-center gap-1.5"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Contactar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Arq. Andrea Ledesma
                      </h4>
                      <p className="text-sm text-teal-600 font-medium">
                        Arquitecta
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Matricula habilitante en Prov. de Buenos Aires
                      </p>
                      <ul className="mt-2 space-y-1">
                        {[
                          "Arquitectura y construccion",
                          "Asesoramiento tecnico",
                          "Planos",
                          "Direccion de obra",
                        ].map((s) => (
                          <li key={s} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <CheckCircle2 className="h-3 w-3 text-teal-500 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="https://wa.me/5491158846186?text=Hola!%20Quisiera%20consultar%20con%20la%20Arq.%20Andrea%20Ledesma%20por%20sus%20servicios."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition text-xs font-medium inline-flex items-center gap-1.5"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Contactar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que elegirnos */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Por que espaciosarquita
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Un espacio pensado para que profesionales de distintas disciplinas
              convivan y crezcan juntos
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Comunidad",
                desc: "Trabajo en comunidad que enriquece los saberes y fortalece experiencias.",
              },
              {
                icon: Clock,
                title: "Modulos horarios",
                desc: "Alquila el espacio que necesitas en modulos de horas, sin compromisos largos.",
              },
              {
                icon: Palette,
                title: "Diversidad",
                desc: "Profesionales tecnicos, terapeutas, artistas y creativos bajo un mismo techo.",
              },
              {
                icon: ShieldCheck,
                title: "Profesionalismo",
                desc: "Profesionales matriculados con experiencia en CABA y Provincia de Buenos Aires.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Encontra tu espacio ideal
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Reserva tu turno en oficina, aula taller, gabinete o consultorio.
            Modulos horarios flexibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservar"
              className="bg-teal-500 text-white px-8 py-4 rounded-lg hover:bg-teal-600 transition font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Reservar turno
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/espacios"
              className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition font-semibold text-lg inline-flex items-center justify-center"
            >
              Ver espacios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
