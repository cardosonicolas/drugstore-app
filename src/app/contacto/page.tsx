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

const contactMethods = [
  {
    href: "",
    color: "leaf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.683 5.46l-.999 3.648 3.805-.807z" />
      </svg>
    ),
    title: "WhatsApp",
    handle: "Te respondemos en minutos",
    cta: "Escribinos",
    isWhatsapp: true,
  },
  {
    href: SITE.social.instagram,
    color: "pink",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    title: "Instagram",
    handle: "@drugstore_elparacao",
    cta: "Seguinos",
  },
  {
    href: SITE.social.facebook,
    color: "blue",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    title: "Facebook",
    handle: "Drugstore El Paracao",
    cta: "Visitanos",
  },
];

const colorMap: Record<string, { bg: string; ring: string; text: string; iconBg: string; iconText: string; cta: string }> = {
  leaf: {
    bg: "bg-leaf/10 hover:bg-leaf/15",
    ring: "ring-leaf/20 hover:ring-leaf/30",
    text: "text-leaf-dark",
    iconBg: "bg-leaf",
    iconText: "text-paper",
    cta: "text-leaf-dark",
  },
  pink: {
    bg: "bg-pink-100/50 hover:bg-pink-100",
    ring: "ring-pink-200/50 hover:ring-pink-300/50",
    text: "text-pink-700",
    iconBg: "bg-gradient-to-br from-pink-500 to-purple-600",
    iconText: "text-paper",
    cta: "text-pink-700",
  },
  blue: {
    bg: "bg-blue-100/50 hover:bg-blue-100",
    ring: "ring-blue-200/50 hover:ring-blue-300/50",
    text: "text-blue-700",
    iconBg: "bg-blue-600",
    iconText: "text-paper",
    cta: "text-blue-700",
  },
};

export default function ContactoPage() {
  const whatsappUrl = buildWhatsAppUrl(
    "Hola! Vengo desde su web y quiero hacer un pedido."
  );

  return (
    <>
      <section className="relative bg-ink text-paper overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(245,240,225,0.06) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-amber-warm/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-oxblood/40 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-warm">
              <span className="h-px w-8 bg-amber-warm" />
              Contacto
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold mt-5 leading-[0.92]">
              Estamos para
              <br />
              <span className="text-amber-warm">ayudarte</span>.
            </h1>
            <p className="text-paper/70 mt-5 text-base sm:text-lg max-w-2xl leading-relaxed">
              Escribinos por WhatsApp, visitanos en cualquiera de nuestras dos
              sucursales o seguinos en redes.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-methods"
        className="py-16 sm:py-20 bg-cream"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="contact-methods" className="sr-only">
            Formas de contacto
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {contactMethods.map((m) => {
              const c = colorMap[m.color];
              const href = m.isWhatsapp ? whatsappUrl : m.href;
              return (
                <li key={m.title}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative block ${c.bg} ${c.ring} ring-2 rounded-3xl p-7 transition-all hover-lift text-center`}
                  >
                    <div
                      className={`mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl ${c.iconBg} ${c.iconText} shadow-stamp`}
                    >
                      {m.icon}
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-ink">
                      {m.title}
                    </h3>
                    <p className="text-sm text-ink-soft mt-1">{m.handle}</p>
                    <p
                      className={`font-mono text-[11px] uppercase tracking-[0.18em] font-bold mt-4 ${c.cta} group-hover:underline`}
                    >
                      {m.cta} →
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="branches-title"
        className="py-16 sm:py-20 bg-cream-dark border-y border-ink/15"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
              <span className="h-px w-8 bg-oxblood" />
              Sucursales
              <span className="h-px w-8 bg-oxblood" />
            </span>
            <h2
              id="branches-title"
              className="font-display text-4xl sm:text-5xl font-extrabold text-ink mt-3"
            >
              Nuestras <span className="text-oxblood">tiendas</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {SITE.branches.map((b, i) => (
              <article
                key={b.name}
                className="bg-paper border-2 border-ink/15 rounded-3xl overflow-hidden hover-lift hover:border-ink/30 transition-all"
              >
                <div className="aspect-video w-full bg-cream-dark relative">
                  <iframe
                    title={`Mapa de ${b.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      b.address
                    )}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6 sm:p-7 border-t-2 border-ink/15">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-2xl font-extrabold text-ink">
                      {b.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft border border-ink/15 px-2 py-0.5 rounded-full">
                      Sucursal {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-ink-soft text-sm">{b.address}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-leaf-dark mt-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-leaf mr-2 animate-pulse" />
                    Lun a Dom · 9 → 04
                  </p>
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
