import Link from "next/link";
import { categories } from "@/data/seeds";

interface CategoriesMenuProps {
  selectedCategory?: number | null;
  onSelectCategory?: (id: number | null) => void;
}

export default function CategoriesMenu({
  selectedCategory,
  onSelectCategory,
}: CategoriesMenuProps) {
  return (
    <div className="w-full border-b border-ink/15">
      <div className="flex items-center overflow-x-auto py-4 no-scrollbar gap-2">
        {onSelectCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className={`text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 whitespace-nowrap px-4 py-2.5 rounded-full shrink-0 border-2 ${
              selectedCategory === null
                ? "bg-ink text-paper border-ink"
                : "bg-paper text-ink-soft hover:text-ink hover:border-ink/40 border-ink/15"
            }`}
          >
            ✦ Todas
          </button>
        )}
        {categories.map((category) => {
          if (onSelectCategory) {
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 whitespace-nowrap px-4 py-2.5 rounded-full shrink-0 border-2 ${
                  selectedCategory === category.id
                    ? "bg-oxblood text-paper border-oxblood"
                    : "bg-paper text-ink-soft hover:text-ink hover:border-ink/40 border-ink/15"
                }`}
              >
                {category.name}
              </button>
            );
          }
          return (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 whitespace-nowrap px-4 py-2.5 rounded-full shrink-0 border-2 bg-paper text-ink-soft hover:text-ink hover:border-ink/40 border-ink/15"
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
