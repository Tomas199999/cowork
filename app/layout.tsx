import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Providers from "@/components/layout/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "espaciosarquita - Multiespacio Profesional",
  description:
    "Multiespacio profesional donde conviven profesionales tecnicos, especialistas en terapias y espacio para la creacion y el arte. Coworking, oficina tecnica y servicios de arquitectura en Buenos Aires.",
  keywords: [
    "coworking",
    "arquitectura",
    "oficina tecnica",
    "espacio de trabajo",
    "consultorio",
    "gabinete",
    "Buenos Aires",
    "terapias holisticas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} font-sans`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
