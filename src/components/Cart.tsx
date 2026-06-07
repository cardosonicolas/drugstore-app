"use client";

import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import {
  getCoordinates,
  calculateDistance,
  calculateShippingCost,
  STORE_COORDINATES,
} from "@/utils/geo";

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
      setAddressError("Ingresá una dirección para calcular el envío");
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
        "No pudimos calcular el envío automático. Lo confirmamos por WhatsApp."
      );
    }
    setIsCalculating(false);
  };

  const handleCheckout = () => {
    if (!address.trim()) {
      setAddressError("Por favor ingresá tu dirección de envío");
      return;
    }

    const shippingInfo =
      distance !== null
        ? `*Envío (${distance}km):* $${shippingCost}`
        : `*Envío:* A coordinar por WhatsApp`;

    const finalTotal = totalPrice + shippingCost;

    const msg = `Hola! Quiero hacer un pedido.%0A%0A*Items:*%0A${cart
      .map((i) => `${i.quantity}x ${i.name}`)
      .join("%0A")}%0A%0A*Subtotal:* $${totalPrice}%0A${shippingInfo}%0A*Total:* $${finalTotal}%0A%0A*Dirección de envío:* ${address}`;

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

  return (
    <>
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl z-50 flex flex-col"
        aria-label="Carrito de compras"
      >
        <div className="relative bg-ink text-paper px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-warm mb-1">
                Tu pedido
              </p>
              <h2 className="font-display text-2xl font-extrabold">
                {totalItems} {totalItems === 1 ? "producto" : "productos"}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full bg-paper/10 hover:bg-paper/20 transition-colors"
              aria-label="Cerrar carrito"
            >
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="relative">
                <div className="grid h-24 w-24 place-items-center rounded-full bg-paper border-2 border-ink/15">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ink-soft"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-amber-warm text-ink text-lg"
                >
                  ✦
                </span>
              </div>
              <p className="text-ink font-display text-2xl font-bold mt-6">
                Tu carrito está vacío
              </p>
              <p className="text-ink-soft text-sm mt-2 max-w-[260px]">
                Arrancá tu pedido y recibilo en tu casa en 30 minutos.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 inline-flex items-center gap-2 bg-ink hover:bg-oxblood text-paper px-5 py-3 rounded-full text-sm font-bold uppercase tracking-[0.1em] transition-all"
              >
                Ver el catálogo
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
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group flex gap-3 bg-paper border border-ink/15 rounded-2xl p-3 hover:border-ink/30 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-cream-dark shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm font-semibold text-ink line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                      <p className="font-display text-base font-extrabold text-ink mt-0.5">
                        ${item.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={`Quitar una unidad de ${item.name}`}
                        className="grid h-7 w-7 place-items-center rounded-full bg-paper border-2 border-ink/15 hover:border-ink hover:bg-ink hover:text-paper transition-all"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                      <span className="font-mono text-sm font-bold text-ink w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Agregar una unidad más de ${item.name}`}
                        className="grid h-7 w-7 place-items-center rounded-full bg-paper border-2 border-ink/15 hover:border-ink hover:bg-ink hover:text-paper transition-all"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
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
                    className="self-start p-1.5 hover:bg-oxblood/10 rounded-full transition-colors group/del"
                    aria-label={`Quitar ${item.name} del carrito`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-ink-soft group-hover/del:text-oxblood transition-colors"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t-2 border-ink/15 px-6 py-5 bg-paper space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="rounded-2xl bg-amber-warm/15 border border-amber-warm/30 px-4 py-3 flex items-center gap-3">
              <span className="font-display text-xl">⚡</span>
              <p className="text-xs text-ink leading-relaxed">
                <strong className="font-display">Te llega en ~30 min</strong> en
                zona centro. Calculá el costo abajo.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="cart-address"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-1.5"
                >
                  Dirección de envío <span className="text-oxblood">*</span>
                </label>
                <input
                  id="cart-address"
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value.trim()) setAddressError("");
                  }}
                  placeholder="Urquiza 1200, Paraná"
                  className={`w-full px-4 py-3 bg-paper border-2 ${
                    addressError
                      ? "border-oxblood focus:ring-oxblood/20"
                      : "border-ink/15 focus:border-ink focus:ring-ink/10"
                  } rounded-xl text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-ink-soft/50`}
                />
                {addressError && (
                  <p className="text-xs text-oxblood mt-1.5 ml-1">
                    {addressError}
                  </p>
                )}
              </div>

              <button
                onClick={handleCalculateShipping}
                disabled={isCalculating || !address}
                className="w-full py-2.5 bg-cream-dark hover:bg-ink hover:text-paper text-ink rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all disabled:opacity-50 border-2 border-ink/15 hover:border-ink"
              >
                {isCalculating ? "Calculando..." : "Calcular envío"}
              </button>

              {distance !== null && (
                <div className="bg-amber-warm/15 p-3 rounded-xl border border-amber-warm/30">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-ink-soft">Distancia al local:</span>
                    <span className="font-mono font-bold text-ink">
                      {distance} km
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-ink-soft">Costo de envío:</span>
                    <span className="font-mono font-bold text-ink">
                      ${shippingCost.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="cart-notes"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-1.5"
                >
                  Notas / referencias
                </label>
                <input
                  id="cart-notes"
                  type="text"
                  placeholder="Piso, depto, entrecalles..."
                  className="w-full px-4 py-3 bg-paper border-2 border-ink/15 rounded-xl text-sm focus:outline-none focus:border-ink focus:ring-4 focus:ring-ink/10 transition-all placeholder:text-ink-soft/50"
                />
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t-2 border-dashed border-ink/15">
              <div className="flex items-center justify-between text-sm text-ink-soft">
                <span>
                  Subtotal ({totalItems}{" "}
                  {totalItems === 1 ? "producto" : "productos"})
                </span>
                <span className="font-mono">
                  ${totalPrice.toLocaleString("es-AR")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-ink-soft">
                <span>Envío</span>
                <span className="font-mono">
                  $
                  {shippingCost > 0
                    ? shippingCost.toLocaleString("es-AR")
                    : "A calcular"}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-3 border-t-2 border-ink">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                  Total
                </span>
                <span className="font-display text-3xl font-extrabold text-ink">
                  ${(totalPrice + shippingCost).toLocaleString("es-AR")}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-leaf hover:bg-leaf-dark text-paper py-4 rounded-2xl font-bold uppercase tracking-[0.1em] transition-all hover-lift shadow-stamp flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.683 5.46l-.999 3.648 3.805-.807z" />
              </svg>
              Enviar pedido por WhatsApp
            </button>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-ink-soft text-center">
              Te respondemos en minutos · Lun a Dom · 9 → 04
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
