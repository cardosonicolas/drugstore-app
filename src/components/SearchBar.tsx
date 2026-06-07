"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/seeds";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results =
    query.trim().length > 0
      ? products
          .filter((p) =>
            p.name.toLowerCase().includes(query.trim().toLowerCase())
          )
          .slice(0, 6)
      : [];

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        const input = containerRef.current?.querySelector("input");
        input?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        (containerRef.current?.querySelector("input") as HTMLInputElement)?.blur();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-1 max-w-2xl mx-4">
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-ink-soft"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="block w-full pl-11 pr-12 py-2.5 border-2 border-ink/15 rounded-full leading-5 bg-paper placeholder:text-ink-soft/60 focus:outline-none focus:border-ink focus:bg-paper text-sm font-medium text-ink transition-colors"
          placeholder="Buscá lo que te antoja…"
          aria-label="Buscar productos"
        />
        <kbd className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center px-1.5 h-5 text-[10px] font-mono font-bold text-ink-soft bg-cream-dark border border-ink/15 rounded">
          /
        </kbd>
      </div>

      {open && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-paper rounded-2xl shadow-lift border-2 border-ink overflow-hidden z-50">
          {results.length === 0 ? (
            <div className="p-5 text-sm text-ink-soft text-center">
              <p className="font-display text-lg font-bold text-ink mb-1">
                Nada por acá
              </p>
              <p>
                No encontramos productos para &quot;{query}&quot;. Probá con
                otra palabra.
              </p>
            </div>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/producto/${p.id}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-cream border-b border-ink/10 last:border-0 transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-cream-dark shrink-0">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink truncate">
                        {p.name}
                      </p>
                      <p className="font-mono text-xs text-oxblood font-bold">
                        ${p.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">
                      Ver →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
