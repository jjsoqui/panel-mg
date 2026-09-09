"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

// Reemplaza esta URL con el enlace de tu propio formulario de Google Forms
// Ejemplo: "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true"
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc-PLACEHOLDER_FORM_ID/viewform?embedded=true";

interface ContactFormProps {
  formUrl?: string;
}

export default function ContactForm({ formUrl = GOOGLE_FORM_URL }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const isPlaceholder = formUrl.includes("PLACEHOLDER_FORM_ID");

  return (
    <section className="w-full py-16 px-4 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="uppercase tracking-widest text-gray-500 font-inter text-sm md:text-base font-semibold">
            Contáctanos
          </p>

          <h2 className="text-3xl md:text-4xl font-inter font-bold text-[#0d1b2a] mt-2">
            Estamos aquí para ayudarte
          </h2>
          <p className="text-gray-600 font-montserrat text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Completa el siguiente formulario y un asesor de Panel MG se pondrá en contacto contigo a la brevedad.
          </p>
        </div>

        {/* EMBED CONTAINER */}
        <div className="relative w-full rounded-2xl border border-gray-200 bg-gray-50 shadow-sm overflow-hidden min-h-[650px] md:min-h-[800px]">
          {isLoading && !isPlaceholder && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
              <Loader2 className="animate-spin text-[#0C4572] mb-3" size={36} />
              <p className="text-gray-600 font-inter text-sm">Cargando formulario...</p>
            </div>
          )}

          {isPlaceholder ? (
            <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center mb-4 text-[#0C4572]">
                <ExternalLink size={28} />
              </div>
              <h3 className="text-xl font-bold font-inter text-[#0d1b2a] mb-2">
                Google Forms Embed Listo
              </h3>
              <p className="text-gray-600 font-montserrat text-sm md:text-base max-w-lg mb-6">
                Para mostrar tu formulario, simplemente edita la constante <code className="bg-gray-200 text-red-600 px-2 py-0.5 rounded text-xs font-mono">GOOGLE_FORM_URL</code> en <code className="text-xs bg-gray-200 px-2 py-0.5 rounded font-mono">ContactForm.tsx</code> con el link insertable de tu formulario de Google.
              </p>
              <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-4 text-xs md:text-sm text-left max-w-md w-full">
                <p className="font-semibold mb-1">¿Cómo obtener el link insertable?</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>Abre tu formulario en Google Forms.</li>
                  <li>Haz clic en el botón <b>Enviar</b> (arriba a la derecha).</li>
                  <li>Selecciona la pestaña de código <b>&lt; &gt; (Insertar HTML)</b>.</li>
                  <li>Copia la URL del atributo <code className="font-mono">src=&quot;...&quot;</code> y pégala en <code className="font-mono">GOOGLE_FORM_URL</code>.</li>
                </ol>
              </div>
            </div>
          ) : (
            <iframe
              src={formUrl}
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Formulario de contacto Panel MG"
              className="w-full min-h-[800px] border-0"
              onLoad={() => setIsLoading(false)}
            >
              Cargando formulario...
            </iframe>
          )}
        </div>

        {!isPlaceholder && (
          <div className="mt-4 text-center">
            <a
              href={formUrl.replace("?embedded=true", "")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0C4572] transition underline"
            >
              <span>¿Problemas para visualizar el formulario? Ábrelo en una nueva pestaña</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
