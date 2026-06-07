"use client";

import Link from "next/link";
import Image from "next/image";
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
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="flex items-center" aria-label="Drugstore El Paracao - Inicio">
            <Image src="/logo.svg" width={48} height={48} alt="Drugstore El Paracao" priority />
          </Link>
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 px-3 py-2 rounded-md hover:bg-zinc-50 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <SearchBar />

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/servicios"
            className="hidden md:inline-flex items-center text-xs font-semibold text-zinc-600 hover:text-zinc-900"
          >
            ¿Cómo pedir?
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="group relative p-2 text-zinc-700 hover:text-zinc-900 transition-colors"
            aria-label={`Abrir carrito (${totalItems} productos)`}
          >
            {totalItems > 0 && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {totalItems}
              </div>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
