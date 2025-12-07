import Link from "next/link";
import { ArticleDetailsCategoriesType } from "../details/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  categories: ArticleDetailsCategoriesType[];
}

const ArticleCategories = ({ categories }: Props) => {
  if (
    typeof categories === "undefined" ||
    (Array.isArray(categories) && categories.length === 0)
  ) {
    return null;
  }
  return (
    <div className="flex gap-[.625rem] pb-[.5625rem]">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`articles/categories/${category.id}`}
          className={cn(
            "block border border-transparent bg-[#dee2e6] px-2 py-1 text-xs font-bold sm:text-base",
            category.color !== "#FFFFFF"
              ? "text-white"
              : "border border-gray-300",
          )}
          style={{
            backgroundColor: category.color,
          }}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default ArticleCategories;
