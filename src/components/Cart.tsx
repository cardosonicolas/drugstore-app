"use client";

import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCoordinates,
  calculateDistance,
  calculateShippingCost,
  STORE_COORDINATES,
} from "@/utils/geo";
import { products, getProductsByCategory } from "@/data/seeds";

export default function Cart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [distance, setDistance] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculateShipping = async () => {
    if (!address.trim()) {
      setAddressError("Ingresa una dirección para calcular el envío");
      return;
    }

    setIsCalculating(true);
    setAddressError("");
    setShippingCost(0);
    setDistance(null);

    const coords = await getCoordinates(address);

    if (coords) {
      const dist = calculateDistance(
        coords.lat,
        coords.lon,
        STORE_COORDINATES.lat,
        STORE_COORDINATES.lon
      );
      setDistance(dist);
      setShippingCost(calculateShippingCost(dist));
    } else {
      setAddressError(
        "No se pudo calcular el envío automáticamente. El costo se confirmará por WhatsApp."
      );
    }
    setIsCalculating(false);
  };

  const handleCheckout = () => {
    if (!address.trim()) {
      setAddressError("Por favor ingresa tu dirección de envío");
      return;
    }

    const shippingInfo =
      distance !== null
        ? `*Envío (${distance}km):* $${shippingCost}`
        : `*Envío:* A coordinar por WhatsApp`;

    const finalTotal = totalPrice + shippingCost;

    const msg = `Hola! Quiero hacer un pedido.%0A%0A*Items:*%0A${cart
      .map((i) => `${i.quantity}x ${i.name}`)
      .join(
        "%0A"
      )}%0A%0A*Subtotal:* $${totalPrice}%0A${shippingInfo}%0A*Total:* $${finalTotal}%0A%0A*Dirección de envío:* ${address}`;

    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${msg}`,
      "_blank"
    );
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const crossSell = cart.length
    ? (() => {
        const firstCategory = products.find((p) => p.id === cart[0]?.id)?.categoryId;
        if (!firstCategory) return products.slice(0, 3);
        const sameCat = getProductsByCategory(firstCategory).filter(
          (p) => !cart.find((c) => c.id === p.id)
        );
        return (sameCat.length >= 3 ? sameCat : [...sameCat, ...products.filter((p) => !cart.find((c) => c.id === p.id))]).slice(0, 3);
      })()
    : [];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Tu pedido 🛒</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {totalItems} {totalItems === 1 ? "producto" : "productos"} en el carrito
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-zinc-50 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-400"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-200 mb-4"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="text-zinc-700 font-medium">Tu carrito está vacío.</p>
              <p className="text-zinc-400 text-sm mt-1">
                ¡Empezá tu pedido y recibí en tu casa!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Ver más vendidos
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-zinc-50 rounded-lg p-3 hover:bg-zinc-100 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm font-bold text-zinc-700 mt-1">
                        ${item.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Quitar una unidad de ${item.name}`}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                      <span className="text-sm font-medium text-zinc-700 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Agregar una unidad más de ${item.name}`}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="self-start p-1 hover:bg-red-50 rounded-full transition-colors group"
                    aria-label={`Quitar ${item.name} del carrito`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-zinc-300 group-hover:text-red-500 transition-colors"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}

              {crossSell.length > 0 && (
                <div className="pt-4 mt-4 border-t border-zinc-100">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                    ¿Sumás algo más?
                  </p>
                  <ul className="space-y-2">
                    {crossSell.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/producto/${p.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 transition-colors"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-zinc-500">
                              ${p.price.toLocaleString("es-AR")}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-green-600">
                            Ver →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-zinc-100 px-6 py-6 bg-white space-y-4">
            <div className="rounded-xl bg-blue-50 border border-blue-100 px-3 py-2.5 flex items-center gap-2">
              <span className="text-base" aria-hidden="true">🚚</span>
              <p className="text-xs text-blue-800">
                <strong>Te llega en ~30 min</strong> en zona centro. Calculá el costo abajo.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="cart-address" className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
                  Dirección de envío <span className="text-red-500">*</span>
                </label>
                <input
                  id="cart-address"
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value.trim()) setAddressError("");
                  }}
                  placeholder="Escribí tu dirección (ej: Urquiza 1200, Paraná)"
                  className={`w-full px-4 py-2.5 bg-zinc-50 border ${
                    addressError
                      ? "border-red-300 focus:ring-red-200"
                      : "border-zinc-200 focus:ring-zinc-200"
                  } rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-zinc-300 transition-all placeholder:text-zinc-400`}
                />
                {addressError && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{addressError}</p>
                )}
              </div>

              <button
                onClick={handleCalculateShipping}
                disabled={isCalculating || !address}
                className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
              >
                {isCalculating ? "Calculando..." : "Calcular costo de envío"}
              </button>

              {distance !== null && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-700">Distancia al local:</span>
                    <span className="font-bold text-blue-900">{distance} km</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-blue-700">Costo de envío:</span>
                    <span className="font-bold text-blue-900">
                      ${shippingCost.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="cart-notes" className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
                  Notas / Referencias
                </label>
                <input
                  id="cart-notes"
                  type="text"
                  placeholder="Piso, depto, entrecalles, color de casa..."
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-zinc-300 transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>Subtotal ({totalItems} {totalItems === 1 ? "producto" : "productos"})</span>
                <span>${totalPrice.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>Envío</span>
                <span>
                  $
                  {shippingCost > 0
                    ? shippingCost.toLocaleString("es-AR")
                    : "A calcular"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-zinc-600">Total</span>
                <span className="text-2xl font-bold text-zinc-900">
                  ${(totalPrice + shippingCost).toLocaleString("es-AR")}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.683 5.46l-.999 3.648 3.805-.807z" />
              </svg>
              Enviar pedido por WhatsApp
            </button>
            <p className="text-[11px] text-zinc-400 text-center">
              Te respondemos en minutos. Lun a Dom · 9:00 a 04:00
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
