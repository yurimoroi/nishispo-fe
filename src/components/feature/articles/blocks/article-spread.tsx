import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@/components/top/lib/types";
import { cn, formatDate } from "@/lib/utils";
// import noImage from "@public/placeholder/no-image.webp"; // Keeping as reference
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";

interface Props {
  articles: ArticleType[];
}

const ArticleSpread = ({ articles }: Props) => {
  if (
    typeof articles === "undefined" ||
    (Array.isArray(articles) && articles.length === 0)
  )
    return null;
  return (
    <section className="pb-10 sm:pb-[3.75rem] lg:flex lg:flex-wrap lg:[&>*:nth-child(even)]:pl-[1.25rem]">
      {articles.map((article) => (
        <div
          key={article.id}
          className="border-b py-5 pb-[1.25rem] lg:w-2/4 lg:border-r lg:pr-6"
        >
          <div className="flex gap-[1.25rem]">
            <div className="w-[6.25rem]">
              <Link href={`/articles/${article.id}`}>
                <div className="relative h-[6.25rem] w-[6.25rem]">
                  <Image
                    className="object-cover"
                    src={
                      article.all_media_url.length === 0
                        ? ArticleNoImagePlaceholder
                        : article.all_media_url[0]["thumbnail-small"]
                    }
                    fill
                    sizes="100%"
                    alt={`${article.title} image`}
                  />
                </div>
              </Link>
            </div>

            <div className="w-full">
              <h3 className="mb-[.625rem] line-clamp-2 text-base font-bold text-black sm:mb-4">
                <Link href={`/articles/${article.id}`}> {article.title}</Link>
              </h3>
              <div className="xl:flex xl:items-end xl:justify-between">
                {article.categories && article.categories.length > 0 && (
                  <Link
                    href={`/articles/categories/${article.categories[0].id}`}
                    className={cn(
                      "mb-[.0625rem] inline-block rounded-full bg-[#dee2e6] px-[.625rem] py-1 text-xs font-bold sm:mb-1 sm:py-2 xl:mb-0 xl:text-xs",
                      article.categories[0].color !== "#FFFFFF"
                        ? "text-white"
                        : "border border-gray-300",
                    )}
                    style={{
                      backgroundColor: article.categories[0].color,
                    }}
                  >
                    {article.categories[0].name}
                  </Link>
                )}

                <p className="text-right text-sm text-[#ADB5BD] sm:leading-[1.125rem]">
                  {formatDate(article.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ArticleSpread;
