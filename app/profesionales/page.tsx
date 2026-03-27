"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Star, Zap, Building2 } from "lucide-react";

const MOCK_PROFESSIONALS = [
  {
    id: "1",
    name: "Martin Gonzalez",
    title: "Electricista matriculado",
    category: "ELECTRICIDAD",
    bio: "Mas de 15 anos de experiencia en instalaciones electricas residenciales y comerciales.",
    location: "Capital Federal, Buenos Aires",
    hourlyRate: 5000,
    rating: 4.9,
    reviewCount: 47,
    available: true,
    image: null,
  },
  {
    id: "2",
    name: "Laura Martinez",
    title: "Arquitecta - MN 12345",
    category: "ARQUITECTURA",
    bio: "Especializada en remodelaciones y diseno de interiores. Dirijo obras desde hace 10 anos.",
    location: "Palermo, Buenos Aires",
    hourlyRate: 8000,
    rating: 4.8,
    reviewCount: 32,
    available: true,
    image: null,
  },
  {
    id: "3",
    name: "Roberto Diaz",
    title: "Electricista industrial",
    category: "ELECTRICIDAD",
    bio: "Especialista en instalaciones industriales, tableros de potencia y automatizacion.",
    location: "San Martin, Buenos Aires",
    hourlyRate: 6000,
    rating: 4.7,
    reviewCount: 28,
    available: true,
    image: null,
  },
  {
    id: "4",
    name: "Carolina Ruiz",
    title: "Arquitecta sustentable",
    category: "ARQUITECTURA",
    bio: "Diseno bioclimatico y construccion sustentable. Proyectos residenciales y comerciales.",
    location: "Belgrano, Buenos Aires",
    hourlyRate: 9000,
    rating: 5.0,
    reviewCount: 19,
    available: true,
    image: null,
  },
];

export default function ProfesionalesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const filtered = MOCK_PROFESSIONALS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Profesionales</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Encontra electricistas y arquitectos verificados cerca tuyo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, especialidad o ubicacion..."
                className="input pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {[
                { label: "Todos", value: "ALL" },
                { label: "Electricidad", value: "ELECTRICIDAD" },
                { label: "Arquitectura", value: "ARQUITECTURA" },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    categoryFilter === cat.value
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Listado */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((pro) => (
              <Link
                key={pro.id}
                href={`/profesionales/${pro.id}`}
                className="card p-6 flex gap-4 group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  {pro.category === "ELECTRICIDAD" ? (
                    <Zap className="h-7 w-7 text-amber-500" />
                  ) : (
                    <Building2 className="h-7 w-7 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-amber-600 transition">
                        {pro.name}
                      </h3>
                      <p className="text-sm text-gray-500">{pro.title}</p>
                    </div>
                    {pro.available && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                        Disponible
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{pro.bio}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {pro.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
                      {pro.rating} ({pro.reviewCount})
                    </span>
                  </div>
                  <p className="text-amber-600 font-semibold mt-2 text-sm">
                    ${pro.hourlyRate.toLocaleString("es-AR")}/hora
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No se encontraron profesionales con esos filtros.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("ALL");
                }}
                className="text-amber-600 font-medium mt-2"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
