import { FormRegisterAdmin } from "@/components/admin/users";
import { getAdminUserDetail } from "@/components/admin/users/detail/lib/actions";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { getOrganizationList } from "@/components/registration/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - アカウント",
};

type PageProps = {
  searchParams: { [key: string]: string | undefined };
};

// As per client use case, /admin/users/new will also serve as edit page
export default async function Page({ searchParams }: PageProps) {
  const [getOrganizationListResponse, getAdminUserDetailResponse] =
    await Promise.all([
      getOrganizationList(),
      getAdminUserDetail(searchParams.id || ""),
    ]);

  const isEditMode = Boolean(searchParams.id);

  const organizations = getOrganizationListResponse?.data || [];
  const { data } = getAdminUserDetailResponse;

  return (
    <MainBlock>
      <PageTitle>{isEditMode ? "アカウント編集" : "アカウント作成"}</PageTitle>
      <FormRegisterAdmin
        organizations={organizations}
        isEditMode={isEditMode}
        info={isEditMode ? data : undefined}
        userId={searchParams.id}
      />
    </MainBlock>
  );
}
