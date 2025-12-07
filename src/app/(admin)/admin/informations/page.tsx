import { MainTableData } from "@/components/admin/informations";
import {
  BlockHeaderSectionTitle,
  ButtonRedirect,
  Loading,
} from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - お知らせ一覧",
};

export default async function AdminInformationsPage() {
  return (
    <MainBlock>
      <div className="mb-5 flex items-center justify-between">
        <BlockHeaderSectionTitle headerTitle="お知らせ一覧" />
        <ButtonRedirect
          label="新規作成"
          redirectPath="/admin/informations/new"
        />
      </div>
      <Suspense fallback={<Loading />}>
        <MainTableData />
      </Suspense>
    </MainBlock>
  );
}
