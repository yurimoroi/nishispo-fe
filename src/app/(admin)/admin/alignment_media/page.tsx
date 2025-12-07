import { AlignmentSpread } from "@/components/admin/alignment_media/alignment-spread";
import { getAlignMedia } from "@/components/admin/alignment_media/lib/actions";
import { FormAdminTeams, MainTableData } from "@/components/admin/teams";
import { TeamDetails } from "@/components/admin/teams/details/team-details";
import { PageTitle } from "@/components/feature/common";
import { DataPagination, Loading } from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 連携他メディア",
};

export default async function AlignMediaPage() {
  const [alignMediaDataResponse] = await Promise.all([getAlignMedia()]);

  const { data: alignMediaData } = alignMediaDataResponse;

  return (
    <Suspense fallback="">
      <MainBlock className="pb-10 md:pb-20">
        <div className="flex justify-between">
          <PageTitle>連携他メディア一覧</PageTitle>
          <Button asChild>
            <Link href="/admin/alignment_media/new">
              メディアを新規追加する
            </Link>
          </Button>
        </div>
        {alignMediaData.map((data) => (
          <AlignmentSpread key={data.id} data={data} />
        ))}
      </MainBlock>
    </Suspense>
  );
}
