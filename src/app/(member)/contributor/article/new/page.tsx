import { FormArticle } from "@/components/contributor/form-article";
import {
  getArticleTagList,
  getArticleOrganizationList,
  getArticleCategories,
} from "@/components/feature/article-post";
import { ModalArticlePreview } from "@/components/feature/modal/modal-article-preview";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "事編集 - ミヤスポ ",
};

export default async function Page() {
  const [
    getArticleOrganizationListResponse,
    articleTagListResponse,
    getArticleCategoriesResponse,
  ] = await Promise.all([
    getArticleOrganizationList(),
    getArticleTagList(),
    getArticleCategories(),
  ]);

  const organizations = getArticleOrganizationListResponse?.data || [];
  const tagList = articleTagListResponse?.data || [];
  const categoriesList = getArticleCategoriesResponse?.data || [];
  
  return (
    <MainBlock>
      <FormArticle organizationList={organizations} tagList={tagList} categoriesList={categoriesList}/>
      <ModalArticlePreview/>
    </MainBlock>
  );
}
