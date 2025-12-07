import {
  FormAdminTeams,
  getAdminTeamsData,
  MainTableData,
} from "@/components/admin/teams";
import { Loading } from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 種目",
};

export default async function AdminTeamsPage({ searchParams }: PageProps) {
  // temporarily redirect to 404
  // notFound();
  const [teamsResponse] = await Promise.all([
    getAdminTeamsData({ searchParams }),
  ]);
  const { data } = teamsResponse ?? {};
  const { data: adminTeams = [], ...paginationData } = data ?? {};

  return (
    <MainBlock>
      {/* Form */}
      <Suspense>
        <FormAdminTeams />
      </Suspense>
      <div className="mb-[1.875rem] flex justify-between">
        <span className="font-bold">種目一覧</span>
        <Link
          className="block rounded bg-blue-100 px-3 py-[.375rem] text-white"
          href="/admin/teams/new"
        >
          新規作成
        </Link>
      </div>
      {/* Table */}
      <Suspense fallback={<Loading />}>
        <MainTableData data={adminTeams} paginationData={paginationData} />
      </Suspense>
    </MainBlock>
  );
}
