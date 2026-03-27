"use client";

import { useState } from "react";
import {
  User,
  Briefcase,
  MessageSquare,
  Settings,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

const MOCK_REQUESTS = [
  { id: "1", client: "Maria Lopez", service: "Instalacion electrica", date: "2026-03-15", status: "PENDING", budget: 45000, location: "Palermo" },
  { id: "2", client: "Carlos Perez", service: "Reparacion de cortocircuito", date: "2026-03-12", status: "ACCEPTED", budget: 15000, location: "Belgrano" },
  { id: "3", client: "Ana Rodriguez", service: "Iluminacion LED", date: "2026-03-10", status: "COMPLETED", budget: 35000, location: "Recoleta" },
  { id: "4", client: "Pedro Sanchez", service: "Tablero electrico", date: "2026-03-08", status: "IN_PROGRESS", budget: 25000, location: "Villa Crespo" },
];

const MOCK_MESSAGES = [
  { id: "1", from: "Maria Lopez", message: "Hola, queria saber si podes venir el martes.", date: "2026-03-07", read: false },
  { id: "2", from: "Carlos Perez", message: "Perfecto, te espero a las 10.", date: "2026-03-06", read: true },
  { id: "3", from: "Ana Rodriguez", message: "Excelente trabajo, muchas gracias!", date: "2026-03-05", read: true },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  ACCEPTED: { label: "Aceptado", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  IN_PROGRESS: { label: "En progreso", color: "bg-purple-100 text-purple-800", icon: ArrowRight },
  COMPLETED: { label: "Completado", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function DashboardProfesional() {
  const [activeTab, setActiveTab] = useState("solicitudes");

  const tabs = [
    { id: "solicitudes", label: "Solicitudes", icon: Briefcase },
    { id: "mensajes", label: "Mensajes", icon: MessageSquare },
    { id: "perfil", label: "Mi Perfil", icon: User },
    { id: "servicios", label: "Mis Servicios", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <h1 className="text-2xl font-bold">Panel del profesional</h1>
          <p className="text-gray-600">Bienvenido, Martin Gonzalez</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Solicitudes pendientes", value: "2", color: "text-amber-600" },
            { label: "Trabajos en curso", value: "1", color: "text-blue-600" },
            { label: "Trabajos completados", value: "47", color: "text-green-600" },
            { label: "Mensajes sin leer", value: "1", color: "text-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="card p-4">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "solicitudes" && (
          <div className="space-y-4">
            {MOCK_REQUESTS.map((req) => {
              const status = statusConfig[req.status];
              return (
                <div key={req.id} className="card p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{req.service}</h3>
                      <p className="text-sm text-gray-600">
                        Cliente: {req.client} - {req.location}
                      </p>
                      <p className="text-sm text-gray-500">Fecha: {req.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-amber-600">
                        ${req.budget.toLocaleString("es-AR")}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  {req.status === "PENDING" && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition">
                        Aceptar
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition">
                        Rechazar
                      </button>
                      <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">
                        Responder
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "mensajes" && (
          <div className="space-y-3">
            {MOCK_MESSAGES.map((msg) => (
              <div
                key={msg.id}
                className={`card p-4 flex items-start gap-3 ${!msg.read ? "border-l-4 border-l-amber-500" : ""}`}
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{msg.from}</span>
                    <span className="text-xs text-gray-400">{msg.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "perfil" && (
          <div className="card p-6 max-w-2xl">
            <h2 className="text-lg font-bold mb-6">Editar perfil</h2>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Nombre</label>
                  <input type="text" className="input" defaultValue="Martin Gonzalez" />
                </div>
                <div>
                  <label className="label">Titulo profesional</label>
                  <input type="text" className="input" defaultValue="Electricista matriculado" />
                </div>
              </div>
              <div>
                <label className="label">Biografia</label>
                <textarea
                  className="input min-h-[100px] resize-y"
                  defaultValue="Mas de 15 anos de experiencia en instalaciones electricas residenciales y comerciales."
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Ubicacion</label>
                  <input type="text" className="input" defaultValue="Capital Federal, Buenos Aires" />
                </div>
                <div>
                  <label className="label">Tarifa por hora (ARS)</label>
                  <input type="number" className="input" defaultValue="5000" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Telefono</label>
                  <input type="tel" className="input" defaultValue="+54 11 5555-1234" />
                </div>
                <div>
                  <label className="label">Anos de experiencia</label>
                  <input type="number" className="input" defaultValue="15" />
                </div>
              </div>
              <button
                type="button"
                className="bg-amber-500 text-white px-6 py-2.5 rounded-lg hover:bg-amber-600 transition font-medium"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        )}

        {activeTab === "servicios" && (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Mis servicios</h2>
              <button className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-600 transition flex items-center gap-1">
                <Plus className="h-4 w-4" /> Agregar servicio
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Instalacion electrica completa", price: 45000 },
                { name: "Reparacion de cortocircuitos", price: 15000 },
                { name: "Instalacion tablero electrico", price: 25000 },
                { name: "Iluminacion LED", price: 35000 },
                { name: "Puesta a tierra", price: 20000 },
              ].map((s) => (
                <div key={s.name} className="card p-4 flex items-center justify-between">
                  <span className="font-medium">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-600 font-semibold">
                      ${s.price.toLocaleString("es-AR")}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 text-sm">Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
