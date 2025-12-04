"use client";

import Link from "next/link";
import { categories } from "@/data/seeds";

export default function CategoriesMenu() {
  return (
    <div className="w-full bg-white py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center overflow-x-auto py-2 no-scrollbar gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="text-sm font-medium text-white hover:bg-zinc-700 transition-colors whitespace-nowrap bg-[#272E41] px-5 py-2.5 rounded-full shrink-0 shadow-sm"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
