import Link from "next/link";
import { SITE } from "@/lib/seo";

export default function NotFound() {
  return (
    <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-7xl sm:text-9xl font-bold text-green-400">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold mt-4">
          No encontramos esa página
        </h1>
        <p className="text-zinc-300 mt-4 text-base sm:text-lg">
          Puede que el producto o la categoría que buscás ya no esté disponible. Te invitamos a recorrer nuestro catálogo o contactarnos por WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 hover:bg-zinc-100 px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Volver al inicio
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hola! No encuentro un producto en su web.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Pedinos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
