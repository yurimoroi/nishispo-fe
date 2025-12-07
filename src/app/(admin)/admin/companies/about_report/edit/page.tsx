import { FormEdit } from "@/components/admin/companies/about_report/form-edit";
import {
  LabelBadge,
  PageContent,
  PageTitle,
} from "@/components/feature/common";
import { getCompanyData } from "@/components/feature/footer/lib/actions";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 利用規約",
};

export default async function Page() {
  const [companyDataResponse] = await Promise.all([getCompanyData()]);
  const { data } = companyDataResponse;
  return (
    <MainBlock>
      <PageTitle>
        <span className="inline-block align-top leading-[1.125rem] sm:leading-[1.4375rem]">
          掲載内容について編集
        </span>
        <LabelBadge className="ml-2 inline-block align-top text-[.75rem] leading-normal" />
      </PageTitle>

      <PageContent>
        <FormEdit currentContent={data.about_report} />
      </PageContent>
    </MainBlock>
  );
}
