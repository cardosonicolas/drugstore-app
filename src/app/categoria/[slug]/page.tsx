import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import FAQ from "@/components/FAQ";
import { categories, getCategoryBySlug, getProductsByCategory } from "@/data/seeds";
import { SITE } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: `${category.name} a domicilio en Paraná | El Paracao`,
    description: category.description,
    alternates: { canonical: `${SITE.url}/categoria/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description: category.description,
    url: `${SITE.url}/categoria/${category.slug}`,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/producto/${p.id}`,
      name: p.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="text-xs text-zinc-400 mb-3">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-white">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-zinc-300">{category.name}</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {category.name} a domicilio en Paraná
          </h1>
          <p className="text-zinc-300 mt-3 text-base sm:text-lg max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      <section aria-labelledby="catalog-title" className="py-10 sm:py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="catalog-title" className="sr-only">
            Catálogo de {category.name}
          </h2>
          {items.length === 0 ? (
            <p className="text-center text-zinc-500 py-12">
              No hay productos disponibles en esta categoría por el momento.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {items.map((p) => (
                <Card key={p.id} product={p} />
              ))}
            </div>
          )}

          <nav aria-label="Otras categorías" className="mt-12 flex flex-wrap justify-center gap-2">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/categoria/${c.slug}`}
                  className="text-sm font-medium text-zinc-700 hover:text-zinc-900 px-4 py-2 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all"
                >
                  {c.name} →
                </Link>
              ))}
          </nav>
        </div>
      </section>

      <FAQ />
    </>
  );
}
