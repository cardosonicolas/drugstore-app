import Link from "next/link";
import { SITE, buildWhatsAppUrl } from "@/lib/seo";

const cellNumer = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl(
    "Hola! Vengo desde su web y quiero hacer un pedido."
  );

  return (
    <footer className="relative w-full bg-ink text-paper overflow-hidden mt-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,240,225,0.08) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-oxblood/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-amber-warm/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="relative h-16 w-16 rounded-full overflow-hidden bg-ink ring-1 ring-paper/20">
                <img
                  src="/logoOriginal.svg"
                  alt="Drugstore El Paracao"
                  className="h-full w-full object-contain p-1"
                />
              </span>
              <div className="leading-tight">
                <p className="font-display text-2xl font-extrabold">
                  El Paracao
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
                  Drugstore · Paraná
                </p>
              </div>
            </div>
            <p className="text-paper/70 text-sm sm:text-base leading-relaxed max-w-md">
              {SITE.tagline}. Delivery de bebidas, snacks, chocolates y despensa
              en Paraná y zonas aledañas. Atendemos de 9:00 a 04:00, los 365
              días del año.
            </p>
            <div className="mt-6 inline-flex flex-wrap items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-leaf hover:bg-leaf-dark text-paper px-5 py-3 rounded-full transition-all font-semibold hover-lift shadow-stamp"
                aria-label="Contactar por WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.683 5.46l-.999 3.648 3.805-.807z" />
                </svg>
                Pedí por WhatsApp
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                Lun a Dom · 9 → 04
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-warm mb-4">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-paper/70 hover:text-paper transition-colors inline-flex items-center gap-2 group"
                >
                  <span aria-hidden="true" className="text-amber-warm/50 group-hover:text-amber-warm transition-colors">→</span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="text-paper/70 hover:text-paper transition-colors inline-flex items-center gap-2 group"
                >
                  <span aria-hidden="true" className="text-amber-warm/50 group-hover:text-amber-warm transition-colors">→</span>
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-paper/70 hover:text-paper transition-colors inline-flex items-center gap-2 group"
                >
                  <span aria-hidden="true" className="text-amber-warm/50 group-hover:text-amber-warm transition-colors">→</span>
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/bebidas"
                  className="text-paper/70 hover:text-paper transition-colors inline-flex items-center gap-2 group"
                >
                  <span aria-hidden="true" className="text-amber-warm/50 group-hover:text-amber-warm transition-colors">→</span>
                  Catálogo
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-warm mb-4">
              Sucursales
            </h3>
            <ul className="space-y-4">
              {SITE.branches.map((b, i) => (
                <li
                  key={b.name}
                  className="border-l-2 border-amber-warm/40 pl-3"
                >
                  <p className="font-display text-base font-bold text-paper">
                    {b.name} {i === 1 && (
                      <span className="font-mono text-[10px] text-amber-warm uppercase tracking-[0.18em] ml-1">
                        · nueva
                      </span>
                    )}
                  </p>
                  <p className="text-paper/70 text-sm">{b.address}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50 mt-0.5">
                    Lun a Dom · 9 → 04
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={SITE.social.instagram}
                className="grid h-10 w-10 place-items-center rounded-full bg-paper/10 hover:bg-amber-warm hover:text-ink transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={SITE.social.facebook}
                className="grid h-10 w-10 place-items-center rounded-full bg-paper/10 hover:bg-amber-warm hover:text-ink transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-paper/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
            © {new Date().getFullYear()} {SITE.name} · Hecho con cariño en Paraná
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
            Developed by{" "}
            <a
              href="https://cardosonicolas.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-warm hover:text-paper transition-colors underline decoration-dotted underline-offset-2"
            >
              Nicolas Cardoso
            </a>
          </p>
        </div>
      </div>

      {cellNumer && <span className="hidden">{cellNumer}</span>}
    </footer>
  );
}
