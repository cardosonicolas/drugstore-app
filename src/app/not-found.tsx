import Link from "next/link";
import { SITE } from "@/lib/seo";

export default function NotFound() {
  return (
    <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-oxblood/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-warm/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
          Error · 404
        </span>
        <p className="font-display text-[clamp(7rem,18vw,12rem)] font-extrabold text-ink leading-[0.85] mt-2">
          4
          <span className="relative inline-block">
            <span className="text-oxblood">0</span>
            <span aria-hidden="true" className="absolute inset-x-1 bottom-2 h-3 bg-amber-warm -z-0" />
          </span>
          4
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink mt-4 leading-tight">
          No encontramos esa página.
        </h1>
        <p className="text-ink-soft mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Puede que el producto o la categoría que buscás ya no esté disponible.
          Te invitamos a recorrer nuestro catálogo o contactarnos por WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-oxblood text-paper px-6 py-4 rounded-full font-bold transition-all hover-lift shadow-stamp"
          >
            Volver al inicio
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
              "Hola! No encuentro un producto en su web."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-ink text-ink hover:bg-ink hover:text-paper px-6 py-4 rounded-full font-bold transition-all"
          >
            Pedinos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
