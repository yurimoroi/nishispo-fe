import { FormCreateEditOrganization } from "@/components/admin/organizations/form-organization";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 組織",
};

export default async function OrganizationCreatePage() {
  return (
    <MainBlock className="pt-6 lg:pt-[2.5rem]">
      <PageTitle>組織作成</PageTitle>
      <Suspense fallback="">
        <FormCreateEditOrganization />
      </Suspense>
    </MainBlock>
  );
}
