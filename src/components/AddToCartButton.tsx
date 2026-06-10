"use client";

import { useState } from "react";
import { useCart, type CartProductInput } from "@/contexts/CartContext";

export default function AddToCartButton({
  product,
}: {
  product: CartProductInput;
}) {
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    if (quantity < 1) return;
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-stretch gap-3 items-center sm:justify-center">
        <div
          role="group"
          aria-label="Seleccionar cantidad"
          className="inline-flex items-stretch h-14 border-2 border-ink/15 rounded-2xl bg-paper overflow-hidden shrink-0 w-full sm:w-42"
        >
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Disminuir cantidad"
            className="flex-1 grid place-items-center text-ink hover:bg-cream-dark transition-colors text-2xl font-bold leading-none"
          >
            −
          </button>
          <span
            aria-live="polite"
            className="flex-1 grid place-items-center font-display font-extrabold text-xl text-ink border-x-2 border-ink/15 tabular-nums"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Aumentar cantidad"
            className="flex-1 grid place-items-center text-ink hover:bg-cream-dark transition-colors text-2xl font-bold leading-none"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Agregar ${product.name} al carrito`}
          className={`w-full sm:flex-1 sm:max-w-md inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold uppercase tracking-[0.05em] text-sm transition-all hover-lift shadow-stamp ${
            isAdding
              ? "bg-leaf text-paper"
              : "bg-ink hover:bg-oxblood text-paper"
          }`}
        >
          {isAdding ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              ¡Listo!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
              </svg>
              Agregar al carrito
            </>
          )}
        </button>
      </div>
      {quantityInCart > 0 && (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-leaf-dark">
          Ya tenés {quantityInCart}{" "}
          {quantityInCart === 1 ? "unidad" : "unidades"} en el carrito
        </p>
      )}
    </div>
  );
}
