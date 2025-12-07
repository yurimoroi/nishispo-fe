import { FormRegisterAdmin } from "@/components/admin/users";
import { getAdminUserDetail } from "@/components/admin/users/detail/lib/actions";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { getOrganizationList } from "@/components/registration/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - アカウント",
};

export default async function Page({ params }: { params: { id: string } }) {
  const [getOrganizationListResponse, getAdminUserDetailResponse] = await Promise.all([
    getOrganizationList(),
    getAdminUserDetail(params.id),
  ]);

  const organizations = getOrganizationListResponse?.data || [];
  const { data } = getAdminUserDetailResponse;

  if (!data) {
    return <MainBlock>{getAdminUserDetailResponse?.message}</MainBlock>;
  }

  return (
    <MainBlock>
      <PageTitle>アカウント作成</PageTitle>
      <FormRegisterAdmin
        organizations={organizations}
        isEditMode={true}
        info={data}
        userId={params.id}
      />
    </MainBlock>
  );
}
