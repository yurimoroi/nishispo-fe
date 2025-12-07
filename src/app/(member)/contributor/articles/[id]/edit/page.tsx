import { FormArticle, getArticleDetails } from "@/components/contributor";
import {
  getArticleTagList,
  getArticleOrganizationList,
  getArticleCategories,
} from "@/components/feature/article-post";
import { ModalArticlePreview } from "@/components/feature/modal/modal-article-preview";
import MainBlock from "@/components/feature/wrapper/main-block";
import { ARTICLE_MESSAGE } from "@/lib/message-map";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "事編集 - ミヤスポ ",
};

export default async function Page({ params }: { params: { id: string } }) {
  const [
    getArticleOrganizationListResponse,
    articleDetailsResponse,
    articleTagListResponse,
    getArticleCategoriesResponse,
  ] = await Promise.all([
    getArticleOrganizationList(),
    getArticleDetails(params.id),
    getArticleTagList(),
    getArticleCategories(),
  ]);

  const organizations = getArticleOrganizationListResponse?.data || [];
  const articleDetail = articleDetailsResponse?.data || {};
  const tagList = articleTagListResponse?.data || [];
  const categoriesList = getArticleCategoriesResponse?.data || [];

  // Note: Non Published (6 status) or expired for for future Date Range related Articles is not returned by API
  if (!articleDetailsResponse?.data) {
    return (
      <MainBlock className="mt-10">
        <p>{ARTICLE_MESSAGE.NO_DATA}</p>
      </MainBlock>
    );
  }

  return (
    <MainBlock>
      <FormArticle
        info={articleDetail}
        organizationList={organizations}
        tagList={tagList}
        categoriesList={categoriesList}
      />
    </MainBlock>
  );
}