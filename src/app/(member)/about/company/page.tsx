import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { PageContent, PageTitle } from "@/components/feature/common";
import { getCompanyData } from "@/components/feature/footer/lib/actions";
import MainBlock from "@/components/feature/wrapper/main-block";
import DOMPurify from "isomorphic-dompurify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営会社について - ミヤスポ  ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default async function Page() {
  const [companyDataResponse] = await Promise.all([getCompanyData()]);
  const { data: companyData } = companyDataResponse;
  const dataContent = DOMPurify.sanitize(companyData.about_company);
  return (
    <>
      <MainBlock className="px-6 lg:px-[2.5rem]">
        <SectionBreadcrumbs />
      </MainBlock>
      <MainBlock size="sm">
        <PageTitle>運営会社について</PageTitle>
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
