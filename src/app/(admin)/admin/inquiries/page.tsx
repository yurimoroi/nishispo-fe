import { MainTableData } from "@/components/admin/inquiries";
import {
  BlockHeaderSectionTitle,
  Loading,
} from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - お問い合わせ",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AdminInquiriesPage({ searchParams }: PageProps) {
  return (
    <MainBlock>
      <div className="mb-5 flex items-center justify-between">
        <BlockHeaderSectionTitle headerTitle="お問い合わせ一覧" />
      </div>
      <Suspense fallback={<Loading />}>
        <MainTableData searchParams={searchParams} />
      </Suspense>
    </MainBlock>
  );
}
