"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function Card({ product }: { product: any }) {
  const { addToCart, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 600);
  };

  // Find quantity of this product in cart
  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src={product.image}
          alt="Product"
          className="h-32 w-full object-cover rounded-t-xl"
        />
        <div className="px-3 py-3 w-full">
          <p className="text-sm font-bold text-black truncate block capitalize">
            {product.name}
          </p>

          <div className="flex items-center">
            <p className="text-sm font-semibold text-black cursor-auto my-3">
              ${product.price}
            </p>

            {/* Quantity in cart - simple number */}
            {quantityInCart > 0 && (
              <span className="ml-auto mr-2 text-sm font-bold text-zinc-900">
                {quantityInCart}
              </span>
            )}
            <button
              onClick={handleAddToCart}
              className={`${
                quantityInCart > 0 ? "" : "ml-auto"
              } p-2 rounded-full transition-all duration-300 ${
                isAdding
                  ? "bg-green-500 text-white scale-110"
                  : "hover:bg-zinc-100 text-zinc-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </button>
          </div>
        </div>
      </a>
    </div>
  );
}
