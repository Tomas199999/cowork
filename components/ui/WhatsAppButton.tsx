"use client";

import { useState } from "react";
import { MessageCircle, X, Zap, Building2 } from "lucide-react";

const PROFESSIONALS = [
  {
    name: "Dionicio Alejandro",
    role: "Tecnico superior matriculado",
    phone: "5491140626107",
    icon: Zap,
    color: "bg-amber-100 text-amber-600",
  },
  {
    name: "Arq. Andrea Ledesma",
    role: "Arquitecta",
    phone: "5491158846186",
    icon: Building2,
    color: "bg-teal-100 text-teal-600",
  },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Selector */}
      {open && (
        <div className="mb-3 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-72 animate-in">
          <p className="font-semibold text-sm mb-3">A quien queres contactar?</p>
          <div className="space-y-2">
            {PROFESSIONALS.map((p) => {
              const msg = encodeURIComponent(
                `Hola ${p.name}! Me comunico desde la web de espaciosarquita.`
              );
              return (
                <a
                  key={p.phone}
                  href={`https://wa.me/${p.phone}?text=${msg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${p.color}`}
                  >
                    <p.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.role}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Contactar por WhatsApp"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
