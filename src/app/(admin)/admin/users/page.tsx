import { BlockButtonsHeaderSection } from "@/components/admin/teams";
import { FormAdminUsers, MainTableData } from "@/components/admin/users";
import {
  getAdminUsersListData,
  getContributorStatusNameList,
} from "@/components/admin/users/lib/actions";
import {
  BlockHeaderSectionTitle,
  DataPagination,
  Loading,
} from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const [adminUsersResponse, contributorStatusNameListResponse] =
    await Promise.all([
      getAdminUsersListData({ searchParams }),
      getContributorStatusNameList(),
    ]);

  const { data } = adminUsersResponse ?? {};
  const { data: adminUsers = [], ...paginationData } = data ?? {};

  return (
    <MainBlock>
      <div className="mb-5 flex flex-col items-center justify-between lg:flex-row">
        <BlockHeaderSectionTitle
          headerTitle="アカウント一覧"
          className="w-full justify-start"
        />
        <BlockButtonsHeaderSection className="mt-5 lg:mt-0" />
      </div>

      {/* Form */}
      <Suspense>
        <FormAdminUsers
          contributorNameList={contributorStatusNameListResponse}
        />
        <DataPagination
          paginationData={paginationData}
          className="mt-5 w-full lg:hidden"
        />
      </Suspense>
      {/* Table */}
      <Suspense fallback={<Loading />}>
        <MainTableData data={adminUsers} paginationData={paginationData} />
      </Suspense>
    </MainBlock>
  );
}
