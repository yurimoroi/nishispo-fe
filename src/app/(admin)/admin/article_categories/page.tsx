import { MainTableData } from "@/components/admin/article_categories";
import {
  BlockHeaderSectionTitle,
  ButtonRedirect,
  Loading,
} from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事カテゴリ",
};
type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdminArticleCategories({
  searchParams,
}: PageProps) {
  return (
    <MainBlock>
      <div className="mb-5 flex items-center justify-between">
        <BlockHeaderSectionTitle headerTitle="記事カテゴリ一覧" />
        <ButtonRedirect
          label="新規作成"
          redirectPath="/admin/article_categories/new"
        />
      </div>
      <Suspense fallback={<Loading />}>
        <MainTableData searchParams={searchParams} />
      </Suspense>
    </MainBlock>
  );
}
