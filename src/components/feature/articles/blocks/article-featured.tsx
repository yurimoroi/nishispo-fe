import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@/components/top/lib/types";
import { cn, formatDate } from "@/lib/utils";
// import noImage from "@public/placeholder/no-image.webp"; // Keeping as reference
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";
import { chainTransformation, convertSymbolsToHTML } from "../details";

interface Props {
  featuredArticles: ArticleType[];
}

const ArticleFeatured = ({ featuredArticles }: Props) => {
  if (
    typeof featuredArticles === "undefined" ||
    (Array.isArray(featuredArticles) && featuredArticles.length === 0)
  )
    return null;
  return (
    <section className="border-b pb-[1.375rem] pt-10 sm:mb-0 sm:border-0 sm:pb-0 sm:pt-20 [&>*:last-child]:mb-0 [&>*]:mb-5">
      {featuredArticles.map((featuredArticle) => (
        <div
          key={featuredArticle.id}
          className="sm:flex sm:flex-wrap sm:gap-[2.3%] sm:border-b sm:pb-[1.4375rem]"
        >
          <div className="relative h-[13.3125rem] sm:h-[9.375rem] sm:w-[34.1%]">
            <Link href={`/articles/${featuredArticle.id}`}>
              <div className="relative h-full sm:h-[9.375rem] sm:w-full">
                <Image
                  className="object-cover"
                  src={
                    featuredArticle.all_media_url.length === 0
                      ? ArticleNoImagePlaceholder
                      : featuredArticle.all_media_url[0].original
                  }
                  fill
                  sizes="100%"
                  alt={`${featuredArticle.title} image`}
                />
              </div>
            </Link>
            {featuredArticle.categories &&
              featuredArticle.categories.length > 0 && (
                <Link
                  href={`/articles/categories/${featuredArticle.categories[0].id}`}
                  className={cn(
                    "absolute left-2 top-2 inline-block min-w-[4.5rem] rounded-full border border-transparent bg-[#dee2e6] px-2 py-1 text-sm font-bold",
                    featuredArticle.categories[0].color !== "#FFFFFF"
                      ? "text-white"
                      : "border border-gray-300",
                  )}
                  style={{
                    backgroundColor: featuredArticle.categories[0].color,
                  }}
                >
                  {featuredArticle.categories[0].name}
                </Link>
              )}
          </div>
          <div className="pt-[.625rem] sm:w-[63.5%] sm:pt-0">
            <h3 className="mb-[.625rem] line-clamp-2 text-base font-bold text-black sm:mb-2 sm:text-xl sm:leading-[1.875rem]">
              <div className="flex items-baseline gap-[.8625rem]">
                {featuredArticle.pr_flg === 1 && (
                  <span className="block h-full max-w-[2.375rem] bg-destructive px-2 py-0 text-sm font-bold text-white">
                    PR
                  </span>
                )}
                <Link
                  href={`/articles/${featuredArticle.id}`}
                  className="text-lg sm:text-xl"
                >
                  {featuredArticle.title}
                </Link>
              </div>
            </h3>
            <p className="pb-[.625rem] text-sm leading-[1.125rem] text-[#ADB5BD] sm:pb-2">
              {formatDate(featuredArticle.published_at)} 投稿
            </p>
            <p className="mb-[.625rem] line-clamp-2 text-base leading-6 text-[#6C757D] sm:mb-2 sm:text-sm sm:leading-[1.125rem]">
              <div
                dangerouslySetInnerHTML={{
                  __html: convertSymbolsToHTML(featuredArticle?.body || ""),
                }}
              />
            </p>
            <p className="text-right text-sm">
              {featuredArticle.user?.contributor_name}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ArticleFeatured;
