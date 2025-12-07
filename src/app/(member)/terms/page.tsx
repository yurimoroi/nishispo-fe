import DOMPurify from "isomorphic-dompurify";
import { Metadata } from "next";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import MainBlock from "@/components/feature/wrapper/main-block";
import { PageTitle, PageContent } from "@/components/feature/common";
import { getCompanyData } from "@/components/feature/footer/lib/actions";

export const metadata: Metadata = {
  title: "利用規約 - ミヤスポ  ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default async function Page() {
  const [companyDataResponse] = await Promise.all([getCompanyData()]);
  const { data: termsData } = companyDataResponse;
  const dataContent = DOMPurify.sanitize(termsData.terms);
  return (
    <>
      <MainBlock className="px-6 lg:px-[2.5rem]">
        <SectionBreadcrumbs />
      </MainBlock>
      <MainBlock size="sm">
        <PageTitle>利用規約</PageTitle>
        <PageContent className="text-base sm:text-lg">
          <div
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: dataContent }}
          ></div>
        </PageContent>
      </MainBlock>
    </>
  );
}
