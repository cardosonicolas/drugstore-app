import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import HeroCarousel from "@/components/HeroCarousel";
import CategoriesMenu from "@/components/CategoriesMenu";
import Footer from "@/components/Footer";
import { products } from "@/data/seeds";

export default function Home() {
  const featuredProducts = products.slice(0, 5);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <HeroCarousel products={featuredProducts} />
      <CategoriesMenu />
      <main className="flex w-full max-w-7xl flex-col items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto grow">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="w-fit mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center justify-center gap-y-5 gap-x-4 mt-10 mb-5">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
