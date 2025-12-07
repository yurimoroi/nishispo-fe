import { TwoColContainer, TwoColContainerItem } from "../../layout/two-col-container";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Article } from "../search/lib/types";
import { formatDate } from "@/lib/utils";

// Assets
import imagePlaceHolder100x100 from "@public/placeholder/image-placeholder-100x100.png";

type PageProps = {
  article: Article;
  className?: string;
}

export const ArticlesPostCard = ({ article, className = '' }: PageProps) => {
  return (
    <>
      <Link
        href={`/articles/${article.id}`}
        key={article.id}
        className={cn(
          "articles-category-post-card mt-[1.875rem] block border-b-[.0625rem] pb-5 text-shade-400",
          className,
        )}
      >
        <TwoColContainer className="flex flex-row gap-5 lg:flex-row">
          <TwoColContainerItem className="articles-image min-w-[6.25rem] max-w-[6.25rem]">
            <span className="relative h-[6.25rem] w-[6.25rem]">
              <Image
                src={
                  article.all_media_url && article.all_media_url.length > 0
                    ? (article.all_media_url[0]["thumbnail-small"] ??
                      imagePlaceHolder100x100)
                    : imagePlaceHolder100x100
                }
                alt={article.title}
                loading="lazy"
                fill
                sizes="auto"
                className="h-full w-full"
              />
            </span>
          </TwoColContainerItem>
          <TwoColContainerItem className="articles-text-info flex w-full flex-col items-start gap-[3.25rem]">
            <div className="flex items-baseline gap-[.8625rem]">
              {article.pr_flg === 1 && (
                <span className="block h-full max-w-[2.375rem] bg-shade-400 px-2 py-0 text-base font-bold text-black">
                  PR
                </span>
              )}
              <h3 className="text-blue-100 text-xl font-bold">
                {article.title}
              </h3>
            </div>
            <div className="flex w-full justify-between text-black">
              <span className="updated-date text-xs font-normal">
                {formatDate(new Date(article.updated_at))} 投稿
              </span>
              <span className="poster-name text-[.625rem]">
                {article.user?.contributor_name}
              </span>
            </div>
          </TwoColContainerItem>
        </TwoColContainer>
      </Link>
    </>
  );
}
