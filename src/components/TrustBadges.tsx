const badges = [
  {
    n: "01",
    title: "Delivery exprés",
    desc: "Tu pedido en 30 min en zona centro de Paraná.",
  },
  {
    n: "02",
    title: "Abiertos toda la noche",
    desc: "De 9:00 a 04:00, todos los días del año, incluso feriados.",
  },
  {
    n: "03",
    title: "Pagás como quieras",
    desc: "Efectivo, transferencia, Mercado Pago o tarjetas en 3 cuotas.",
  },
  {
    n: "04",
    title: "+1.000 pedidos",
    desc: "Entregados con éxito en Paraná y zonas aledañas.",
  },
];

export default function TrustBadges() {
  return (
    <section
      aria-label="Beneficios de comprar en El Paracao"
      className="relative w-full bg-cream-dark border-y border-ink/15"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/15 rounded-3xl overflow-hidden">
          {badges.map((b) => (
            <li
              key={b.title}
              className="bg-paper p-5 sm:p-6 flex flex-col gap-3 group hover:bg-cream transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">
                  {b.n}
                </span>
                <span aria-hidden="true" className="font-mono text-ink/20 text-2xl leading-none">
                  ✦
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-tight">
                {b.title}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">{b.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
