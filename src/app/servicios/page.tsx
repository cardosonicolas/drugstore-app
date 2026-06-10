import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import PromoBanner from "@/components/PromoBanner";
import { deliveryZones } from "@/lib/zones";
import { SITE, buildWhatsAppUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios de delivery en Paraná | Bebidas, snacks y más",
  description:
    "Conocé todos los servicios de Drugstore El Paracao: delivery en Paraná y zonas aledañas, medios de pago, horarios, zonas de cobertura y más. Hacemos tu pedido por WhatsApp.",
  alternates: { canonical: `${SITE.url}/servicios` },
};

const services = [
  {
    n: "01",
    title: "Delivery a domicilio",
    desc: "Recibí tu pedido en la puerta de tu casa en 20-30 minutos en zona centro y entre 30 y 70 minutos en barrios y zonas aledañas.",
  },
  {
    n: "02",
    title: "Pickup en sucursal",
    desc: "Hacés tu pedido por WhatsApp y lo retirás sin hacer fila en cualquiera de nuestras dos sucursales.",
  },
  {
    n: "03",
    title: "Pedidos grandes y eventos",
    desc: "Coordinamos pedidos para oficinas, eventos y reuniones con bonificación de envío. Escribinos y armamos un combo a tu medida.",
  },
  {
    n: "04",
    title: "Atención nocturna",
    desc: "Estamos abiertos todos los días, de 9:00 a 04:00. ¿Antojo de madrugada? Hacé tu pedido por WhatsApp.",
  },
];

const paymentMethods = [
  { name: "Efectivo", desc: "Contra entrega" },
  { name: "Transferencia", desc: "Bancaria" },
  { name: "Mercado Pago", desc: "3 cuotas sin interés" },
  { name: "Tarjetas", desc: "Débito y crédito" },
];

const steps = [
  { n: 1, title: "Elegí tus productos", desc: "Recorré nuestro catálogo online o pedinos por WhatsApp lo que necesites." },
  { n: 2, title: "Confirmá el pedido", desc: "Revisamos juntos el pedido, los precios y calculamos el envío a tu dirección." },
  { n: 3, title: "Recibí en tu casa", desc: "Entregamos en 20-70 minutos según tu zona. Pagás al recibir." },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="relative w-full bg-ink text-paper overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(245,240,225,0.06) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-amber-warm/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-oxblood/40 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[28rem] sm:h-[36rem] flex items-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-warm">
              <span className="h-px w-8 bg-amber-warm" />
              Nuestros servicios
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold mt-5 leading-[0.92]">
              Tu drugstore a domicilio,
              <br />
              <span className="text-amber-warm">simple y rápido</span>.
            </h1>
            <p className="text-paper/70 mt-5 text-base sm:text-lg max-w-2xl leading-relaxed">
              Delivery 24 hs en Paraná y zonas aledañas. Hacemos tu pedido por
              WhatsApp y te llega en minutos.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-title" className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                <span className="h-px w-8 bg-oxblood" />
                Lo que ofrecemos
              </span>
              <h2
                id="services-title"
                className="font-display text-4xl sm:text-5xl font-extrabold text-ink mt-3 leading-[0.95]"
              >
                Servicios <span className="text-oxblood">a tu medida</span>.
              </h2>
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/15 rounded-3xl overflow-hidden">
            {services.map((s) => (
              <li
                key={s.title}
                className="group bg-paper hover:bg-cream p-6 sm:p-7 flex flex-col gap-3 transition-colors"
              >
                <span className="font-mono text-xs text-oxblood font-bold">
                  {s.n}
                </span>
                <h3 className="font-display text-xl font-bold text-ink leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="steps-title"
        className="py-16 sm:py-20 bg-cream-dark border-y border-ink/15"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
              <span className="h-px w-8 bg-oxblood" />
              Cómo pedir
              <span className="h-px w-8 bg-oxblood" />
            </span>
            <h2
              id="steps-title"
              className="font-display text-4xl sm:text-5xl font-extrabold text-ink mt-4 leading-tight"
            >
              En <span className="text-oxblood">3 pasos</span>.
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-ink/15 rounded-3xl overflow-hidden">
            {steps.map((step) => (
              <li
                key={step.n}
                className="bg-paper p-7 sm:p-8 flex flex-col gap-4 hover:bg-cream transition-colors group"
              >
                <span className="font-display text-5xl sm:text-6xl font-extrabold text-oxblood/30 group-hover:text-oxblood transition-colors leading-none">
                  {String(step.n).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="text-center mt-12">
            <a
              href={buildWhatsAppUrl("Hola! Quiero hacer un pedido.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-leaf hover:bg-leaf-dark text-paper px-7 py-4 rounded-full font-bold transition-all hover-lift shadow-stamp"
            >
              Empezar mi pedido por WhatsApp
              <span className="grid h-6 w-6 place-items-center rounded-full bg-paper/15">
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
              </span>
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="zones-title" className="py-16 sm:py-20 bg-paper">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
              <span className="h-px w-8 bg-oxblood" />
              Cobertura
              <span className="h-px w-8 bg-oxblood" />
            </span>
            <h2
              id="zones-title"
              className="font-display text-4xl sm:text-5xl font-extrabold text-ink mt-3 leading-tight"
            >
              Zonas de <span className="text-oxblood">delivery</span>.
            </h2>
            <p className="text-ink-soft mt-3 text-sm sm:text-base max-w-xl mx-auto">
              Hacemos envíos a Paraná y zonas aledañas con tiempos estimados.
            </p>
          </div>
          <div className="border-2 border-ink/15 rounded-3xl overflow-hidden bg-paper">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-ink text-paper">
                  <tr>
                    <th className="text-left py-4 px-5 font-mono text-[11px] uppercase tracking-[0.18em]">
                      Zona
                    </th>
                    <th className="text-left py-4 px-5 font-mono text-[11px] uppercase tracking-[0.18em]">
                      Tiempo
                    </th>
                    <th className="text-right py-4 px-5 font-mono text-[11px] uppercase tracking-[0.18em]">
                      Envío
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((z, i) => (
                    <tr
                      key={z.name}
                      className={`border-t border-ink/10 hover:bg-cream transition-colors ${
                        i % 2 === 0 ? "bg-paper" : "bg-cream-dark/30"
                      }`}
                    >
                      <td className="py-4 px-5 text-ink font-semibold">
                        {z.name}
                      </td>
                      <td className="py-4 px-5 text-ink-soft font-mono text-xs uppercase tracking-[0.1em]">
                        {z.eta}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <span className="font-display text-lg font-extrabold text-ink">
                          ${z.cost.toLocaleString("es-AR")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mt-5 text-center">
            Envío gratis en compras según zona · Consultá por WhatsApp
          </p>
        </div>
      </section>

      <section
        aria-labelledby="payments-title"
        className="py-16 sm:py-20 bg-cream-dark border-y border-ink/15"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
              <span className="h-px w-8 bg-oxblood" />
              Medios de pago
              <span className="h-px w-8 bg-oxblood" />
            </span>
            <h2
              id="payments-title"
              className="font-display text-4xl sm:text-5xl font-extrabold text-ink mt-3 leading-tight"
            >
              Pagás como <span className="text-oxblood">querés</span>.
            </h2>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {paymentMethods.map((m) => (
              <li
                key={m.name}
                className="bg-paper border-2 border-ink/15 rounded-2xl p-5 sm:p-6 text-center hover-lift hover:border-ink transition-all"
              >
                <p className="font-display text-xl sm:text-2xl font-extrabold text-ink">
                  {m.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft mt-2">
                  {m.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ />
      <PromoBanner />
    </>
  );
}
