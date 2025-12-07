import { FormAdminArticleCsv } from "@/components/admin/article_csv";
import { MainTableData } from "@/components/admin/trainings";
import {
  BlockHeaderSectionTitle,
  ButtonRedirect,
  Loading,
} from "@/components/feature/datatable";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import { Suspense } from "react";
import { Form } from "react-hook-form";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - ポイント配布用CSV出力",
};

export default async function AdminArticleCsvPage() {
  return (
    <MainBlock>
      <div className="mb-5 flex items-center justify-between">
        <BlockHeaderSectionTitle headerTitle="記事投稿者ポイント配布用CSV出力" />
      </div>
      <FormAdminArticleCsv />
    </MainBlock>
  );
}
