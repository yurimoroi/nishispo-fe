import { ButtonSubmit, MainTableData } from "@/components/admin/top_articles";
import {
  BlockHeaderSectionTitle,
  Loading,
} from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - カルーセル記事一覧",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdminTopArticles({ searchParams }: PageProps) {
  return (
    <MainBlock>
      <div className="flex items-center justify-between">
        <BlockHeaderSectionTitle headerTitle="トップページ表示記事一覧" />
        <ButtonSubmit />
      </div>
      <span className="header-subtitle my-7 block text-[.75rem] text-gray-400">
        最大6個ぐらいまでの登録に留めてください。
      </span>
      <Suspense fallback={<Loading />}>
        <MainTableData searchParams={searchParams} />
      </Suspense>
    </MainBlock>
  );
}
