import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { ModalContributor } from "@/components/feature/modal/modal-contributor";
import MainBlock from "@/components/feature/wrapper/main-block";
import { UserDetail } from "@/components/mypage";

import { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "記事編集 - ミヤスポ ",
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <MainBlock>
      <SectionBreadcrumbs />
      <Suspense fallback={""}>
        <UserDetail />
      </Suspense>
      <ModalContributor />
    </MainBlock>
  );
}
