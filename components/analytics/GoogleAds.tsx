"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GOOGLE_ADS_ID, trackContactConversion } from "@/lib/gtag";

export default function GoogleAds() {
  // Cualquier clic en un link a WhatsApp cuenta como conversion de contacto
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest?.("a[href*='wa.me']");
      if (anchor) trackContactConversion();
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
