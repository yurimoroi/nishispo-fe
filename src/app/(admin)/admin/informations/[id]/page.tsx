import {
  FieldBlock,
  LabelFieldBlockDetailView,
  LabelFieldBlockDetailViewImage,
} from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import PlaceholderImage from "@public/placeholder/ImageSample.png";
import { BlockHeaderSectionTitle } from "@/components/feature/datatable";
import {
  ButtonsDetailBlock,
  getAdminInformationById,
} from "@/components/admin/informations";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - お知らせ詳細",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminInformationsPage({ params }: PageProps) {
  const { id } = params;
  const [informationResponse] = await Promise.all([
    getAdminInformationById(id),
  ]);

  const { data } = informationResponse || {};
  if (!data) notFound();
  const {
    id: informationId,
    title,
    body,
    company_id,
    published_at,
    finished_at,
    info_images,
    created_at,
    updated_at,
  } = data || {};

  const releasePeriod =
      (published_at ? published_at : "") ||
      (finished_at ? finished_at : "")
        ? `${published_at ? published_at : ""} - ${finished_at ? finished_at : ""}`
        : "-";

  const imageSrc = info_images || PlaceholderImage;
  const isNew = true;

  return (
    <>
      <MainBlock>
        <div className="mb-5 flex items-center justify-between">
          <BlockHeaderSectionTitle headerTitle="お知らせ詳細" />
        </div>
        {/* Title */}
        <LabelFieldBlockDetailView
          label="タイトル"
          child={
            <FieldBlock className="px-3 text-base lg:p-0">
              <div className="flex items-center gap-5 p-0">
                <span>{title}</span>
                {isNew && (
                  <span className="bg-blue-300 text-white lg:p-2">New</span>
                )}
              </div>
            </FieldBlock>
          }
        />
        {/* Release Period */}
        <LabelFieldBlockDetailView label="公開期間" value={releasePeriod} />
        {/* Body */}
        <LabelFieldBlockDetailView
          label="本文"
          value={body}
          className="whitespace-pre-line"
        />
        {/* Created At */}
        <LabelFieldBlockDetailView label="作成日時" value={created_at} />
        {/* Image */}
        <LabelFieldBlockDetailViewImage
          label="お知らせ画像"
          imageSrc={imageSrc}
        />
      </MainBlock>
      <ButtonsDetailBlock />
    </>
  );
}
