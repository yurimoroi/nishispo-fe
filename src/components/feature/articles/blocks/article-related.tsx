import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
// import noImage from "@public/placeholder/no-image.webp"; // Keeping as reference
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";
import { RelatedArticlesType } from "../details/lib/types";

interface Props {
  relatedByTags: RelatedArticlesType[];
  relatedByCategories: RelatedArticlesType[];
  className?: string;
}

const ArticleRelated = ({
  relatedByTags,
  relatedByCategories,
  className,
}: Props) => {
  const relatedArticlesByTag = relatedByTags
    .filter((tag) => Array.isArray(tag.articles) && tag.articles.length > 0)
    .flatMap((tag) => tag.articles);
  const relatedArticlesByCategory = relatedByCategories
    .filter((tag) => Array.isArray(tag.articles) && tag.articles.length > 0)
    .flatMap((tag) => tag.articles);

  const relatedArticles =
    relatedArticlesByTag.length > 0
      ? [...relatedArticlesByTag]
      : relatedArticlesByCategory.length > 0
        ? [...relatedArticlesByCategory]
        : [];
  if (relatedArticles.length === 0) {
    return null;
  }

  const limitedRelatedArticles = relatedArticles.slice(0, 4);

  return (
    <div className={cn(className)}>
      <div className="border-4 border-[#DEE2E6] bg-white p-5 pb-0 sm:p-[1.875rem] sm:pb-[.625rem]">
        <p className="pb-5 text-xs font-bold leading-[1.125rem] sm:pb-[1.875rem] sm:text-lg">
          関連記事はこちら
        </p>
        <ul className="gap-[2.38%] sm:flex sm:flex-wrap">
          {limitedRelatedArticles.map((article, index) => (
            <li
              key={article.id + index}
              className="mb-5 border-b border-[#DEE2E6] pb-5 sm:mb-5 sm:w-[23.21%] sm:border-0 sm:pb-0"
            >
              <Link href={`/articles/${article.id}`} className="flex sm:block">
                <div className="relative h-[3.75rem] w-[3.75rem] flex-shrink-0 sm:h-[5.9375rem] sm:w-full">
                  <Image
                    className="object-cover"
                    src={
                      article.all_media_url.length === 0
                        ? ArticleNoImagePlaceholder
                        : article.all_media_url[0]["thumbnail-medium"]
                    }
                    fill
                    sizes="100%"
                    alt={`${article.title} image`}
                  />
                </div>
                <h3 className="line-clamp-2 pl-5 text-xs font-bold sm:pl-0 sm:pt-[.625rem] sm:text-base">
                  {article.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleRelated;
