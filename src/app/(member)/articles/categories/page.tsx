import { Suspense } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import {
  TwoColContainer,
  TwoColContainerItem,
} from "@/components/feature/layout";
import MainBlock from "@/components/feature/wrapper/main-block";
import { getArticlesCategoryList } from "@/components/feature/articles/categories/lib/actions";
import { ArticlesHeaderTitle } from "@/components/feature/articles/common/articles-set-title";
import { ArticlesPostCard } from "@/components/feature/articles/common/articles-post-card";
import Sidebar from "@/components/feature/articles/common/sidebar";
import { AlignmentMedia } from "@/components/feature/company/alignment-media";

export default async function ArticlesCategoryList() {
  const [articlesCategoryListResponse] = await Promise.all([
    getArticlesCategoryList(),
  ]);

  const categoryListData = articlesCategoryListResponse.data || [];
  if (!categoryListData) {
    return null;
  }

  return (
    <Suspense>
      <MainBlock>
        <SectionBreadcrumbs />
        <TwoColContainer className="lg:gap-[5rem]">
          {/* MAIN CONTENT */}
          <TwoColContainerItem className="block lg:w-[69%]">
            {categoryListData &&
              categoryListData.map((category, index) => (
                <div
                  key={category.id}
                  className={cn(
                    "articles-category-set mb-10 w-full",
                    index >= categoryListData.length - 1 && "mb-0",
                  )}
                >
                  <ArticlesHeaderTitle {...category} />
                  <ul className="list">
                    {category?.articles?.slice(0, 3).map((article, index) => (
                      <li key={index}>
                        <ArticlesPostCard
                          article={article}
                          className="w-full"
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/articles/categories/${category.id}`}
                      className="see-more-link block pt-[.625rem] text-right font-normal text-blue-100"
                    >
                      もっと見る
                    </Link>
                  </div>
                </div>
              ))}
            <AlignmentMedia />
          </TwoColContainerItem>
          {/* SIDEBAR */}
          <TwoColContainerItem className="block lg:w-[25.1%] lg:max-w-[20rem] lg:pt-[3.75rem]">
            <Sidebar />
          </TwoColContainerItem>
        </TwoColContainer>
      </MainBlock>
    </Suspense>
  );
}
