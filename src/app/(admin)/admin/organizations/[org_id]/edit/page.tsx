import { FormCreateEditOrganization } from "@/components/admin/organizations/form-organization";
import { getOrganizationById } from "@/components/admin/organizations/lib/actions";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 組織",
};

export default async function OrganizationsEditPage({
  params,
}: {
  params: { org_id: string };
}) {
  if (!params.org_id) return notFound();

  const [getOrganizationResponse] = await Promise.all([
    getOrganizationById(params.org_id),
  ]);

  const org = getOrganizationResponse?.data || [];

  return (
    <MainBlock className="pt-6 lg:pt-[2.5rem]">
      <PageTitle>組織作成</PageTitle>
      <Suspense fallback="">
        <FormCreateEditOrganization org={org} />
      </Suspense>
    </MainBlock>
  );
}
