"use client";

import {
  AdminArticleCategoryByIdResponseType,
  BlockHeaderSectionTitle,
  FormAdminArticleCategoriesCreateEdit,
} from "@/components/admin/article_categories";
import MainBlock from "@/components/feature/wrapper/main-block";

type FormMainBlockProps = {
  response?: AdminArticleCategoryByIdResponseType | null;
};

export const FormMainBlock = ({ response = null }: FormMainBlockProps) => {
  return (
    <MainBlock>
      <BlockHeaderSectionTitle
        headerTitle="記事カテゴリ作成"
        className="mb-[.625rem]"
      />
      <FormAdminArticleCategoriesCreateEdit response={response} />
    </MainBlock>
  );
};
