import { getAdminArticleById } from "@/components/admin/articles";
import { FormRemand } from "@/components/admin/articles/remand/form-remand";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事",
};

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return <p>No Article Id.</p>;

  const [getAdminArticleByIdResponse] = await Promise.all([
    getAdminArticleById(params.id),
  ]);

  if (!getAdminArticleByIdResponse?.data) return <p>No Article Data found.</p>;

  const articleDetail = getAdminArticleByIdResponse?.data;

  return (
    <MainBlock className="max-w-[50rem] lg:px-0">
      <FormRemand articleIdToRemand={params.id} articleDetail={articleDetail} />
    </MainBlock>
  );
}
