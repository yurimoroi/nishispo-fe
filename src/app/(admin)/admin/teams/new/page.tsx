import { FormCreateEditTeam } from "@/components/admin/teams";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 種目",
};

export default async function AddNewTeamPage() {
  // temporarily redirect to 404
  // notFound();
  return (
    <MainBlock>
      <PageTitle>種目作成</PageTitle>
      <Suspense>
        <FormCreateEditTeam />
      </Suspense>
    </MainBlock>
  );
}
