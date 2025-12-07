import { FormCreateEditAlignMedia } from "@/components/admin/alignment_media/FormCreateEditAlignMedia";
import { getAlignMediaById } from "@/components/admin/alignment_media/lib/actions";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 連携他メディア",
};

export default async function EditAlignMediaPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) return notFound();

  const [alignMediaDetailsResponse] = await Promise.all([
    getAlignMediaById(params.id),
  ]);
  const { data: alignMediaDetails } = alignMediaDetailsResponse;

  return (
    <MainBlock>
      <PageTitle>連携他メディア作成</PageTitle>
      <Suspense>
        <FormCreateEditAlignMedia alignMedia={alignMediaDetails} />
      </Suspense>
    </MainBlock>
  );
}
