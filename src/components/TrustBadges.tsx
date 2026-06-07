const badges = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
        <path d="M10 17h4V5H2v12h3" />
        <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
        <path d="M14 17h2" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    title: "Envío exprés",
    desc: "Tu pedido en 30 min en zona centro",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Abierto toda la noche",
    desc: "De 9:00 a 04:00, todos los días",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    title: "Pagás como quieras",
    desc: "Efectivo, transferencia o Mercado Pago",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
    ),
    title: "+1.000 pedidos",
    desc: "Entregados con éxito en Paraná",
  },
];

export default function TrustBadges() {
  return (
    <section
      aria-label="Beneficios de comprar en El Paracao"
      className="w-full border-b border-zinc-100 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((b) => (
            <li key={b.title} className="flex flex-col items-center text-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50">
                {b.icon}
              </div>
              <p className="text-sm font-semibold text-zinc-900">{b.title}</p>
              <p className="text-xs text-zinc-500">{b.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
