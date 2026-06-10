"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import SearchBar from "@/components/SearchBar";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-ink text-cream text-[11px] sm:text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className="flex items-center gap-3 font-mono uppercase tracking-[0.18em]">
            <span className="hidden sm:inline">Paraná · Entre Ríos</span>
            <span className="sm:hidden">Paraná</span>
            <span className="hidden md:inline opacity-50">/</span>
            <span className="hidden md:inline">9:00 → 04:00 todos los días</span>
          </div>
          <div className="flex items-center gap-3 font-mono uppercase tracking-[0.18em]">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-warm opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-warm" />
              </span>
              Delivery activo
            </span>
          </div>
        </div>
      </div>

      <nav className="bg-paper/95 backdrop-blur-md border-b border-ink/15">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="Drugstore El Paracao - Inicio"
            >
              <span className="relative h-16 w-16 rounded-full overflow-hidden bg-ink ring-1 ring-ink/10 shadow-stamp transition-transform group-hover:rotate-[-6deg]">
                <img
                  src="/logoOriginal.svg"
                  alt="Drugstore El Paracao"
                  className="h-full w-full object-contain p-1"
                />
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-amber-warm ring-2 ring-paper" />
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-tight text-ink">
                  El Paracao
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink/60 mt-0.5">
                  Drugstore
                </span>
              </span>
            </Link>

            <span aria-hidden="true" className="hidden lg:block h-8 w-px bg-ink/15" />

            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-ink-soft hover:text-ink relative px-3 py-2 rounded-md transition-colors group"
                  >
                    {l.label}
                    <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-oxblood scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <SearchBar />

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/servicios"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-ink-soft hover:text-ink transition-colors"
            >
              ¿Cómo pedir?
              <span aria-hidden="true">→</span>
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative inline-flex items-center gap-2 bg-ink hover:bg-oxblood text-paper pl-3 pr-4 py-2.5 rounded-full transition-all hover-lift shadow-stamp"
              aria-label={`Abrir carrito (${totalItems} productos)`}
            >
              <span className="relative">
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
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-5 min-w-5 px-1 place-items-center rounded-full bg-amber-warm text-ink text-[10px] font-bold ring-2 ring-paper">
                    {totalItems}
                  </span>
                )}
              </span>
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-[0.12em]">
                Mi pedido
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
