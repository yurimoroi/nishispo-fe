import {
  ApproveToContributorButton,
  ApproveUserToOrganizationButton,
  ApproveUserWithdrawFromOrganizationButton,
  OrgBlockHeader,
  OrgBlockItem,
  OrgBlockItems,
  OrgBlockLabel,
} from "@/components/admin/users";
import { getAdminUserDetail } from "@/components/admin/users/detail/lib/actions";
import {
  LabelFieldBlockDetailView,
  PageTitle,
} from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Button } from "@/components/ui/button";
import {
  convertDateToJP,
  getPrefectureLabelById,
  replaceLocalhost,
} from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - アカウント",
};

export default async function Page({ params }: { params: { id: string } }) {
  const [getAdminUserDetailResponse] = await Promise.all([
    getAdminUserDetail(params.id),
  ]);

  const { data } = getAdminUserDetailResponse;

  if (!data) {
    return (
      <MainBlock>
        <p>{getAdminUserDetailResponse?.message}</p>
      </MainBlock>
    );
  }

  const {
    id,
    family_name,
    given_name,
    phonetic_family_name,
    phonetic_given_name,
    avatar,
    nickname,
    birth_date,
    gender,
    address_1,
    address_2,
    address_3,
    phone_number,
    mobile_phone_number,
    favorite_sport,
    favorite_gourmet,
    login_id,
    permissions,
    contributor_name,
    rakuten_id,
    articles_count,
    contributor,
    affiliate,
    province,
    postal_code,
  } = data || {};

  const formattedAddress = `〒${postal_code ?? ""} ${province ? getPrefectureLabelById(province.toString()) : ""} ${address_1 ?? ""} ${address_2 ?? ""} ${address_3 ?? ""}`;

  return (
    <MainBlock>
      <PageTitle>アカウント詳細</PageTitle>
      <LabelFieldBlockDetailView
        label="氏名"
        value={`${family_name} ${given_name}`}
      />
      <LabelFieldBlockDetailView
        label="かな"
        value={`${phonetic_family_name} ${phonetic_given_name}`}
      />
      <LabelFieldBlockDetailView
        label="アイコン画像"
        child={
          <div className="relative h-[7.5rem] w-[157px] bg-shade-100 lg:h-[140px] lg:w-[140px]">
            <Image
              src={replaceLocalhost(avatar)}
              alt="avatar"
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
            />
          </div>
        }
      />
      <LabelFieldBlockDetailView label="ニックネーム" value={nickname} />
      <LabelFieldBlockDetailView
        label="生年月日"
        value={convertDateToJP(birth_date)}
      />
      <LabelFieldBlockDetailView label="性別" value={gender.label} />
      <LabelFieldBlockDetailView label="住所" value={`${formattedAddress}`} />
      <LabelFieldBlockDetailView label="自宅電話番号" value={phone_number} />
      <LabelFieldBlockDetailView
        label="携帯電話番号"
        value={mobile_phone_number}
      />
      <LabelFieldBlockDetailView
        label="好きなスポーツ"
        value={favorite_sport}
      />
      <LabelFieldBlockDetailView
        label="好きなグルメ"
        value={favorite_gourmet}
      />
      <LabelFieldBlockDetailView label="ログインID" value={login_id} />
      <LabelFieldBlockDetailView
        label="権限一覧"
        value={
          [
            permissions.can_contribute_article && "記事投稿者",
            permissions.is_advertiser && "広告主",
            permissions.is_secretariat && "事務局",
            permissions.is_event_leader && "種目リーダー",
            permissions.is_administrator_flg && "組織管理者",
            permissions.is_general && "一般",
          ]
            .filter(Boolean)
            .join(",") || "-"
        }
      />
      <LabelFieldBlockDetailView
        label="所属組織"
        child={
          <OrgBlockItems>
            {affiliate.map((item) => {
              const { id: organizationId, name, btns } = item;
              return (
                <OrgBlockItem key={organizationId}>
                  <OrgBlockHeader>
                    <OrgBlockLabel>{name}</OrgBlockLabel>
                    {btns?.waitingApproval && (
                      <ApproveUserToOrganizationButton
                        userId={id}
                        organizationId={organizationId}
                      />
                    )}
                    {btns?.approvedWithdraw && (
                      <ApproveUserWithdrawFromOrganizationButton
                        userId={id}
                        organizationId={organizationId}
                      />
                    )}
                  </OrgBlockHeader>
                </OrgBlockItem>
              );
            })}

            {affiliate.length === 0 && <p>-</p>}
          </OrgBlockItems>
        }
      />
      {contributor.status >= 3 && (
        <>
          <LabelFieldBlockDetailView
            label="記事投稿者名"
            value={contributor_name}
          />
          <LabelFieldBlockDetailView label="楽天ID" value={rakuten_id} />
          <LabelFieldBlockDetailView
            label="掲載中記事数"
            value={String(articles_count.published)}
          />
          <LabelFieldBlockDetailView
            label="申請中記事数"
            value={String(articles_count.pending)}
          />
        </>
      )}
      {contributor.status === 2 && (
        <LabelFieldBlockDetailView
          label="記事投稿者申請承認"
          child={<ApproveToContributorButton userId={params.id} />}
        />
      )}

      <div className="mb-20 mt-10 flex flex-col justify-center gap-5 lg:mb-10 lg:mt-5 lg:flex-row">
        <Button variant="secondary" type="button" asChild>
          <Link href="/admin/users">戻る</Link>
        </Button>
        <Button type="button" asChild>
          <Link href={`/admin/users/new?id=${id}`}>編集</Link>
        </Button>
      </div>
    </MainBlock>
  );
}
