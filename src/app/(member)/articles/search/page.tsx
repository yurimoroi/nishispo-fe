import {
  TwoColContainer,
  TwoColContainerItem,
} from "@/components/feature/layout";
import {
  ResultsHeaderSelect,
  ResultsHeaderTotal,
} from "@/components/feature/articles/search";
import { Suspense } from "react";
import { getArticlesSearchResults } from "@/components/feature/articles/search/lib/actions";
import { DataPagination } from "@/components/feature/datatable/data-pagination";
import { SearchArticleKey } from "@/components/feature/modal/modal-search/lib/types";
import MainBlock from "@/components/feature/wrapper/main-block";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import Sidebar from "@/components/feature/articles/common/sidebar";
import ArticlesSearchPostCard from "@/components/feature/articles/common/articles-search-post-card";
import { AlignmentMedia } from "@/components/feature/company/alignment-media";
import { Loading } from "@/components/feature/datatable";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ArticlesSearchResult({
  searchParams,
}: PageProps) {
  const [articlesSearchResponse] = await Promise.all([
    getArticlesSearchResults({ searchParams: searchParams }),
  ]);

  const { data } = articlesSearchResponse;
  const { data: articlesData, ...paginationData } = data;
  const searchTerm = searchParams[SearchArticleKey.SearchTerm];
  let searchTermString: string = "";
  if (Array.isArray(searchTerm)) {
    searchTermString = searchTerm.join(" ");
  } else {
    searchTermString = searchTerm ?? "";
  }

  return (
    <Suspense fallback={<Loading className="bg-transparent" />}>
      <MainBlock>
        <SectionBreadcrumbs label={`${searchTermString}ーの検索結果`} />
        {/* MAIN CONTENT */}
        <TwoColContainer className="lg:gap-[5rem]">
          <TwoColContainerItem className="block lg:w-[69%]">
            {articlesData && articlesData.length > 0 ? (
              <>
                <div className="mb-5 flex w-full flex-col justify-between gap-5 lg:flex-row">
                  <ResultsHeaderTotal
                    searchTerm={searchTermString}
                    totalResults={paginationData.total}
                    className="text-left"
                  />
                  <div className="result-sort">
                    <ResultsHeaderSelect />
                  </div>
                </div>
                <DataPagination paginationData={paginationData} />
                <ArticlesSearchPostCard articles={articlesData} />
                <AlignmentMedia />
                <DataPagination paginationData={paginationData} />
              </>
            ) : (
              <>
                <ResultsHeaderTotal
                  searchTerm={searchTermString}
                  className="text-left"
                />
                <span className="mt-10 block">記事がありませんでした。</span>
              </>
            )}
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
