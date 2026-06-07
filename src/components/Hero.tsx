"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { SITE } from "@/lib/seo";
import { products } from "@/data/seeds";

function isOpenNow(): boolean {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 9 || hour < 4;
}

const categories = [
  "Bebidas",
  "Chocolates",
  "Snacks",
  "Cigarrillos",
  "Tabacos",
  "Despensa",
  "Cervezas",
  "Vinos",
  "Energizantes",
];

export default function Hero() {
  const { setIsCartOpen } = useCart();
  const open = isOpenNow();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden bg-cream"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-amber-warm/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-oxblood/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-14 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 relative">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.18em] ${
                  open
                    ? "bg-leaf/15 text-leaf-dark ring-1 ring-leaf/30"
                    : "bg-oxblood/15 text-oxblood-dark ring-1 ring-oxblood/30"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    open ? "bg-leaf animate-pulse" : "bg-oxblood"
                  }`}
                />
                {open ? "Abierto · 9 → 04" : "Cerrado · 09:00"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-soft">
                <span aria-hidden="true">★</span>
                +1.000 pedidos entregados
              </span>
            </div>

            <h1
              id="hero-title"
              className="text-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] font-extrabold text-ink"
            >
              Tu kiosco
              <br />
              a la <span className="relative inline-block">
                <span className="relative z-10 text-oxblood">puerta</span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-1 h-3 sm:h-4 bg-amber-warm/70 -z-0" />
              </span>
              <span className="block">de tu casa.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-xl leading-relaxed">
              Bebidas, snacks, chocolates, cigarrillos y despensa en Paraná y
              zonas aledañas. Pedí por WhatsApp y recibilo en{" "}
              <span className="font-display font-bold text-ink">30 minutos</span>{" "}
              — incluso de madrugada.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  document
                    .getElementById("productos")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center justify-center gap-2 bg-oxblood hover:bg-oxblood-dark text-paper px-7 py-4 rounded-full font-semibold transition-all shadow-lift hover-lift"
              >
                Armar mi pedido
                <span className="grid h-6 w-6 place-items-center rounded-full bg-paper/15 transition-transform group-hover:translate-x-0.5">
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
              </button>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-ink text-ink hover:bg-ink hover:text-paper px-7 py-4 rounded-full font-semibold transition-all"
              >
                ¿Cómo funciona?
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-px bg-ink/10 border border-ink/15 rounded-2xl overflow-hidden max-w-xl">
              {[
                { k: "30 min", v: "Entrega en zona centro" },
                { k: "9 → 04", v: "Todos los días del año" },
                { k: "2", v: "Sucursales en Paraná" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="bg-paper px-4 py-3 sm:py-4 flex flex-col gap-0.5"
                >
                  <dt className="font-display text-2xl sm:text-3xl font-extrabold text-ink leading-none">
                    {s.k}
                  </dt>
                  <dd className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-soft">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-4 relative">
            {(() => {
              const featured =
                products.find((p) => p.badge === "bestseller") ?? products[0];
              return (
                <Link
                  href={`/producto/${featured.id}`}
                  className="group block relative bg-paper border-2 border-ink rounded-3xl overflow-hidden shadow-stamp hover-lift"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 -right-3 z-10 grid h-14 w-14 place-items-center rounded-full bg-amber-warm text-ink font-display font-extrabold text-[10px] uppercase tracking-wider text-center leading-tight shadow-stamp rotate-[8deg]"
                  >
                    Top
                    <br />
                    ventas
                  </div>

                  <div className="relative aspect-square bg-cream-dark">
                    <Image
                      src={featured.image}
                      alt={featured.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">
                      Lo más pedido
                    </p>
                    <h3 className="font-display text-lg sm:text-xl font-extrabold text-ink mt-1 capitalize leading-snug line-clamp-2">
                      {featured.name}
                    </h3>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="font-display text-2xl font-extrabold text-ink">
                        ${featured.price.toLocaleString("es-AR")}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-ink group-hover:text-oxblood transition-colors">
                        Ver
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
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })()}

            <p className="text-center mt-4 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-soft">
              {SITE.cities.slice(0, 3).join(" · ")} y zonas aledañas
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative bg-ink text-paper py-3 overflow-hidden border-y border-ink"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-8 px-4 shrink-0">
              {categories.map((c) => (
                <span
                  key={`${dup}-${c}`}
                  className="inline-flex items-center gap-4 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight"
                >
                  <span>{c}</span>
                  <span className="text-amber-warm">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
