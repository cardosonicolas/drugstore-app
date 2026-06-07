"use client";

import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import PromoBanner from "@/components/PromoBanner";
import CategoriesMenu from "@/components/CategoriesMenu";
import Card from "@/components/Card";
import { products, categories } from "@/data/seeds";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? products.filter((product) => product.categoryId === selectedCategory)
        : products,
    [selectedCategory]
  );

  const bestSellers = useMemo(
    () => products.filter((p) => p.badge === "bestseller").slice(0, 6),
    []
  );

  return (
    <>
      <Hero />
      <TrustBadges />

      {bestSellers.length > 0 && (
        <section
          aria-labelledby="bestsellers-title"
          className="w-full bg-cream"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                  <span className="h-px w-8 bg-oxblood" />
                  Lo más pedido
                </span>
                <h2
                  id="bestsellers-title"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink mt-3 leading-[0.95]"
                >
                  Los que <span className="text-oxblood">no fallan</span>.
                </h2>
                <p className="text-ink-soft mt-3 text-sm sm:text-base max-w-md">
                  Lo que más sale en Paraná. La selección que se repite noche
                  tras noche.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="hidden sm:grid h-16 w-16 place-items-center rounded-full bg-amber-warm text-ink font-display text-3xl font-extrabold shrink-0 shadow-stamp rotate-[-6deg]"
              >
                ✦
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {bestSellers.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="productos"
        aria-labelledby="catalog-title"
        className="w-full bg-paper"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
              <span className="h-px w-8 bg-oxblood" />
              Catálogo completo
            </span>
            <h2
              id="catalog-title"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink mt-3 leading-[0.95]"
            >
              Todo lo que <span className="text-oxblood">te gusta</span>.
            </h2>
            <p className="text-ink-soft mt-3 text-sm sm:text-base max-w-md">
              Filtrá por categoría o usá el buscador del navbar.
            </p>
          </div>

          <CategoriesMenu
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="mt-8">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-ink-soft py-16 font-display text-xl">
                No hay productos en esta categoría.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            )}

            <nav
              aria-label="Categorías del catálogo"
              className="mt-16 flex flex-wrap justify-center gap-2"
            >
              {categories.map((c) => (
                <a
                  key={c.id}
                  href={`/categoria/${c.slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-ink hover:text-paper px-5 py-2.5 rounded-full border-2 border-ink/15 hover:border-ink hover:bg-ink transition-all"
                >
                  Ver {c.name}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <FAQ />
      <PromoBanner />
    </>
  );
}
