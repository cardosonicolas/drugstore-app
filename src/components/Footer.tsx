import Link from "next/link";
import { SITE, buildWhatsAppUrl } from "@/lib/seo";

const cellNumer = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl("Hola! Vengo desde su web y quiero hacer un pedido.");

  return (
    <footer className="w-full bg-white border-t border-zinc-100 py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="text-center md:text-left">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.2em] mb-4">
              {SITE.name}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {SITE.tagline}. Delivery de bebidas, snacks, chocolates y despensa en Paraná y zonas aledañas.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.2em] mb-4">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/" className="hover:text-zinc-900 transition-colors">Inicio</Link></li>
              <li><Link href="/servicios" className="hover:text-zinc-900 transition-colors">Servicios</Link></li>
              <li><Link href="/contacto" className="hover:text-zinc-900 transition-colors">Contacto</Link></li>
              <li>
                <Link href="/categoria/bebidas" className="hover:text-zinc-900 transition-colors">
                  Catálogo
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.2em] mb-4">
              Sucursales
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  El Paracao
                </h4>
                <p className="text-zinc-500 text-sm">Av. de las Américas 3196</p>
                <p className="text-zinc-400 text-[10px]">9:00am - 04:00am</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  El Paracao 2
                </h4>
                <p className="text-zinc-500 text-sm">Almirante Brown 1195</p>
                <p className="text-zinc-400 text-[10px]">9:00am - 04:00am</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.2em] mb-4">
              Contacto
            </h3>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
              aria-label="Contactar por WhatsApp"
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
              Pedí por WhatsApp
            </a>
            <p className="text-[11px] text-zinc-400 mt-3">
              Te respondemos en minutos
            </p>
            <p className="text-[11px] text-zinc-400">
              Lun a Dom · 9:00 a 04:00
            </p>

            <div className="flex justify-center gap-5 mt-5">
              <a
                href={SITE.social.instagram}
                className="text-zinc-400 hover:text-pink-600 transition-colors duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={SITE.social.facebook}
                className="text-zinc-400 hover:text-blue-600 transition-colors duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="text-[10px] text-zinc-300 tracking-wide">
            Developed by{" "}
            <a
              href="https://cardosonicolas.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-600 transition-colors duration-300 underline decoration-dotted underline-offset-2"
            >
              Nicolas Cardoso
            </a>
          </p>
        </div>
      </div>

      {cellNumer && <span className="hidden">{cellNumer}</span>}
    </footer>
  );
}
