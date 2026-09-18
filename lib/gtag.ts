export const GOOGLE_ADS_ID = "AW-18403179206";

// Etiqueta del fragmento de evento de la conversion "Contacto" en Google Ads.
// Se completa con el valor de `send_to` que muestra Google Ads (AW-XXXX/XXXX).
export const CONTACT_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GADS_CONTACT_LABEL ??
  "AW-18403179206/CZiuCIyvz_wcEMb1qMdE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Registra en Google Ads una conversion de contacto (clic en WhatsApp / reserva). */
export function trackContactConversion() {
  if (typeof window === "undefined" || !window.gtag || !CONTACT_CONVERSION_LABEL) {
    return;
  }
  window.gtag("event", "conversion", { send_to: CONTACT_CONVERSION_LABEL });
}
