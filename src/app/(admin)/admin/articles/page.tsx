import {
  ArticleActionLinks,
  FormAdminArticles,
  getAdminArticlesData,
  MainTableData,
} from "@/components/admin/articles";
import { getArticleCategories } from "@/components/feature/article-post";
import { ResultsHeaderSelect } from "@/components/feature/articles/search";
import { Loading } from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdminArticleListPage({
  searchParams,
}: PageProps) {
  const [adminArticlesResponse, getArticleCategoriesResponse] =
    await Promise.all([
      getAdminArticlesData({ searchParams }),
      getArticleCategories(),
    ]);

  const { data } = adminArticlesResponse ?? {};
  const { data: adminArticles = [], ...paginationData } = data ?? {};
  const articleCategories = getArticleCategoriesResponse?.data || [];

  return (
    <MainBlock>
      {/* Form */}
      <Suspense>
        <FormAdminArticles articleCategories={articleCategories} />
      </Suspense>
      {/* Links */}
      <ArticleActionLinks />
      {/* Table */}
      <Suspense fallback={<Loading />}>
        {/* Pager */}
        <ResultsHeaderSelect
          className="mb-5 flex-col justify-start lg:flex-row lg:justify-end"
          labelStyles="w-full lg-w-auto mb-2"
        />

        <MainTableData data={adminArticles} paginationData={paginationData} />
      </Suspense>
    </MainBlock>
  );
}
