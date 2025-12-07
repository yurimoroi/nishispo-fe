import {
  getAdminTopArticlesById,
  getAdminArticleByArticleId,
} from "@/components/admin/top_articles";
import { FormMainBlock } from "@/components/admin/top_articles/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事カテゴリ",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminTopArticlesEditPage({ params }: PageProps) {
  const { id } = params;

  // Fetch the article data
  const articleResponse = await getAdminArticleByArticleId(id);
  const { data } = articleResponse ?? {};

  const { top_article, title, user } = data ?? {};
  const ids = {
    topArticleId: top_article?.id ?? undefined,
    articleId: id ?? undefined,
  };

  // Fetch top article data if topArticleId exists
  const topArticleResponse = ids?.topArticleId
    ? await getAdminTopArticlesById(ids?.topArticleId)
    : null;

  return (
    <FormMainBlock
      response={topArticleResponse}
      ids={ids}
      readonlyArticleTitle={title}
      readonlyArticleContributorName={user?.contributor_name}
    />
  );
}
