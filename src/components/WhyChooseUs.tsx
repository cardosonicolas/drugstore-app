const reasons = [
  {
    n: "01",
    title: "Envío exprés en la zona",
    desc: "Hacé tu pedido por WhatsApp y lo tenés en la puerta de tu casa en 20-30 minutos en zona centro de Paraná.",
  },
  {
    n: "02",
    title: "Abiertos toda la noche",
    desc: "De 9:00 a 04:00, los 365 días del año. ¿Antojo de madrugada? Cubierto.",
  },
  {
    n: "03",
    title: "Pagás como quieras",
    desc: "Efectivo contra entrega, transferencia bancaria, Mercado Pago o tarjetas en 3 cuotas sin interés.",
  },
  {
    n: "04",
    title: "Dos sucursales a tu servicio",
    desc: "El Paracao (Américas 3196) y El Paracao 2 (Brown 1195) para que tu pedido salga lo más rápido posible.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-title"
      className="relative w-full bg-paper border-y border-ink/15 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-amber-warm/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
              <span className="h-px w-8 bg-oxblood" />
              Por qué elegirnos
            </span>
            <h2
              id="why-title"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink mt-4 leading-[0.95]"
            >
              Más que un
              <br />
              kiosco, un
              <br />
              <span className="text-oxblood">ritual</span> de barrio.
            </h2>
            <p className="text-ink-soft mt-6 text-base sm:text-lg max-w-md leading-relaxed">
              Somos el drugstore que tu viejo y tu vieja ya conocen. La diferencia
              es que ahora te llega a la puerta, sin hacer cola, sin esperar.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#e40044", "#009ee0", "#009035"].map((c) => (
                  <span
                    key={c}
                    className="h-8 w-8 rounded-full border-2 border-paper"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-xs text-ink-soft">
                <span className="font-display font-bold text-ink">+1.000</span>{" "}
                vecinos confían en nosotros
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-px bg-ink/10 border border-ink/15 rounded-3xl overflow-hidden">
              {reasons.map((r) => (
                <li
                  key={r.title}
                  className="group bg-paper hover:bg-cream p-6 sm:p-7 flex gap-5 sm:gap-7 transition-colors"
                >
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-oxblood/40 group-hover:text-oxblood transition-colors shrink-0 leading-none">
                    {r.n}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                      {r.title}
                    </h3>
                    <p className="text-sm text-ink-soft mt-2 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden sm:grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-ink-soft group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all"
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
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
