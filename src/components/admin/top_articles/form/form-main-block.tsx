"use client";

import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { AdminTopArticlesByIdResponseType } from "../lib";
import { FormAdminTopArticlesCreateEdit } from "./form";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - メニュー",
};

type FormMainBlockProps = {
  response?: AdminTopArticlesByIdResponseType | null;
  ids?: {
    topArticleId?: string;
    articleId?: string;
  };
  readonlyArticleTitle?: string;
  readonlyArticleContributorName?: string;
};

export const FormMainBlock = ({
  response = null,
  ...props
}: FormMainBlockProps) => {
  return (
    <MainBlock>
      <span className="mb-[.625rem] block text-[1.25rem] font-bold">
        トップページ表示記事変更
      </span>
      <FormAdminTopArticlesCreateEdit response={response} {...props} />
    </MainBlock>
  );
};
