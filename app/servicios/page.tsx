import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  FileText,
  Zap,
  HardHat,
  Compass,
  Ruler,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Plug,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - cowork.arquita",
  description:
    "Servicios de electricidad, arquitectura, construccion, seguridad e higiene, planos, habilitaciones, puesta a tierra, DCI e instalaciones.",
};

const serviciosDionicio = [
  {
    icon: Zap,
    name: "Electricidad",
    desc: "Servicio integral de electricidad para hogares, comercios y edificios.",
  },
  {
    icon: Gauge,
    name: "Puesta a tierra (Res. 900/15)",
    desc: "Instalacion y certificacion de sistemas de puesta a tierra conforme a la resolucion 900/15.",
  },
  {
    icon: Plug,
    name: "Pedidos de medidores",
    desc: "Gestion de pedidos de medidores monofasicos y trifasicos ante la empresa distribuidora.",
  },
  {
    icon: FileText,
    name: "Informe tecnico",
    desc: "Elaboracion de informes tecnicos para instalaciones electricas y electromecanicas.",
  },
  {
    icon: ClipboardCheck,
    name: "Habilitaciones de comercios",
    desc: "Gestion integral de habilitaciones comerciales ante organismos municipales y provinciales.",
  },
  {
    icon: Ruler,
    name: "Plano electromecanico",
    desc: "Confeccion de planos electromecanicos para obras, habilitaciones y tramites.",
  },
  {
    icon: ShieldCheck,
    name: "Seguridad e higiene",
    desc: "Evaluacion e implementacion de normas de seguridad e higiene para establecimientos.",
  },
  {
    icon: ClipboardCheck,
    name: "DCI - Deteccion contra incendios",
    desc: "Diseno, instalacion y mantenimiento de sistemas de deteccion y extincion de incendios.",
  },
  {
    icon: HardHat,
    name: "Instalaciones en general",
    desc: "Instalaciones electricas, sanitarias y todo tipo de instalaciones tecnicas.",
  },
];

const serviciosAndrea = [
  {
    icon: Building2,
    name: "Arquitectura y construccion",
    desc: "Diseno arquitectonico, direccion de obra, remodelaciones y construccion integral.",
  },
  {
    icon: Compass,
    name: "Asesoramiento tecnico",
    desc: "Consultoria profesional para proyectos de construccion, refaccion y puesta en valor.",
  },
  {
    icon: FileText,
    name: "Planos",
    desc: "Confeccion de planos arquitectonicos para obras, habilitaciones y tramites.",
  },
  {
    icon: HardHat,
    name: "Direccion de obra",
    desc: "Supervision y direccion profesional durante toda la ejecucion de la obra.",
  },
];

export default function ServiciosPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Oficina Tecnica</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Servicios profesionales de electricidad, arquitectura, construccion,
            seguridad e higiene, habilitaciones e instalaciones en Capital
            Federal y Provincia de Buenos Aires.
          </p>
        </div>
      </section>

      {/* Dionicio Alejandro */}
      <section className="section">
        <div className="container-custom">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="h-7 w-7 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Dionicio Alejandro
              </h2>
              <p className="text-teal-600 font-medium">Tecnico superior matriculado</p>
              <p className="text-sm text-gray-500 mt-1">
                Matricula habilitante en CABA y Provincia de Buenos Aires
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviciosDionicio.map((s) => (
              <div
                key={s.name}
                className="card p-6 group hover:border-amber-300"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-200 transition">
                  <s.icon className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">{s.name}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">
                Para contratar los servicios de Dionicio Alejandro, contactalo por WhatsApp
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Consulta sin compromiso - CABA y Provincia de Buenos Aires
              </p>
            </div>
            <a
              href="https://wa.me/5491140626107?text=Hola!%20Quisiera%20consultar%20con%20Dionicio%20Alejandro%20por%20sus%20servicios%20tecnicos."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition font-medium text-sm inline-flex items-center gap-2 flex-shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Arq. Andrea Ledesma */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="h-7 w-7 text-teal-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Arq. Andrea Ledesma
              </h2>
              <p className="text-teal-600 font-medium">Arquitecta</p>
              <p className="text-sm text-gray-500 mt-1">
                Matricula habilitante en Provincia de Buenos Aires
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviciosAndrea.map((s) => (
              <div
                key={s.name}
                className="card p-6 group hover:border-teal-300"
              >
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition">
                  <s.icon className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="font-semibold mb-2">{s.name}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-teal-50 border border-teal-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">
                Para contratar los servicios de Arq. Andrea Ledesma, contactala por WhatsApp
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Consulta sin compromiso - Provincia de Buenos Aires
              </p>
            </div>
            <a
              href="https://wa.me/5491158846186?text=Hola!%20Quisiera%20consultar%20con%20la%20Arq.%20Andrea%20Ledesma%20por%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition font-medium text-sm inline-flex items-center gap-2 flex-shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Zona de cobertura */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Zona de cobertura
            </h2>
            <p className="text-gray-600 mb-8">
              Nuestros profesionales brindan servicios en toda el area
              metropolitana
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">Capital Federal</h3>
                <p className="text-gray-500 text-sm">
                  Todos los barrios de CABA
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">
                  Provincia de Buenos Aires
                </h3>
                <p className="text-gray-500 text-sm">
                  Gran Buenos Aires y alrededores
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Necesitas alguno de estos servicios?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Contactanos por WhatsApp para una consulta sin compromiso o reserva
            un turno en nuestra oficina tecnica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5491140626107?text=Hola!%20Quisiera%20consultar%20por%20los%20servicios%20de%20oficina%20tecnica."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Consultar por WhatsApp
            </a>
            <Link
              href="/reservar"
              className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition font-semibold text-lg inline-flex items-center gap-2"
            >
              Reservar turno <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
