import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import medalIcon from "@public/medal.svg";
import eyeIcon from "@public/eye.svg";
import { getArticlesRanking } from "./lib/actions";
// import noImage from "@public/placeholder/no-image.webp"; // Keeping as reference
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";
import { formatDate } from "@/lib/utils";

const ArticleRankingList = async () => {
  const [articleRankingResponse] = await Promise.all([getArticlesRanking()]);

  const { data: articlesRank } = articleRankingResponse;

  if (
    typeof articlesRank === "undefined" ||
    (Array.isArray(articlesRank) && articlesRank.length === 0)
  )
    return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="pb-10">
        <h3 className="flex items-center pb-[1.125rem] text-lg font-bold sm:text-base">
          <div className="relative mr-1 inline-block h-[1.4rem] w-4 align-middle">
            <Image
              className="object-cover"
              src={medalIcon}
              fill
              sizes="100%"
              alt="article image"
            />
          </div>
          <span>人気記事ランキング</span>
        </h3>
        <ul>
          {articlesRank.map((article) => (
            <li
              key={article.id}
              className="mb-[.625rem] border-b border-[#DEE2E6] pb-[.625rem]"
            >
              <Link href={`/articles/${article.article_id}`}>
                <div className="flex gap-[.625rem]">
                  <div className="relative h-[3.75rem] w-[3.75rem] shrink-0 sm:h-[6.25rem] sm:w-[6.25rem]">
                    {article?.article?.all_media_url ? (
                      <Image
                        className="object-cover"
                        src={
                          article.article.all_media_url.length === 0
                            ? ArticleNoImagePlaceholder
                            : article.article.all_media_url[0][
                                "thumbnail-small"
                              ]
                        }
                        fill
                        sizes="100%"
                        alt="article image"
                      />
                    ) : (
                      <Image
                        className="object-cover"
                        src={ArticleNoImagePlaceholder}
                        fill
                        sizes="100%"
                        alt="article image"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="pb-1 text-base font-bold sm:pb-[.6875rem]">
                      {article.article?.title}
                    </h3>
                    <p className="pb-[.625rem] text-sm text-[#ADB5BD] sm:pb-[.6875rem]">
                      {formatDate(article.article?.updated_at)} 投稿
                    </p>
                    <div className="flex items-center justify-between text-[.625rem] sm:text-xs">
                      <div>
                        <div className="relative mr-1 inline-block h-[.6875rem] w-[1rem] align-middle">
                          <Image
                            className="object-cover"
                            src={eyeIcon}
                            fill
                            sizes="100%"
                            alt="article image"
                          />
                        </div>
                        <span className="text-sm text-[#ADB5BD]">
                          {article.view_count}
                        </span>
                      </div>
                      {article.article?.user?.contributor_name && (
                        <span className="text-sm">
                          {article.article?.user.contributor_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
};

export default ArticleRankingList;
