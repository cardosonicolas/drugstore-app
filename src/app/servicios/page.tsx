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
    icon: "🛵",
    title: "Delivery a domicilio",
    desc: "Recibí tu pedido en la puerta de tu casa en 20-30 minutos en zona centro y entre 30 y 70 minutos en barrios y zonas aledañas.",
  },
  {
    icon: "🛒",
    title: "Pickup en sucursal",
    desc: "Hacés tu pedido por WhatsApp y lo retirás sin hacer fila en cualquiera de nuestras dos sucursales.",
  },
  {
    icon: "📦",
    title: "Pedidos grandes y eventos",
    desc: "Coordinamos pedidos para oficinas, eventos y reuniones con bonificación de envío. Escribinos y armamos un combo a tu medida.",
  },
  {
    icon: "🌙",
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
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-green-300 font-semibold mb-3">
            Nuestros servicios
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Tu drugstore a domicilio, simple y rápido
          </h1>
          <p className="text-zinc-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Delivery 24 hs en Paraná y zonas aledañas. Hacemos tu pedido por WhatsApp y te llega en minutos.
          </p>
        </div>
      </section>

      <section aria-labelledby="services-title" className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="services-title" className="text-2xl sm:text-3xl font-bold text-zinc-900 text-center mb-10">
            ¿Qué ofrecemos?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <article key={s.title} className="bg-zinc-50 rounded-2xl p-6 ring-1 ring-zinc-100">
                <div className="text-3xl mb-3" aria-hidden="true">{s.icon}</div>
                <h3 className="text-base font-semibold text-zinc-900 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="py-12 sm:py-16 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="steps-title" className="text-2xl sm:text-3xl font-bold text-zinc-900 text-center mb-10">
            ¿Cómo pedir en 3 pasos?
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <li key={step.n} className="bg-white rounded-2xl p-6 ring-1 ring-zinc-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 text-white font-bold mb-4">
                  {step.n}
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-10">
            <a
              href={buildWhatsAppUrl("Hola! Quiero hacer un pedido.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Empezar mi pedido por WhatsApp
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="zones-title" className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 id="zones-title" className="text-2xl sm:text-3xl font-bold text-zinc-900">
              Zonas de delivery
            </h2>
            <p className="text-zinc-500 mt-2 text-sm sm:text-base">
              Hacemos envíos a Paraná y zonas aledañas con tiempos estimados.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left py-3 px-4 font-semibold text-zinc-700">Zona</th>
                  <th className="text-left py-3 px-4 font-semibold text-zinc-700">Tiempo estimado</th>
                  <th className="text-right py-3 px-4 font-semibold text-zinc-700">Envío</th>
                </tr>
              </thead>
              <tbody>
                {deliveryZones.map((z) => (
                  <tr key={z.name} className="border-b border-zinc-100 hover:bg-zinc-50">
                    <td className="py-3 px-4 text-zinc-900 font-medium">{z.name}</td>
                    <td className="py-3 px-4 text-zinc-500">{z.eta}</td>
                    <td className="py-3 px-4 text-right text-zinc-900 font-semibold">
                      ${z.cost.toLocaleString("es-AR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-400 mt-4 text-center">
            Envío gratis en compras según zona. Consultá por WhatsApp.
          </p>
        </div>
      </section>

      <section aria-labelledby="payments-title" className="py-12 sm:py-16 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="payments-title" className="text-2xl sm:text-3xl font-bold text-zinc-900 text-center mb-10">
            Medios de pago
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-5 ring-1 ring-zinc-100 text-center">
                <p className="text-base font-semibold text-zinc-900">{m.name}</p>
                <p className="text-xs text-zinc-500 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <PromoBanner />
    </>
  );
}
