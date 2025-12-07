import { cn, formatDate } from "@/lib/utils";
import noImage from "@public/placeholder/no-image.webp";
import Image from "next/image";
import Link from "next/link";
import { Article } from "../search";

type PageProps = {
  articles: Article[];
  className?: string;
};

export default function ArticlesSearchPostCard({
  articles,
  className,
}: PageProps) {
  return (
    <section
      className={cn(
        "border-b pb-[1.375rem] pt-10 sm:mb-0 sm:border-0 sm:pb-0 [&>*:last-child]:mb-0 [&>*]:mb-5",
        className,
      )}
    >
      {articles &&
        articles.map((article) => (
          <Link
            href={`/articles/${article?.id}`}
            title={article?.title}
            key={article.id}
            className="sm:flex sm:flex-wrap sm:gap-[2.3%] sm:border-b sm:pb-[1.4375rem]"
          >
            <div className="relative h-[13.3125rem] sm:h-[9.375rem] sm:w-[34.1%]">
              <div className="relative h-full sm:h-[9.375rem] sm:w-full">
                <Image
                  className="object-cover"
                  src={
                    article.all_media_url.length === 0
                      ? noImage
                      : article.all_media_url[0].original
                  }
                  fill
                  sizes="100%"
                  alt={`${article.title} image`}
                />
              </div>
              {article?.categories?.[0]?.name && (
                <span
                  className={cn(
                    "absolute left-2 top-2 inline-block min-w-[4.5rem] rounded-full border border-transparent bg-[#dee2e6] px-2 py-1 text-xs font-bold sm:text-base",
                    article.categories[0]?.color !== "#FFFFFF"
                      ? "text-white"
                      : "border border-gray-300",
                  )}
                  style={{
                    backgroundColor: article.categories[0]?.color,
                  }}
                >
                  {article.categories[0]?.name}
                </span>
              )}
            </div>
            <div className="pt-[.625rem] sm:w-[63.5%] sm:pt-0">
              <h3 className="mb-[.625rem] line-clamp-2 text-base font-bold text-black sm:mb-2 sm:text-xl sm:leading-[1.875rem]">
                <div className="flex items-baseline gap-[.8625rem]">
                  {article.pr_flg === 1 && (
                    <span className="block h-full max-w-[2.375rem] bg-destructive px-2 py-0 text-base font-bold text-white">
                      PR
                    </span>
                  )}
                  {article.title}
                </div>
              </h3>
              <p className="pb-[.625rem] text-[.75rem] leading-[1.125rem] text-[#ADB5BD] sm:pb-2">
                {formatDate(new Date(article.updated_at))} 投稿
              </p>
              <p className="mb-[.625rem] line-clamp-2 text-[.75rem] leading-[1.125rem] text-[#6C757D] sm:mb-2">
                {article.body}
              </p>
              <p className="text-right text-[.625rem]">
                {article.user?.contributor_name}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}
