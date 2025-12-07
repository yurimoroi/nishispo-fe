import {
  FormMainBlock,
  getAdminInformationById,
} from "@/components/admin/informations";
import { Metadata } from "next";
import { notFound } from "next/navigation";
export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事投稿者研修",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminInformationsEditPage({ params }: PageProps) {
  const { id } = params;

  const [informationResponse] = await Promise.all([
    getAdminInformationById(id),
  ]);

  if (!informationResponse?.data) notFound();

  return <FormMainBlock response={informationResponse} />;
}
