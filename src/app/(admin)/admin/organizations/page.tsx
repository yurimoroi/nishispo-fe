import { PageTitle } from "@/components/feature/common";
import { getCompanyData } from "@/components/feature/footer/lib/actions";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Button } from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";
import { Metadata } from "next";
import Link from "next/link";
import sampleImage from "@public/placeholder/image-placeholder-880x120.png";
import Image, { StaticImageData } from "next/image";
import { OrganizationSpread } from "@/components/admin/organizations/organization-spread";
import { getOrganizationsData } from "@/components/admin/organizations/lib/actions";
import { DataPagination } from "@/components/feature/datatable/data-pagination";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 組織",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function OrganizationsPage({ searchParams }: PageProps) {
  const [organizationsDataResponse] = await Promise.all([
    getOrganizationsData({ searchParams: searchParams }),
  ]);

  const { data } = organizationsDataResponse ?? {};
  const { data: organizationData, ...paginationData } = data || {};

  return (
    <Suspense fallback="">
      <MainBlock className="pb-10 md:pb-20">
        <div className="flex justify-between">
          <PageTitle>組織一覧</PageTitle>
          <Button asChild>
            <Link href="/admin/organizations/new">組織を作成する</Link>
          </Button>
        </div>
        {organizationData?.map((data) => (
          <OrganizationSpread key={data.id} data={data} />
        ))}
        <DataPagination paginationData={paginationData} />
      </MainBlock>
    </Suspense>
  );
}
