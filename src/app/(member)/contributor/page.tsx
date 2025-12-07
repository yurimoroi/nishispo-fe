import {
  getUserArticleStatus,
  getUserArticlesCountDetails,
  getUserArticlesData,
  MainListData,
} from "@/components/contributor";
import { FormArticlesContributor } from "@/components/contributor/form/form";
import { getArticleCategories } from "@/components/feature/article-post";
import { ResultsHeaderSelect } from "@/components/feature/articles/search";
import { DataPagination, Loading } from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "記事投稿者 - ミヤスポ ",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdminArticleListPage({
  searchParams,
}: PageProps) {
  const [
    userArticleStatusResponse,
    userArticlesResponse,
    userArticlesCountResponse,
    getArticleCategoriesResponse,
  ] = await Promise.all([
    getUserArticleStatus(),
    getUserArticlesData({ searchParams }),
    getUserArticlesCountDetails(),
    getArticleCategories(),
  ]);
  const { data: userArticleStatus } = userArticleStatusResponse || {};
  const { data: userArticlesData } = userArticlesResponse || {};
  const { data: userArticles, ...pagination } = userArticlesData || {};
  const { data: articleCountData } = userArticlesCountResponse || {};
  const { data: articleCategories = [] } = getArticleCategoriesResponse || {};

  return (
    <MainBlock className="px-0">
      {/* Form */}
      <FormArticlesContributor
        dropdownValues={userArticleStatus}
        articleCountData={articleCountData}
        articleCategories={articleCategories}
      />
      <Suspense fallback={<Loading />}>
        <div className="mb-5 flex justify-end">
          {/* Pagination */}
          <DataPagination paginationData={pagination} className="w-full" />
          {/* Pager */}
          <ResultsHeaderSelect className="w-full justify-end px-6 lg:px-0" />
        </div>
        {/* Table */}
        <MainListData data={userArticles} />
      </Suspense>
    </MainBlock>
  );
}
