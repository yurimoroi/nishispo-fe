import { FormPostLimit } from "@/components/admin/post_limit";
import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
  LabelFieldBlockDetailView,
  PageTitle,
} from "@/components/feature/common";
import { getCompanyData } from "@/components/feature/footer/lib/actions";
import MainBlock from "@/components/feature/wrapper/main-block";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事投稿設定",
};

export default async function Page() {
  const [companyDataResponse] = await Promise.all([getCompanyData()]);

  const { data: companyInfo } = companyDataResponse;

  const organizationMemberPostLimit =
    companyInfo?.organization_member_post_limit || "";
  const organizationPostLimit = companyInfo?.organization_post_limit || "";
  const postLimit = companyInfo?.post_limit || "";

  return (
    <MainBlock>
      <PageTitle className="mb-5 text-base lg:text-[1.25rem] lg:leading-[1.875rem]">
        記事投稿数設定
      </PageTitle>

      <div className="mb-5">
        <p className="mb-5 font-bold">現在の設定</p>
        <LabelFieldBlockDetailView
          labelClassName={cn(" min-w-[18.75rem] shrink-0")}
          label={<p className="">スポーツクラブ所属者投稿上限数</p>}
          value={String(organizationMemberPostLimit)}
        />
        <LabelFieldBlockDetailView
          labelClassName={cn(" min-w-[18.75rem] shrink-0")}
          label="一般募集記者投稿上限数"
          value={String(organizationPostLimit)}
        />
        <LabelFieldBlockDetailView
          labelClassName={cn(" min-w-[18.75rem] shrink-0")}
          label="スポーツクラブ単位投稿上限数"
          value={String(postLimit)}
        />
      </div>

      <div>
        <p className="mb-5 font-bold">変更後の値</p>
        <FormPostLimit companyInfo={companyInfo} />
      </div>
    </MainBlock>
  );
}
