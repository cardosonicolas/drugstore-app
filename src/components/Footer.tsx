const cellNumer = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-100 py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-0 md:divide-x md:divide-zinc-100">
          {/* Column 1: Socials */}
          <div className="flex flex-col items-center justify-start px-4">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.2em] mb-6">
              Redes
            </h3>
            <div className="flex space-x-8">
              <a
                href="https://www.instagram.com/drugstore_elparacao/"
                className="text-zinc-400 hover:text-pink-600 transition-colors duration-300"
                aria-label="Instagram"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61565241096755"
                className="text-zinc-400 hover:text-blue-600 transition-colors duration-300"
                aria-label="Facebook"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Sucursales */}
          <div className="flex flex-col items-center justify-start px-4 text-center space-y-6">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.2em] mb-4">
              Sucursales
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  El Paracao
                </h4>
                <p className="text-zinc-500 text-sm">
                  Av. de las Américas 3196
                </p>
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

          {/* Column 3: WhatsApp Button */}
          <div className="flex flex-col items-center justify-start px-4">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.2em] mb-6">
              Contacto
            </h3>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola%20vengo%20desde%20su%20web!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
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
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Escribinos por WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-zinc-300 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Drugstore El Paracao
          </p>
          <p className="text-[9px] text-zinc-200 mt-2 tracking-wide">
            Developed by{" "}
            <a
              href="https://cardosonicolas.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-zinc-500 transition-colors duration-300 underline decoration-dotted underline-offset-2"
            >
              Nicolas Cardoso
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
