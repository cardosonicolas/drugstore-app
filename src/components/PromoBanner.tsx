import { buildWhatsAppUrl } from "@/lib/seo";

export default function PromoBanner() {
  const url = buildWhatsAppUrl(
    "Hola! Quiero coordinar un pedido grande y bonificar el envío."
  );

  return (
    <section
      aria-label="Promo pedidos grandes"
      className="relative w-full bg-ink text-paper overflow-hidden"
    >
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
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-oxblood/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-warm/15 text-amber-warm text-[11px] font-mono uppercase tracking-[0.18em] ring-1 ring-amber-warm/30">
              <span>★</span> Pedidos mayoristas
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-5 leading-[0.95]">
              ¿Pedido grande?
              <br />
              <span className="text-amber-warm">Te bonificamos el envío.</span>
            </h2>
            <p className="text-paper/70 mt-4 text-base sm:text-lg max-w-xl">
              Coordiná por WhatsApp y armamos un combo a tu medida. Atendemos
              eventos, oficinas, reuniones y previas.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-paper text-ink hover:bg-amber-warm px-6 py-4 rounded-full font-semibold transition-all hover-lift shadow-stamp"
            >
              Hablar con un vendedor
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-paper/50">
              Lun a Dom · 9 → 04
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
