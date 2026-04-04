"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, Building } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardLink =
    (session?.user as any)?.role === "PROFESSIONAL"
      ? "/dashboard/profesional"
      : "/dashboard/cliente";

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-7 w-7 text-teal-600" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-gray-900">
                cowork<span className="text-teal-600">.arquita</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/reservar?espacio=oficina"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Oficina
            </Link>
            <Link
              href="/reservar?espacio=aula_taller"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Aula Taller
            </Link>
            <Link
              href="/reservar?espacio=gabinete_consultorio"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Gabinete/Consultorio
            </Link>
            <Link
              href="/reservar?espacio=holistica"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Holística
            </Link>
            <Link
              href="/servicios"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Oficina técnica
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href={dashboardLink}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                >
                  <User className="h-4 w-4" />
                  {session.user?.name}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Ingresar
                </Link>
                <Link
                  href="/registro"
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition font-medium"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-3">
              <Link
                href="/reservar?espacio=oficina"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Oficina
              </Link>
              <Link
                href="/reservar?espacio=aula_taller"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Aula Taller
              </Link>
              <Link
                href="/reservar?espacio=gabinete_consultorio"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Gabinete/Consultorio
              </Link>
              <Link
                href="/reservar?espacio=holistica"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Holística
              </Link>
              <Link
                href="/servicios"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Oficina técnica
              </Link>
              {session ? (
                <>
                  <Link
                    href={dashboardLink}
                    className="text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mi Panel
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-left text-red-600 py-2"
                  >
                    Cerrar sesion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Ingresar
                  </Link>
                  <Link
                    href="/registro"
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-center hover:bg-teal-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
