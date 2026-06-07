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
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
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
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="¿Qué buscás hoy? 🍫🥤"
          aria-label="Buscar productos"
        />
        <kbd className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 bg-zinc-100 border border-zinc-200 rounded">
          /
        </kbd>
      </div>

      {open && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden z-50">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-zinc-500 text-center">
              No encontramos productos para &quot;{query}&quot;
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/producto/${p.id}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-50 transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded-md overflow-hidden bg-zinc-100 shrink-0">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        ${p.price.toLocaleString("es-AR")}
                      </p>
                    </div>
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
