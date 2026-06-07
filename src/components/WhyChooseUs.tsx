const reasons = [
  {
    title: "Envío exprés en la zona",
    desc: "Lleganos tu pedido por WhatsApp y lo tenés en la puerta de tu casa en 20-30 minutos en zona centro de Paraná.",
    icon: "⚡",
  },
  {
    title: "Abiertos toda la noche",
    desc: "De 9:00 a 04:00, todos los días del año, incluyendo feriados. ¿Antojo de madrugada? Cubierto.",
    icon: "🌙",
  },
  {
    title: "Pagás como quieras",
    desc: "Efectivo contra entrega, transferencia bancaria, Mercado Pago o tarjetas en 3 cuotas sin interés.",
    icon: "💳",
  },
  {
    title: "Dos sucursales a tu servicio",
    desc: "El Paracao (Américas 3196) y El Paracao 2 (Brown 1195) para que tu pedido salga lo más rápido posible.",
    icon: "📍",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-title"
      className="w-full bg-zinc-50 border-y border-zinc-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2
            id="why-title"
            className="text-2xl sm:text-3xl font-bold text-zinc-900"
          >
            ¿Por qué pedir en El Paracao?
          </h2>
          <p className="text-zinc-500 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Más que un kiosco, somos tu drugstore de confianza a domicilio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <article
              key={r.title}
              className="bg-white rounded-2xl p-6 ring-1 ring-zinc-100 hover:ring-zinc-200 hover:shadow-sm transition-all"
            >
              <div className="text-3xl mb-3" aria-hidden="true">
                {r.icon}
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{r.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
