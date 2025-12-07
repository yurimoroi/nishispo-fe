import { FormMainBlock } from "@/components/admin/informations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - お知らせ作成/編集",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminInformationsNewPage({ params }: PageProps) {
  return <FormMainBlock />;
}
