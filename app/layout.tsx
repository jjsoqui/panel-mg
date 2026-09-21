import type { Metadata } from "next";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";
import "@fontsource-variable/montserrat";
import "@fontsource/lato";
import "@fontsource-variable/inter";
import { Header } from "./components/general/Header";
import { Toaster } from "sonner";
import { Footer } from "./components/general/Footer";
import { WhatsAppFloating } from "./components/general/WhatsAppFloating";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Panel MG - Soluciones Constructivas Innovadoras",
  description:
    "Soluciones en materiales constructivos innovadores y sostenibles",
  icons: [
    {
      rel: "icon",
      url: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/images/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className="bg-neutral-950 text-white">
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18428156484"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18428156484');
          `}
        </Script>

        <Toaster richColors position="top-right" />

        <Header />
        {children}

        {/* FOOTER EN TODAS LAS PÁGINAS */}
        <Footer />

        {/* BOTÓN FLOTANTE DE WHATSAPP */}
        <WhatsAppFloating />
      </body>
    </html>
  );
}
