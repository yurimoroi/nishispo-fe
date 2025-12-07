import {
  FormAdminTeams,
  getTeamsDetailData,
  MainTableData,
} from "@/components/admin/teams";
import { TeamDetails } from "@/components/admin/teams/details/team-details";
import { PageTitle } from "@/components/feature/common";
import { Loading } from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 種目",
};

export default async function TeamsDetailsPage({
  params,
}: {
  params: { teamsId: string };
}) {
  // temporarily redirect to 404
  // notFound();
  if (!params.teamsId) return notFound();
  const [teamDetailsDataResponse] = await Promise.all([
    getTeamsDetailData(params.teamsId),
  ]);

  const { data: teamDetailsData } = teamDetailsDataResponse;

  return (
    <MainBlock>
      <PageTitle>種目詳細</PageTitle>
      <Suspense>
        <TeamDetails teamDetails={teamDetailsData} />
      </Suspense>
    </MainBlock>
  );
}
