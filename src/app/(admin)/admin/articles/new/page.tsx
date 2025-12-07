import { FormAdminArticle } from "@/components/admin/articles";
import { getAdminArticleDetails } from "@/components/contributor";
import {
  getArticleTagList,
  getArticleOrganizationList,
  getArticleCategories,
  getAffiliatedMediaList,
} from "@/components/feature/article-post";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事",
};

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string };
};

// Note: This will serve as the edit page also, The client expects editing to redirect here
export default async function Page({ searchParams }: PageProps) {
  const { id } = searchParams;

  const [
    getArticleOrganizationListResponse,
    articleTagListResponse,
    getArticleCategoriesResponse,
    getAffiliatedMediaListResponse,
    getAdminArticleDetailsResponse,
  ] = await Promise.all([
    getArticleOrganizationList(),
    getArticleTagList(),
    getArticleCategories(),
    getAffiliatedMediaList(),
    getAdminArticleDetails(id),
  ]);

  const organizations = getArticleOrganizationListResponse?.data || [];
  const tagList = articleTagListResponse?.data || [];
  const categoriesList = getArticleCategoriesResponse?.data || [];
  const affiliatedMediaList = getAffiliatedMediaListResponse?.data || [];
  const articleDetail = getAdminArticleDetailsResponse?.data || {};

  return (
    <MainBlock>
      <PageTitle>記事編集</PageTitle>
      <FormAdminArticle
        organizationList={organizations}
        tagList={tagList}
        categoriesList={categoriesList}
        affiliatedMediaList={affiliatedMediaList}
        isEditMode={Boolean(articleDetail?.id)}
        info={articleDetail}
      />
    </MainBlock>
  );
}
