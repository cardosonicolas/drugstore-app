import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { products } from "@/data/seeds";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-zinc-900">
      <Navbar />
      <main className="flex w-full max-w-7xl flex-col items-center justify-between py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-5 mt-10 mb-5">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
