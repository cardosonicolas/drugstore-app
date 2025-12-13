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

  // Estados para el formulario de dirección
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

    // Use input address directly - the API filter handles the context
    const searchAddress = address;

    const coords = await getCoordinates(searchAddress);

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
        "No se pudo calcular el envío automáticamente. El costo deberá ser consultado con el vendedor."
      );
    }
    setIsCalculating(false);
  };

  const handleCheckout = () => {
    if (!address.trim()) {
      setAddressError("Por favor ingresa tu dirección de envío");
      return;
    }

    // Aquí iría la lógica de finalización (ej: enviar WhatsApp)
    console.log("Comprando con dirección:", address);

    // Format shipping info for WhatsApp
    const shippingInfo =
      distance !== null
        ? `*Envío (${distance}km):* $${shippingCost}`
        : `*Envío:* A coordinar con el vendedor`;

    const finalTotal = totalPrice + shippingCost;

    const msg = `Hola! Quiero hacer un pedido.%0A%0A*Items:*%0A${cart
      .map((i) => `${i.quantity}x ${i.name}`)
      .join(
        "%0A"
      )}%0A%0A*Subtotal:* $${totalPrice}%0A${shippingInfo}%0A*Total:* $${finalTotal}%0A%0A*Dirección de envío:* ${address} (Paraná)`;

    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${msg}`,
      "_blank"
    );
    setIsCartOpen(false);
  };

  // Prevent body scroll when cart is open
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Carrito</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-zinc-50 rounded-full transition-colors"
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

        {/* Cart Items */}
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
              <p className="text-zinc-400 text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-zinc-50 rounded-lg p-3 hover:bg-zinc-100 transition-colors"
                >
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
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
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
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
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
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-100 px-6 py-6 bg-white space-y-4">
            {/* Formulario de Dirección Simple */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
                  Dirección de envío <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value.trim()) setAddressError("");
                  }}
                  placeholder="Calle y altura en Paraná (ej: Urquiza 1200)"
                  className={`w-full px-4 py-2.5 bg-zinc-50 border ${
                    addressError
                      ? "border-red-300 focus:ring-red-200"
                      : "border-zinc-200 focus:ring-zinc-200"
                  } rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-zinc-300 transition-all placeholder:text-zinc-400`}
                />
                {addressError && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {addressError}
                  </p>
                )}
              </div>

              <button
                onClick={handleCalculateShipping}
                disabled={isCalculating || !address}
                className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-medium transition-colors mb-2 disabled:opacity-50"
              >
                {isCalculating ? "Calculando..." : "Calcular Envío"}
              </button>

              {distance !== null && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-700">Distancia al local:</span>
                    <span className="font-bold text-blue-900">
                      {distance} km
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-blue-700">Costo de envío:</span>
                    <span className="font-bold text-blue-900">
                      ${shippingCost}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
                  Notas / Referencias
                </label>
                <input
                  type="text"
                  placeholder="Piso, depto, color de casa..."
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-zinc-300 transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>Subtotal</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>Envío</span>
                <span>
                  $
                  {shippingCost > 0
                    ? shippingCost.toLocaleString()
                    : "A calcular"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-zinc-600">Total</span>
                <span className="text-2xl font-bold text-zinc-900">
                  ${(totalPrice + shippingCost).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3.5 rounded-xl font-medium transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center gap-2"
            >
              <span>Finalizar Compra</span>
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
