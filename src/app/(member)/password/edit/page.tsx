import { FormChangePassword } from "@/components/feature/account/change-password";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "パスワード変更 - ミヤスポ ",
};

export default function Page() {
  return (
    <MainBlock className="mt-10">
      <SectionBreadcrumbs />

      <section className="mx-auto max-w-[40rem] xl:px-0">
        <PageTitle size="lg">パスワード変更</PageTitle>
        <FormChangePassword />
      </section>
    </MainBlock>
  );
}
