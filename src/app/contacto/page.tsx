import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import PromoBanner from "@/components/PromoBanner";
import { SITE, buildWhatsAppUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contacto y sucursales | Drugstore El Paracao",
  description:
    "Contactanos por WhatsApp, visitanos en nuestras sucursales o seguinos en redes. Drugstore El Paracao en Paraná, Entre Ríos. Atendemos de 9:00 a 04:00.",
  alternates: { canonical: `${SITE.url}/contacto` },
};

export default function ContactoPage() {
  const whatsappUrl = buildWhatsAppUrl("Hola! Vengo desde su web y quiero hacer un pedido.");

  return (
    <>
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-green-300 font-semibold mb-3">
            Contacto
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Estamos para ayudarte
          </h1>
          <p className="text-zinc-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Escribinos por WhatsApp, visitanos en cualquiera de nuestras dos sucursales o seguinos en redes.
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-methods" className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="contact-methods" className="sr-only">Formas de contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-green-50 hover:bg-green-100 transition-colors rounded-2xl p-6 ring-1 ring-green-100 hover:ring-green-200 text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.683 5.46l-.999 3.648 3.805-.807z" />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900">WhatsApp</h3>
              <p className="text-sm text-zinc-500 mt-1">Te respondemos en minutos</p>
              <p className="text-xs text-green-700 font-semibold mt-3 group-hover:underline">Escribinos →</p>
            </a>

            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-pink-50 hover:bg-pink-100 transition-colors rounded-2xl p-6 ring-1 ring-pink-100 hover:ring-pink-200 text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900">Instagram</h3>
              <p className="text-sm text-zinc-500 mt-1">@drugstore_elparacao</p>
              <p className="text-xs text-pink-700 font-semibold mt-3 group-hover:underline">Seguinos →</p>
            </a>

            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-blue-50 hover:bg-blue-100 transition-colors rounded-2xl p-6 ring-1 ring-blue-100 hover:ring-blue-200 text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900">Facebook</h3>
              <p className="text-sm text-zinc-500 mt-1">Drugstore El Paracao</p>
              <p className="text-xs text-blue-700 font-semibold mt-3 group-hover:underline">Visitanos →</p>
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="branches-title" className="py-12 sm:py-16 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="branches-title" className="text-2xl sm:text-3xl font-bold text-zinc-900 text-center mb-10">
            Nuestras sucursales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SITE.branches.map((b) => (
              <article key={b.name} className="bg-white rounded-2xl overflow-hidden ring-1 ring-zinc-100">
                <div className="aspect-video w-full bg-zinc-100">
                  <iframe
                    title={`Mapa de ${b.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(b.address)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-900">{b.name}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{b.address}</p>
                  <p className="text-xs text-zinc-400 mt-2">📅 Todos los días · 9:00 a 04:00</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <PromoBanner />
    </>
  );
}
