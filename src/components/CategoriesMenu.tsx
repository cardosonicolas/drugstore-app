"use client";

import { categories } from "@/data/seeds";

interface CategoriesMenuProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function CategoriesMenu({
  selectedCategory,
  onSelectCategory,
}: CategoriesMenuProps) {
  return (
    <div className="w-full bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center overflow-x-auto py-3 no-scrollbar gap-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`text-xs font-medium transition-all duration-200 whitespace-nowrap px-4 py-2 rounded-full shrink-0 border ${
              selectedCategory === null
                ? "bg-zinc-900 text-white border-zinc-900"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`text-xs font-medium transition-all duration-200 whitespace-nowrap px-4 py-2 rounded-full shrink-0 border ${
                selectedCategory === category.id
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
