import { ArticlesPostCard } from "@/components/feature/articles/common/articles-post-card";
import { ArticlesHeaderTitle } from "@/components/feature/articles/common/articles-set-title";
import { getArticlesCategoryTopList } from "@/components/feature/articles/categories/lib/actions";
import { ResultsHeaderSelect } from "@/components/feature/articles/search";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { DataPagination } from "@/components/feature/datatable/data-pagination";
import {
  TwoColContainer,
  TwoColContainerItem,
} from "@/components/feature/layout";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Suspense } from "react";
import Sidebar from "@/components/feature/articles/common/sidebar";
import { AlignmentMedia } from "@/components/feature/company/alignment-media";
import { Loading } from "@/components/feature/datatable";

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ArticleCategoryTopPage({
  params: { id },
  searchParams,
}: PageProps) {
  const [getArticlesCategoryTopListResponse] = await Promise.all([
    getArticlesCategoryTopList({ id, searchParams }),
  ]);

  const { data } = getArticlesCategoryTopListResponse || {};

  if (!data) {
    return <div>記事がありませんでした。</div>;
  }

  const { articles, category } = data || {};
  const { data: articlesData, ...paginationData } = articles || {};

  return (
    <Suspense fallback={<Loading className="bg-transparent" />}>
      <MainBlock className="px-6 lg:px-[2.5rem]">
        <SectionBreadcrumbs
          label={`${category?.name} ニュース一覧`}
          slug={id}
        />
        <TwoColContainer className="lg:gap-[5rem]">
          {/* MAIN CONTENT */}
          <TwoColContainerItem className="block lg:w-[69%]">
            <div className="mb-5 flex w-full flex-col justify-between gap-5 lg:flex-row">
              <ArticlesHeaderTitle
                {...category}
                notLink={true}
                />
              <div className="result-sort">
                <ResultsHeaderSelect />
              </div>
            </div>
            <DataPagination
              paginationData={paginationData}
              className="w-full"
            />
            <ul className="list">
              {articlesData?.length > 0 &&
                articlesData.map((article, index) => (
                  <li key={index}>
                    <ArticlesPostCard article={article} className="w-full" />
                  </li>
                ))}
            </ul>
            <AlignmentMedia />
            <DataPagination
              paginationData={paginationData}
              className="w-full"
            />
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
