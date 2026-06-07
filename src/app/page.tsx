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
          className="w-full bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2
                  id="bestsellers-title"
                  className="text-2xl sm:text-3xl font-bold text-zinc-900"
                >
                  Los más pedidos 🔥
                </h2>
                <p className="text-zinc-500 mt-1 text-sm sm:text-base">
                  Lo que más sale en Paraná. ¿Te sumás?
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
        className="w-full bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16">
          <div className="mb-6">
            <h2
              id="catalog-title"
              className="text-2xl sm:text-3xl font-bold text-zinc-900"
            >
              Catálogo completo
            </h2>
            <p className="text-zinc-500 mt-1 text-sm sm:text-base">
              Filtrá por categoría o usá el buscador del navbar.
            </p>
          </div>

          <CategoriesMenu
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="mt-6">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-zinc-500 py-12">
                No hay productos en esta categoría.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            )}

            <nav
              aria-label="Categorías del catálogo"
              className="mt-12 flex flex-wrap justify-center gap-2"
            >
              {categories.map((c) => (
                <a
                  key={c.id}
                  href={`/categoria/${c.slug}`}
                  className="text-sm font-medium text-zinc-700 hover:text-zinc-900 px-4 py-2 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all"
                >
                  Ver {c.name} →
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
