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

      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-warm/30 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav aria-label="Migas de pan" className="mb-5">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink font-bold">{category.name}</li>
            </ol>
          </nav>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
            <span className="h-px w-8 bg-oxblood" />
            Categoría
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-ink mt-4 leading-[0.9]">
            {category.name} a <span className="text-oxblood">domicilio</span>.
          </h1>
          <p className="text-ink-soft mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
            {category.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-paper font-bold">
              {items.length}
            </span>
            productos disponibles
          </div>
        </div>
      </section>

      <section aria-labelledby="catalog-title" className="py-14 sm:py-20 bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="catalog-title" className="sr-only">
            Catálogo de {category.name}
          </h2>
          {items.length === 0 ? (
            <p className="text-center text-ink-soft py-16 font-display text-xl">
              No hay productos disponibles en esta categoría por el momento.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              {items.map((p) => (
                <Card key={p.id} product={p} />
              ))}
            </div>
          )}

          <nav
            aria-label="Otras categorías"
            className="mt-16 flex flex-wrap justify-center gap-2"
          >
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/categoria/${c.slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-ink hover:text-paper px-5 py-2.5 rounded-full border-2 border-ink/15 hover:border-ink hover:bg-ink transition-all"
                >
                  {c.name}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              ))}
          </nav>
        </div>
      </section>

      <FAQ />
    </>
  );
}
