import { PageContent, PageTitle } from "@/components/feature/common";
import { getCompanyData } from "@/components/feature/footer/lib/actions";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Button } from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - メニュー",
};

export default async function Page() {
  const [companyDataResponse] = await Promise.all([getCompanyData()]);
  const { data } = companyDataResponse;
  const dataContent = DOMPurify.sanitize(data.about_company);
  const editPageLink = "/admin/companies/about/company/edit";

  return (
    <MainBlock>
      <PageTitle className="text-3xl">運営会社について</PageTitle>
      <PageContent>
        <div
          className="whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: dataContent }}
        ></div>
        <div className="pb-16 pt-2 text-center sm:pb-0">
          <Button asChild className="flex text-base md:inline-flex">
            <Link href={editPageLink}>編集</Link>
          </Button>
        </div>
      </PageContent>
    </MainBlock>
  );
}
