"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Building, Lock } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
              href="/"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Home
            </Link>
            <Link
              href="/servicios"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Oficina técnica
            </Link>
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
              href="/admin"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition"
            >
              <Lock className="h-4 w-4" />
              Admin
            </Link>
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
                href="/"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/servicios"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Oficina técnica
              </Link>
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
                href="/admin"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMenuOpen(false)}
              >
                <Lock className="h-4 w-4" />
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
