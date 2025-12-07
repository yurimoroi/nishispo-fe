import {
  FormMainBlock,
  getAdminArticleCategoryById,
} from "@/components/admin/article_categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事カテゴリ",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminArticleCategoriesEditPage({
  params,
}: PageProps) {
  const { id } = params;
  const [response] = await Promise.all([getAdminArticleCategoryById(id)]);

  return <FormMainBlock response={response} />;
}
