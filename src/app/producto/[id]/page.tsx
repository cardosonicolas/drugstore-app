import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductJsonLd from "@/components/ProductJsonLd";
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

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <nav aria-label="Migas de pan" className="text-xs text-zinc-500 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-zinc-900">Inicio</Link>
              </li>
              <li aria-hidden="true">/</li>
              {category && (
                <>
                  <li>
                    <Link href={`/categoria/${category.slug}`} className="hover:text-zinc-900">
                      {category.name}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                </>
              )}
              <li className="text-zinc-700 font-medium truncate max-w-[200px] sm:max-w-none">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative aspect-square w-full bg-zinc-50 rounded-2xl overflow-hidden ring-1 ring-zinc-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              {product.badge && (
                <span
                  className={`inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white rounded-full mb-3 ${
                    product.badge === "bestseller"
                      ? "bg-amber-500"
                      : product.badge === "offer"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                >
                  {product.badge === "bestseller" && "Más vendido"}
                  {product.badge === "offer" && "Oferta"}
                  {product.badge === "new" && "Nuevo"}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 capitalize">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mt-4">
                <p className="text-3xl font-bold text-zinc-900">
                  ${product.price.toLocaleString("es-AR")}
                </p>
                {product.compareAtPrice && (
                  <p className="text-base text-zinc-400 line-through">
                    ${product.compareAtPrice.toLocaleString("es-AR")}
                  </p>
                )}
              </div>

              <p className="text-zinc-600 mt-5 leading-relaxed">{product.description}</p>

              <ul className="mt-6 space-y-2 text-sm text-zinc-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Delivery en 20-30 min en zona centro
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Pagás al recibir o por Mercado Pago
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Stock actualizado en tiempo real
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
                  </svg>
                  Pedir por WhatsApp
                </a>
                {category && (
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-6 py-3.5 rounded-full font-medium transition-colors"
                  >
                    Ver más {category.name}
                  </Link>
                )}
              </div>

              <p className="text-xs text-zinc-400 mt-4">
                Atendemos de 9:00 a 04:00. Hacemos envíos a Paraná y zonas aledañas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-12 sm:py-16 bg-zinc-50 border-t border-zinc-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="related-title" className="text-2xl font-bold text-zinc-900 mb-6">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/producto/${p.id}`}
                  className="group bg-white border border-zinc-100 rounded-xl overflow-hidden hover:border-zinc-200 hover:shadow-md transition-all"
                >
                  <div className="relative aspect-square bg-zinc-50">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-zinc-900 line-clamp-2 capitalize">
                      {p.name}
                    </p>
                    <p className="text-base font-bold text-zinc-900 mt-1">
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
