import Link from "next/link";
import {
  Zap,
  Building2,
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

const PROFESSIONALS: Record<string, any> = {
  "1": {
    id: "1",
    name: "Martin Gonzalez",
    title: "Electricista matriculado",
    category: "ELECTRICIDAD",
    bio: "Soy electricista matriculado con mas de 15 anos de experiencia en instalaciones electricas residenciales y comerciales. Me especializo en diagnostico de fallas, instalacion de tableros y sistemas de iluminacion LED. Trabajo con responsabilidad y garantizo todos mis trabajos.",
    location: "Capital Federal, Buenos Aires",
    hourlyRate: 5000,
    experience: 15,
    rating: 4.9,
    reviewCount: 47,
    phone: "+54 11 5555-1234",
    available: true,
    services: [
      "Instalaciones electricas completas",
      "Reparacion de cortocircuitos",
      "Tableros y llaves termicas",
      "Iluminacion LED",
      "Puesta a tierra",
      "Mantenimiento preventivo",
    ],
    portfolio: [
      { title: "Instalacion electrica completa - Edificio Belgrano", description: "Instalacion completa de sistema electrico para edificio de 20 departamentos." },
      { title: "Iluminacion LED - Restaurant Palermo", description: "Diseno e instalacion de sistema de iluminacion LED para restaurant." },
      { title: "Tablero industrial - Fabrica San Martin", description: "Instalacion de tablero de potencia para planta industrial." },
    ],
    reviews: [
      { name: "Maria L.", rating: 5, comment: "Excelente trabajo, muy profesional y puntual.", date: "2025-12-15" },
      { name: "Juan P.", rating: 5, comment: "Soluciono el problema rapidamente. Lo recomiendo.", date: "2025-11-20" },
      { name: "Sofia R.", rating: 5, comment: "Muy prolijo y buen precio. Volveria a contratarlo.", date: "2025-10-08" },
    ],
  },
  "2": {
    id: "2",
    name: "Laura Martinez",
    title: "Arquitecta - MN 12345",
    category: "ARQUITECTURA",
    bio: "Arquitecta recibida en la UBA con mas de 10 anos de experiencia. Me especializo en remodelaciones integrales, diseno de interiores y direccion de obra. Cada proyecto es unico y lo abordo con dedicacion y creatividad para lograr el mejor resultado.",
    location: "Palermo, Buenos Aires",
    hourlyRate: 8000,
    experience: 10,
    rating: 4.8,
    reviewCount: 32,
    phone: "+54 11 5555-5678",
    available: true,
    services: [
      "Diseno de planos",
      "Remodelaciones integrales",
      "Direccion de obra",
      "Diseno de interiores",
      "Habilitaciones municipales",
      "Consultoria tecnica",
    ],
    portfolio: [
      { title: "Remodelacion integral - Casa en Palermo", description: "Remodelacion completa de casa antigua de 200m2 manteniendo fachada original." },
      { title: "Diseno oficinas - Coworking Belgrano", description: "Diseno y direccion de obra de espacio de coworking de 500m2." },
      { title: "Ampliacion - Casa en Martinez", description: "Proyecto de ampliacion con segundo piso y terraza." },
    ],
    reviews: [
      { name: "Carlos P.", rating: 5, comment: "Laura transformo nuestra casa. Increible su vision y profesionalismo.", date: "2025-11-28" },
      { name: "Ana G.", rating: 5, comment: "Excelente arquitecta, siempre atenta a los detalles.", date: "2025-10-15" },
      { name: "Pedro M.", rating: 4, comment: "Muy buen trabajo en la direccion de obra.", date: "2025-09-20" },
    ],
  },
  "3": {
    id: "3",
    name: "Roberto Diaz",
    title: "Electricista industrial",
    category: "ELECTRICIDAD",
    bio: "Electricista especializado en instalaciones industriales con 12 anos de experiencia. Trabajo con tableros de potencia, automatizacion y mantenimiento preventivo para fabricas y comercios.",
    location: "San Martin, Buenos Aires",
    hourlyRate: 6000,
    experience: 12,
    rating: 4.7,
    reviewCount: 28,
    phone: "+54 11 5555-9012",
    available: true,
    services: [
      "Instalaciones industriales",
      "Tableros de potencia",
      "Automatizacion",
      "Mantenimiento preventivo",
      "Puesta a tierra industrial",
    ],
    portfolio: [
      { title: "Tablero de potencia - Planta metalurgica", description: "Instalacion de tablero principal con 400A para planta industrial." },
      { title: "Automatizacion - Linea de produccion", description: "Sistema de control automatizado para linea de envasado." },
    ],
    reviews: [
      { name: "Empresa XYZ", rating: 5, comment: "Roberto mantiene nuestras instalaciones impecables.", date: "2025-11-10" },
      { name: "Fabrica SM", rating: 5, comment: "Muy serio y responsable. Gran profesional.", date: "2025-10-05" },
    ],
  },
  "4": {
    id: "4",
    name: "Carolina Ruiz",
    title: "Arquitecta sustentable",
    category: "ARQUITECTURA",
    bio: "Arquitecta especializada en diseno bioclimatico y construccion sustentable. Trabajo con materiales ecologicos y tecnicas de eficiencia energetica para crear espacios que respeten el medio ambiente.",
    location: "Belgrano, Buenos Aires",
    hourlyRate: 9000,
    experience: 8,
    rating: 5.0,
    reviewCount: 19,
    phone: "+54 11 5555-3456",
    available: true,
    services: [
      "Diseno bioclimatico",
      "Construccion sustentable",
      "Eficiencia energetica",
      "Certificacion LEED",
      "Consultoria ambiental",
    ],
    portfolio: [
      { title: "Casa sustentable - Tigre", description: "Vivienda unifamiliar con paneles solares, recoleccion de agua de lluvia y materiales reciclados." },
      { title: "Oficina verde - Microcentro", description: "Remodelacion de oficina con criterios de sustentabilidad y certificacion LEED." },
    ],
    reviews: [
      { name: "Lucia T.", rating: 5, comment: "Carolina es una genia. Nuestra casa es hermosa y ecologica.", date: "2025-12-01" },
      { name: "Marcos D.", rating: 5, comment: "Excelente asesoria en eficiencia energetica.", date: "2025-11-15" },
    ],
  },
};

export default async function ProfessionalProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pro = PROFESSIONALS[id];

  if (!pro) {
    return (
      <div className="container-custom py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Profesional no encontrado</h1>
        <Link href="/profesionales" className="text-amber-600 font-medium">
          Volver a profesionales
        </Link>
      </div>
    );
  }

  const isElectricista = pro.category === "ELECTRICIDAD";

  return (
    <div>
      {/* Header del perfil */}
      <section className={`py-16 ${isElectricista ? "bg-gradient-to-br from-amber-600 to-amber-800" : "bg-gradient-to-br from-blue-600 to-blue-800"} text-white`}>
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              {isElectricista ? (
                <Zap className="h-12 w-12 text-white" />
              ) : (
                <Building2 className="h-12 w-12 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{pro.name}</h1>
                {pro.available && (
                  <span className="bg-green-400/20 text-green-200 text-sm px-3 py-1 rounded-full font-medium">
                    Disponible
                  </span>
                )}
              </div>
              <p className="text-white/80 text-lg mb-3">{pro.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {pro.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-white text-white" /> {pro.rating} ({pro.reviewCount} resenas)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {pro.experience} anos de experiencia
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${pro.hourlyRate.toLocaleString("es-AR")}</p>
              <p className="text-white/70 text-sm">por hora</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sobre mi */}
            <div>
              <h2 className="text-xl font-bold mb-4">Sobre mi</h2>
              <p className="text-gray-600 leading-relaxed">{pro.bio}</p>
            </div>

            {/* Servicios */}
            <div>
              <h2 className="text-xl font-bold mb-4">Servicios que ofrezco</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {pro.services.map((s: string) => (
                  <div key={s} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${isElectricista ? "text-amber-500" : "text-blue-500"}`} />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <h2 className="text-xl font-bold mb-4">Portfolio</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {pro.portfolio.map((item: any) => (
                  <div key={item.title} className="card p-5">
                    <div className={`w-full h-32 rounded-lg mb-3 flex items-center justify-center ${isElectricista ? "bg-amber-50" : "bg-blue-50"}`}>
                      <Briefcase className={`h-8 w-8 ${isElectricista ? "text-amber-300" : "text-blue-300"}`} />
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resenas */}
            <div>
              <h2 className="text-xl font-bold mb-4">Resenas</h2>
              <div className="space-y-4">
                {pro.reviews.map((r: any) => (
                  <div key={r.name + r.date} className="card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{r.name}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{r.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Solicitar servicio</h3>
              <p className="text-sm text-gray-600 mb-6">
                Contacta a {pro.name} para solicitar un presupuesto o agendar un trabajo.
              </p>
              <Link
                href={`/solicitar?profesional=${pro.id}`}
                className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition ${
                  isElectricista
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Solicitar servicio <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {pro.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  Contactar por plataforma
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {pro.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
