import { MainTableData } from "@/components/admin/trainings";
import {
  BlockHeaderSectionTitle,
  ButtonRedirect,
  Loading,
} from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事投稿者研修",
};

export default async function AdminTrainingsPage() {
  return (
    <MainBlock>
      <div className="mb-5 flex items-center justify-between">
        <BlockHeaderSectionTitle headerTitle="記事投稿者研修一覧" />
        <ButtonRedirect label="新規作成" redirectPath="/admin/trainings/new" />
      </div>
      <Suspense fallback={<Loading />}>
        <MainTableData />
      </Suspense>
    </MainBlock>
  );
}
