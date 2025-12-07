import {
  convertDateToJP,
  getPrefectureLabelById,
  maskExceptLast,
  processDataDefaultToDash,
} from "@/lib/utils";
import {
  LabelBlock,
  LabelFieldBlockDetailView,
} from "../feature/common/label-field-block";
import { getUserDetail } from "./lib/actions";
import {
  AffiliationAction,
  AffiliationBlock,
  AffiliationImage,
  AffiliationInfo,
  AffiliationTag,
  MembershipDetail,
  SectionBlock,
  SectionHeader,
} from "./user-detail-ui";
import { TwoColContainer, TwoColContainerItem } from "@feature/layout";
import { ApplyAsAuthor, LogoutButton, MembershipToggle } from "./user-request";
import Link from "next/link";
import { Button } from "../ui/button";
import { ContributorStatus } from "@/lib/types";
import { AffiliateWithdrawalButton } from "./user-detail-action";
import { prefectureValues } from "@/lib";
import { PageTitle } from "../feature/common";

export const UserDetail = async () => {
  const [userDetailsResponse] = await Promise.all([getUserDetail()]);

  const { data } = userDetailsResponse;

  if (!data) return null;

  const {
    id,
    family_name,
    given_name,
    phonetic_family_name,
    phonetic_given_name,
    birth_date,
    gender,
    postal_code,
    province,
    address_1,
    address_2,
    address_3,
    phone_number,
    mobile_phone_number,

    contributor,
    contributor_name,

    login_id,
    email,
    favorite_sport,
    favorite_gourmet,

    rakuten_id,
    advertiser_name,
    advertiser_flg,
    affiliate,
  } = data;
  const formattedAddress = `〒${postal_code ?? ""} ${province ? getPrefectureLabelById(province.toString()) : ""} ${address_1 ?? ""} ${address_2 ?? ""} ${address_3 ?? ""}`;
  const memberInfoFirstColumn = [
    {
      label: "姓",
      value: processDataDefaultToDash(family_name),
    },
    {
      label: "名",
      value: processDataDefaultToDash(given_name),
    },
    {
      label: "姓（かな）",
      value: processDataDefaultToDash(phonetic_family_name),
    },
    {
      label: "名（かな）",
      value: processDataDefaultToDash(phonetic_given_name),
    },
    {
      label: "生年月日",
      value: convertDateToJP(birth_date),
    },
    {
      label: "性別",
      value: processDataDefaultToDash(String(gender?.label)),
    },
    {
      label: "住所",
      value: processDataDefaultToDash(`${formattedAddress}`),
    },
    {
      label: "自宅電話番号",
      value: processDataDefaultToDash(phone_number),
    },
    {
      label: "携帯電話番号",
      value: processDataDefaultToDash(mobile_phone_number),
    },
  ];

  const memberInfoSecondColumn = [
    {
      label: "ログインID",
      value: processDataDefaultToDash(login_id),
    },
    {
      label: "メールアドレス",
      value: processDataDefaultToDash(email),
    },
    {
      label: "好きなスポーツ",
      value: processDataDefaultToDash(favorite_sport || ""),
    },
    {
      label: "好きなグルメ",
      value: processDataDefaultToDash(favorite_gourmet || ""),
    },
  ];

  const articleContributorInfo = [
    {
      label: "記事投稿者名",
      value: processDataDefaultToDash(contributor_name),
    },
    {
      label: "ログインID",
      value: rakuten_id ? maskExceptLast(rakuten_id) : "-",
    },
    {
      label: "申請ステータス",
      value: contributor?.label || "-",
    },
  ];

  return (
    <section className="">
      <div className="mb-5 flex justify-between">
        <PageTitle size="lg">マイページ</PageTitle>
        <Button asChild>
          <Link href={`/users/edit/${id}`}>会員情報の変更</Link>
        </Button>
      </div>
      <SectionBlock className="mb-5 border-0 pb-0">
        {/* Member Info */}
        <SectionHeader>会員情報</SectionHeader>
        <TwoColContainer className="mb-5 lg:gap-5">
          <TwoColContainerItem className="block">
            {memberInfoFirstColumn.map((item, index) => {
              const { label } = item;
              return <LabelFieldBlockDetailView {...item} key={label} />;
            })}
          </TwoColContainerItem>
          <TwoColContainerItem className="block">
            {memberInfoSecondColumn.map((item, index) => {
              const { label } = item;
              return <LabelFieldBlockDetailView {...item} key={label} />;
            })}
            {/* TODO Membership not yet implemented - update logic here when it is ready - commenting for  now */}
            {/* <LabelFieldBlockDetailView
              className="mt-5"
              label="会員種別"
              value=""
              child={<MembershipDetail />}
            /> */}
            {/* TODO Membership not yet implemented - we do some dummy popup for now - commenting for  now */}
            {/* <div className="flex justify-end">
              <MembershipToggle />
            </div> */}
          </TwoColContainerItem>
        </TwoColContainer>
        {/* Club Info / Categories */}
        <div className="">
          <div className="mb-5 flex justify-between pt-0">
            <SectionHeader className="pb-0">所属スポーツクラブ</SectionHeader>
            {/* TODO Redirect to G-10, this deferred for Phase 2 - hiding for now */}
            {/* <Link href="#" className="text-sm text-blue-100 underline">
            スポーツクラブ追加する
          </Link> */}
          </div>

          <SectionBlock className="flex flex-col gap-5 !border-0 !p-0">
            <>
              {(affiliate || []).map((item, index) => {
                const { id: affiliateId, name, logo, status, btns } = item;
                return (
                  <AffiliationBlock
                    key={affiliateId}
                    className="border-0 border-b-[.0625rem] lg:border-[.25rem] lg:p-5"
                  >
                    <AffiliationInfo>
                      <AffiliationImage imageSource={logo} />
                      <div>
                        <AffiliationTag
                          label={status?.label}
                          className="inline-flex lg:hidden"
                        />
                        <p>{name}</p>
                      </div>
                    </AffiliationInfo>

                    <div className="flex items-center">
                      <AffiliationAction>
                        <AffiliationTag
                          label={status?.label}
                          className="hidden lg:flex"
                        />
                        {btns.withdraw && (
                          <AffiliateWithdrawalButton userId={affiliateId} />
                        )}
                      </AffiliationAction>
                    </div>
                  </AffiliationBlock>
                );
              })}

              {affiliate.length === 0 && <p>-</p>}
            </>
          </SectionBlock>
        </div>
      </SectionBlock>
      {/* Article Contribution Block*/}
      {/* This is only shown if the user is an article contributor status 0 */}
      {contributor.status === ContributorStatus.NotSubmitted && (
        <SectionBlock className="mb-5">
          <div className="flex flex-col justify-between gap-3 pt-0 lg:flex-row">
            <SectionHeader className="pb-0">記事投稿者申請</SectionHeader>
            <ApplyAsAuthor />
          </div>
        </SectionBlock>
      )}
      {/* Article Contributor Information */}
      {/* This is only shown if the user is an article contributor status > 0 */}
      {contributor.status !== ContributorStatus.NotSubmitted && (
        <SectionBlock className="mb-2.5">
          <TwoColContainer className="mb-5 gap-[.75rem] lg:gap-5">
            <TwoColContainerItem className="flex justify-between">
              <SectionHeader className="pb-0">記事投稿者情報</SectionHeader>
              {contributor.status !== ContributorStatus.Approved && (
                <Link
                  href="/contributors/trainings"
                  className="flex max-w-max items-center text-blue-100 underline lg:hidden"
                >
                  記事投稿者研修
                </Link>
              )}
            </TwoColContainerItem>
            <TwoColContainerItem className="block">
              <TwoColContainer className="gap-[.75rem] lg:justify-end lg:gap-10">
                {contributor.status !== ContributorStatus.Approved && (
                  <Link
                    href="/contributors/trainings"
                    className="hidden max-w-max items-center text-blue-100 underline lg:flex"
                  >
                    記事投稿者研修
                  </Link>
                )}
                {contributor.status === ContributorStatus.Approved && (
                  <Button asChild>
                    <Link href="/contributor" className="w-max text-blue-100">
                      記事投稿
                    </Link>
                  </Button>
                )}
              </TwoColContainer>
            </TwoColContainerItem>
          </TwoColContainer>
          {articleContributorInfo.map((item, index) => {
            const { label } = item;
            return <LabelFieldBlockDetailView {...item} key={label} />;
          })}
        </SectionBlock>
      )}

      {/* Other Operations */}
      <SectionBlock>
        <TwoColContainer className="flex-col items-center gap-5 lg:flex-row">
          <TwoColContainerItem className="flex lg:flex-row">
            <SectionHeader className="pb-0">その他の操作</SectionHeader>
          </TwoColContainerItem>
          <TwoColContainerItem className="flex flex-col items-start gap-5 lg:items-end">
            {/* Hiding the Social Section not for Phase 1 as per Seima's request*/}
            {/* <Link
              href="/social"
              className="text-sm text-blue-100 underline lg:text-lg"
            >
              SNS連携
            </Link> */}
            <Link
              href="/password/edit"
              className="text-sm text-blue-100 underline lg:text-lg"
            >
              パスワード変更
            </Link>
            <LogoutButton className="h-auto" />
          </TwoColContainerItem>
        </TwoColContainer>
      </SectionBlock>
    </section>
  );
};
