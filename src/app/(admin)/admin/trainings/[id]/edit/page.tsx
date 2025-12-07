import {
  FormMainBlock,
  getAdminTrainingById,
} from "@/components/admin/trainings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事投稿者研修",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminTrainingsEditPage({ params }: PageProps) {
  const { id } = params;
  const response = await getAdminTrainingById(id);

  return <FormMainBlock response={response} />;
}
