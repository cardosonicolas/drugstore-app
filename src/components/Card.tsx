"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/seeds";

const badgeLabels: Record<
  NonNullable<Product["badge"]>,
  { text: string; className: string }
> = {
  bestseller: { text: "Top ventas", className: "bg-amber-warm text-ink" },
  offer: { text: "Oferta", className: "bg-oxblood text-paper" },
  new: { text: "Nuevo", className: "bg-leaf text-paper" },
};

export default function Card({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 800);
  };

  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;

  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <article className="group relative w-full bg-paper border-2 border-ink/10 rounded-2xl overflow-hidden hover-lift shadow-card hover:shadow-lift hover:border-ink/20">
      <Link href={`/producto/${product.id}`} className="block" aria-label={product.name}>
        <div className="relative h-36 w-full bg-cream-dark overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              backgroundImage:
                "linear-gradient(180deg, transparent 60%, rgba(26,22,20,0.5) 100%)",
            }}
          />

          {product.badge && (
            <span
              className={`absolute top-2 left-2 z-10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-stamp ${badgeLabels[product.badge].className}`}
            >
              {badgeLabels[product.badge].text}
            </span>
          )}

          {hasDiscount && (
            <span className="absolute top-2 right-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-oxblood text-paper text-[11px] font-bold font-mono shadow-stamp">
              -{discountPct}%
            </span>
          )}
        </div>

        <div className="px-3.5 py-3.5">
          <h3 className="text-sm font-semibold text-ink line-clamp-2 capitalize mb-2 min-h-[2.5rem] leading-snug">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display text-lg font-extrabold text-ink leading-none">
              ${product.price.toLocaleString("es-AR")}
            </span>
            {hasDiscount && (
              <span className="font-mono text-[10px] text-ink-soft line-through">
                ${product.compareAtPrice!.toLocaleString("es-AR")}
              </span>
            )}
          </div>

          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-ink-soft mb-3">
            <span className="text-leaf-dark">●</span> Envío +$5.000 gratis
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              aria-label={`Agregar ${product.name} al carrito`}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                isAdding
                  ? "bg-leaf text-paper"
                  : "bg-ink hover:bg-oxblood text-paper"
              }`}
            >
              {isAdding ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Listo
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                  </svg>
                  Agregar
                </>
              )}
            </button>
            {quantityInCart > 0 && (
              <span className="shrink-0 grid h-7 w-7 place-items-center rounded-full bg-amber-warm text-ink text-xs font-bold font-mono shadow-stamp">
                {quantityInCart}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
