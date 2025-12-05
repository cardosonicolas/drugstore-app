"use client";

import Link from "next/link";
import { categories } from "@/data/seeds";

export default function CategoriesMenu() {
  return (
    <div className="w-full bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center overflow-x-auto py-3 no-scrollbar gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-200 whitespace-nowrap px-4 py-2 rounded-full shrink-0 border border-zinc-200 hover:border-zinc-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
