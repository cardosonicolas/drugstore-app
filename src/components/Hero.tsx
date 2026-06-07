"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { SITE } from "@/lib/seo";

function isOpenNow(): boolean {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 9 || hour < 4;
}

export default function Hero() {
  const { setIsCartOpen } = useCart();
  const open = isOpenNow();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.15),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase ${
              open ? "bg-green-500/20 text-green-300 ring-1 ring-green-400/30" : "bg-red-500/20 text-red-300 ring-1 ring-red-400/30"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${open ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
            />
            {open ? "Abierto ahora · 9:00 a 04:00" : "Cerrado · Volvé a las 9:00"}
          </span>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Tu drugstore a domicilio en{" "}
            <span className="text-green-400">Paraná</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl">
            Bebidas, snacks, chocolates y despensa en la puerta de tu casa. Pedí
            por WhatsApp y recibí en 30 minutos. Atendemos de 9:00 a 04:00,
            todos los días del año.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setIsCartOpen(true);
                document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Hacé tu pedido ahora
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
            </button>

            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-3.5 rounded-full font-medium transition-all ring-1 ring-white/20 hover:ring-white/40"
            >
              Ver cómo pedir
            </Link>
          </div>

          <p className="text-xs text-zinc-400 mt-4">
            {SITE.cities.slice(0, 3).join(" · ")} y zonas aledañas
          </p>
        </div>
      </div>
    </section>
  );
}
