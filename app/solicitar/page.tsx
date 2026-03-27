"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";

function SolicitarForm() {
  const searchParams = useSearchParams();
  const profesionalId = searchParams.get("profesional") || "";

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
    location: "",
    preferredDate: "",
    budget: "",
    profesionalId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container-custom py-24 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Solicitud enviada</h1>
          <p className="text-gray-600 mb-8">
            Tu solicitud fue enviada correctamente. El profesional se pondra en
            contacto contigo dentro de las proximas 24 horas.
          </p>
          <a
            href="/"
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition font-medium inline-block"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Solicitar servicio</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Completa el formulario y te conectamos con el profesional ideal.
            Respuesta garantizada en menos de 24 horas.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="label">Nombre completo *</label>
                <input
                  type="text"
                  className="input"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  className="input"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="label">Telefono</label>
                <input
                  type="tel"
                  className="input"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+54 11 1234-5678"
                />
              </div>
              <div>
                <label className="label">Tipo de servicio *</label>
                <select
                  className="input"
                  required
                  value={form.serviceType}
                  onChange={(e) =>
                    setForm({ ...form, serviceType: e.target.value })
                  }
                >
                  <option value="">Seleccionar...</option>
                  <optgroup label="Electricidad">
                    <option value="instalacion-electrica">Instalacion electrica</option>
                    <option value="reparacion">Reparacion de fallas</option>
                    <option value="tablero">Tablero electrico</option>
                    <option value="iluminacion">Iluminacion</option>
                    <option value="puesta-tierra">Puesta a tierra</option>
                    <option value="mantenimiento">Mantenimiento preventivo</option>
                  </optgroup>
                  <optgroup label="Arquitectura">
                    <option value="planos">Diseno de planos</option>
                    <option value="remodelacion">Remodelacion</option>
                    <option value="direccion-obra">Direccion de obra</option>
                    <option value="habilitacion">Habilitacion municipal</option>
                    <option value="consultoria">Consultoria tecnica</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Descripcion del trabajo *</label>
              <textarea
                className="input min-h-[120px] resize-y"
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe el trabajo que necesitas. Cuantos mas detalles, mejor el presupuesto."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="label">Ubicacion *</label>
                <input
                  type="text"
                  className="input"
                  required
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Barrio, ciudad"
                />
              </div>
              <div>
                <label className="label">Fecha preferida</label>
                <input
                  type="date"
                  className="input"
                  value={form.preferredDate}
                  onChange={(e) =>
                    setForm({ ...form, preferredDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="label">Presupuesto estimado (ARS)</label>
              <input
                type="number"
                className="input"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                placeholder="Ej: 50000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Opcional. Si no estas seguro, el profesional te dara un presupuesto.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition font-semibold text-lg flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Enviar solicitud
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function SolicitarPage() {
  return (
    <Suspense fallback={<div className="container-custom py-24 text-center">Cargando...</div>}>
      <SolicitarForm />
    </Suspense>
  );
}
