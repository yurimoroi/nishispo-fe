import { FormCreateEditAlignMedia } from "@/components/admin/alignment_media/FormCreateEditAlignMedia";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 連携他メディア",
};

export default async function AddNewAlignMediaPage() {
  return (
    <MainBlock>
      <PageTitle>連携他メディア作成</PageTitle>
      <Suspense>
        <FormCreateEditAlignMedia />
      </Suspense>
    </MainBlock>
  );
}
