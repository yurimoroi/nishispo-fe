import { ArticlesPostCard } from "@/components/feature/articles/categories";
import { ResultsHeaderSelect } from "@/components/feature/articles/search";
import { getArticlesTagList } from "@/components/feature/articles/tags/lib/actions";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { AlignmentMedia } from "@/components/feature/company/alignment-media";
import Sidebar from "@/components/feature/articles/common/sidebar";
import { DataPagination } from "@/components/feature/datatable/data-pagination";
import {
  TwoColContainerItem,
  TwoColContainer,
} from "@/components/feature/layout";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Suspense } from "react";

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ArticleTagListPage({
  params: { id },
  searchParams,
}: PageProps) {
  const [articlesTagListResponse] = await Promise.all([
    getArticlesTagList({ id, searchParams }),
  ]);

  const { data } = articlesTagListResponse;
  if (!data) {
    return null;
  }

  const { articles, tag } = data;
  const { data: articlesData, ...paginationData } = articles;

  return (
    <MainBlock>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionBreadcrumbs label={tag.name} slug={id} />
      </Suspense>
      <TwoColContainer className="lg:gap-[5rem]">
        {/* MAIN CONTENT */}
        <TwoColContainerItem className="block lg:w-[69%]">
          <div className="mb-5 flex-wrap flex w-full flex-row justify-between gap-5">
            <div className="flex gap-5 items-center">
              <span className="px-[.625rem] py-[.3125rem] block rounded-full bg-blue-100 text-white">{tag.name}</span>
              <span className="text-xl">ニュース一覧</span>
            </div>
            <div className="result-sort">
              <ResultsHeaderSelect />
            </div>
          </div>
          <DataPagination paginationData={paginationData} className="w-full" />
          <ul className="list">
            {articlesData.map((article, index) => (
              <li key={index}>
                <ArticlesPostCard article={article} className="w-full" />
              </li>
            ))}
          </ul>
          <AlignmentMedia />
          <DataPagination paginationData={paginationData} className="w-full" />
        </TwoColContainerItem>
        {/* SIDEBAR */}
        <TwoColContainerItem className="block lg:w-[25.1%] lg:max-w-[20rem] lg:pt-[3.75rem]">
          <Sidebar />
        </TwoColContainerItem>
      </TwoColContainer>
    </MainBlock>
  );
}
