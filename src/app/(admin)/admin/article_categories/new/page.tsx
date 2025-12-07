import { FormMainBlock } from "@/components/admin/article_categories/form/form-main-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事カテゴリ",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminArticleCategoriesNewPage({
  params,
}: PageProps) {
  return <FormMainBlock />;
}
