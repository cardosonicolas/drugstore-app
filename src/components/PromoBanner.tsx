import { buildWhatsAppUrl } from "@/lib/seo";

export default function PromoBanner() {
  const url = buildWhatsAppUrl(
    "Hola! Quiero coordinar un pedido grande y bonificar el envío."
  );

  return (
    <section
      aria-label="Promo pedidos grandes"
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">
              ¿Pedido grande? Te bonificamos el envío 🚚
            </h2>
            <p className="text-sm sm:text-base text-green-50 mt-1">
              Coordiná por WhatsApp y armamos un combo a tu medida. Atendemos
              eventos, oficinas y reuniones.
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Hablar con un vendedor
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
