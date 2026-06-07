"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/seeds";

const badgeLabels: Record<NonNullable<Product["badge"]>, { text: string; className: string }> = {
  bestseller: { text: "Más vendido", className: "bg-amber-500" },
  offer: { text: "Oferta", className: "bg-red-500" },
  new: { text: "Nuevo", className: "bg-blue-500" },
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 600);
  };

  const hasDiscount =
    typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;

  return (
    <article className="group relative w-full bg-white border border-zinc-100 rounded-xl overflow-hidden duration-300 hover:border-zinc-200 hover:shadow-md transition-all">
      <Link href={`/producto/${product.id}`} className="block" aria-label={product.name}>
        {product.badge && (
          <span
            className={`absolute top-2 left-2 z-10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white rounded-full shadow-sm ${badgeLabels[product.badge].className}`}
          >
            {badgeLabels[product.badge].text}
          </span>
        )}

        <div className="relative h-32 w-full bg-zinc-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover"
          />
        </div>

        <div className="px-3 py-3 w-full">
          <h3 className="text-sm font-semibold text-zinc-900 line-clamp-2 capitalize mb-1 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-base font-bold text-zinc-900">
              ${product.price.toLocaleString("es-AR")}
            </p>
            {hasDiscount && (
              <p className="text-xs text-zinc-400 line-through">
                ${product.compareAtPrice!.toLocaleString("es-AR")}
              </p>
            )}
          </div>

          <p className="text-[10px] text-zinc-500 mb-2">
            🚚 Envío gratis +$5.000
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              aria-label={`Agregar ${product.name} al carrito`}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                isAdding
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-900 hover:bg-zinc-800 text-white"
              }`}
            >
              {isAdding ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Agregado
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                  </svg>
                  Agregar
                </>
              )}
            </button>
            {quantityInCart > 0 && (
              <span className="shrink-0 inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                {quantityInCart}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
