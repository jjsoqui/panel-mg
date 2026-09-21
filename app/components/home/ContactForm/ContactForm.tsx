"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Loader2, Send } from "lucide-react";

const inputClasses =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#0d1b2a] outline-none transition focus:border-[#0C4572] focus:ring-2 focus:ring-[#0C4572]/20";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xdekgaae");

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

        <div className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm md:p-10">
          {state.succeeded ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <h3 className="font-inter text-2xl font-bold text-[#0d1b2a]">
                Gracias por contactarnos
              </h3>
              <p className="mt-3 max-w-md font-montserrat text-gray-600">
                Recibimos tu mensaje. Un asesor de Panel MG se pondrá en contacto contigo pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              <label className="font-montserrat text-sm font-semibold text-[#0d1b2a]">
                Nombre *
                <input className={inputClasses} type="text" name="name" required />
                <ValidationError prefix="Nombre" field="name" errors={state.errors} />
              </label>

              <label className="font-montserrat text-sm font-semibold text-[#0d1b2a]">
                Correo electrónico *
                <input className={inputClasses} type="email" name="email" required />
                <ValidationError prefix="Correo electrónico" field="email" errors={state.errors} />
              </label>

              <label className="font-montserrat text-sm font-semibold text-[#0d1b2a]">
                Teléfono
                <input className={inputClasses} type="tel" name="phone" />
                <ValidationError prefix="Teléfono" field="phone" errors={state.errors} />
              </label>

              <label className="font-montserrat text-sm font-semibold text-[#0d1b2a]">
                Empresa
                <input className={inputClasses} type="text" name="company" />
                <ValidationError prefix="Empresa" field="company" errors={state.errors} />
              </label>

              <label className="font-montserrat text-sm font-semibold text-[#0d1b2a] md:col-span-2">
                ¿Cómo podemos ayudarte? *
                <textarea className={`${inputClasses} min-h-36 resize-y`} name="message" required />
                <ValidationError prefix="Mensaje" field="message" errors={state.errors} />
              </label>

              <ValidationError prefix="Formulario" errors={state.errors} />

              <button
                type="submit"
                disabled={state.submitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0C4572] px-6 py-3 font-inter font-semibold text-white transition hover:bg-[#093653] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
              >
                {state.submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
