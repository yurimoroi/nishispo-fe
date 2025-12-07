import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { FormInquiry } from "@/components/inquiry/form-inquiry";
import { getInquiryType } from "@/components/inquiry/lib";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "お問い合わせ - ミヤスポ ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default async function Page() {
  const [inquiryTypesResponse] = await Promise.all([getInquiryType()]);
  const { data: inquiryType } = inquiryTypesResponse;

  return (
    <>
      <MainBlock className="px-6 lg:px-[2.5rem]">
        <SectionBreadcrumbs />
      </MainBlock>
      <MainBlock size="sm">
        <PageTitle>お問い合わせ</PageTitle>
        <Suspense fallback={""}>
          <FormInquiry inquiryTypes={inquiryType} />
        </Suspense>
      </MainBlock>
    </>
  );
}
