import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { BlockHeaderSectionTitle } from "@/components/feature/datatable";
import { getAdminInquiriesById } from "@/components/admin/inquiries";
import { FormAdminInquiriesEdit } from "@/components/admin/inquiries/form/form";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - お知らせ詳細",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminInquiriesPage({ params }: PageProps) {
  const { id } = params;
  const [informationResponse] = await Promise.all([getAdminInquiriesById(id)]);
  return (
    <>
      <MainBlock>
        <div className="mb-5 flex items-center justify-between">
          <BlockHeaderSectionTitle headerTitle="お問い合わせ詳細" />
        </div>
        <FormAdminInquiriesEdit response={informationResponse} />
      </MainBlock>
    </>
  );
}
