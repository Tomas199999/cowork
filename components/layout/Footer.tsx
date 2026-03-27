import Link from "next/link";
import { Building, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-6 w-6 text-teal-500" />
              <span className="text-lg font-bold text-white">
                cowork<span className="text-teal-400">.arquita</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Multiespacio profesional donde conviven profesionales tecnicos,
              especialistas en terapias y espacio para la creacion y el arte.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Espacios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/espacios" className="hover:text-white transition">
                  Oficina
                </Link>
              </li>
              <li>
                <Link href="/espacios" className="hover:text-white transition">
                  Aula Taller
                </Link>
              </li>
              <li>
                <Link href="/espacios" className="hover:text-white transition">
                  Gabinete
                </Link>
              </li>
              <li>
                <Link href="/espacios" className="hover:text-white transition">
                  Consultorio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-white transition"
                >
                  Oficina Tecnica
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-white transition"
                >
                  Arquitectura
                </Link>
              </li>
              <li>
                <Link
                  href="/reservar"
                  className="hover:text-white transition"
                >
                  Reservar turno
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Dionicio: +54 9 11 4062-6107
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Andrea: +54 9 11 5884-6186
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Capital Federal y Prov. de Buenos Aires
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} cowork.arquita. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
