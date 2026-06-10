import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductJsonLd from "@/components/ProductJsonLd";
import AddToCartButton from "@/components/AddToCartButton";
import {
  products,
  categories,
  getProductById,
  getProductsByCategory,
} from "@/data/seeds";
import { SITE, buildWhatsAppUrl } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} · ${SITE.name}`,
    description: product.description,
    alternates: { canonical: `${SITE.url}/producto/${product.id}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
      type: "website",
    },
  };
}

const badgeStyles: Record<
  "bestseller" | "offer" | "new",
  { label: string; className: string }
> = {
  bestseller: { label: "Top ventas", className: "bg-ink text-paper" },
  offer: { label: "Oferta", className: "bg-oxblood text-paper" },
  new: { label: "Nuevo", className: "bg-leaf text-paper" },
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.categoryId);
  const related = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const whatsappMsg = `Hola! Quiero pedir: ${product.name} ($${product.price.toLocaleString("es-AR")})`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMsg);
  const productUrl = `${SITE.url}/producto/${product.id}`;

  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <>
      <ProductJsonLd
        product={{
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          url: productUrl,
          sku: `EP-${product.id}`,
        }}
      />

      <div className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav aria-label="Migas de pan" className="mb-8">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              {category && (
                <>
                  <li>
                    <Link
                      href={`/categoria/${category.slug}`}
                      className="hover:text-ink transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                </>
              )}
              <li className="text-ink font-bold truncate max-w-[200px] sm:max-w-none">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="relative aspect-square w-full bg-paper border-2 border-ink/15 rounded-3xl overflow-hidden shadow-card">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                {hasDiscount && (
                  <div className="absolute top-4 right-4 grid h-20 w-20 place-items-center rounded-full bg-oxblood text-paper font-display font-extrabold text-2xl shadow-lift rotate-[8deg]">
                    -{discountPct}%
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {product.badge && (
                  <span
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] rounded-full ${badgeStyles[product.badge].className}`}
                  >
                    {badgeStyles[product.badge].label}
                  </span>
                )}
                {category && (
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink transition-colors"
                  >
                    en {category.name} →
                  </Link>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink capitalize leading-[0.95]">
                {product.name}
              </h1>

              <div className="mt-6 flex items-baseline gap-3 pb-6 border-b-2 border-dashed border-ink/15">
                <p className="font-display text-4xl font-extrabold text-ink leading-none">
                  ${product.price.toLocaleString("es-AR")}
                </p>
                {hasDiscount && (
                  <p className="font-mono text-base text-ink-soft line-through">
                    ${product.compareAtPrice!.toLocaleString("es-AR")}
                  </p>
                )}
              </div>

              <p className="text-ink-soft mt-6 leading-relaxed text-base">
                {product.description}
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                {[
                  "Delivery en 20-30 min en zona centro",
                  "Pagás al recibir o por Mercado Pago",
                  "Stock actualizado en tiempo real",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-leaf/15 text-leaf-dark text-[10px] font-bold">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  }}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-dark text-paper px-6 py-4 rounded-2xl font-bold transition-all hover-lift shadow-stamp"
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
                  Pedir por WhatsApp
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-paper/15 transition-transform group-hover:translate-x-0.5">
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
                {category && (
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="inline-flex items-center justify-center gap-2 border-2 border-ink text-ink hover:bg-ink hover:text-paper px-6 py-4 rounded-2xl font-bold transition-all"
                  >
                    Ver más {category.name}
                  </Link>
                )}
                </div>
              </div>

              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mt-6">
                Atendemos de 9:00 a 04:00 · Paraná y zonas
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section
          aria-labelledby="related-title"
          className="py-16 sm:py-20 bg-cream-dark border-y border-ink/15"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                  <span className="h-px w-8 bg-oxblood" />
                  También te va a gustar
                </span>
                <h2
                  id="related-title"
                  className="font-display text-3xl sm:text-4xl font-extrabold text-ink mt-2"
                >
                  Para{" "}
                  <span className="text-oxblood">acompañar</span>.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/producto/${p.id}`}
                  className="group bg-paper border-2 border-ink/10 rounded-2xl overflow-hidden hover-lift hover:border-ink/20 hover:shadow-card transition-all"
                >
                  <div className="relative aspect-square bg-cream-dark overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3.5">
                    <p className="text-sm font-semibold text-ink line-clamp-2 capitalize leading-snug">
                      {p.name}
                    </p>
                    <p className="font-display text-lg font-extrabold text-ink mt-1.5">
                      ${p.price.toLocaleString("es-AR")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
