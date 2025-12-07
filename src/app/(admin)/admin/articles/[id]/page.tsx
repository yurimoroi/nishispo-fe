import {
  DetailInfoContainer,
  DetailInfoImageItem,
  DetailInfoImage,
  DetailInfoImageList,
  DetailInfoPRBadge,
  getAdminArticleById,
  DetailInfoTagList,
  DetailInfoTagItem,
  DetailInfoSectionTitle,
  DetailInfoButtonList,
  AdminArticleDetailProvider,
  SubmitApproval,
  EditApproval,
  DeleteApproval,
} from "@/components/admin/articles";
import {
  LabelFieldBlockDetailView,
  PageTitle,
} from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - 記事",
};

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return <p>No Article Id.</p>;

  const [getAdminArticleByIdResponse] = await Promise.all([
    getAdminArticleById(params.id),
  ]);

  if (!getAdminArticleByIdResponse?.data) return <p>No Article Data found.</p>;

  const {
    id,
    pr_flg,
    title,
    categories,
    organization,
    alignment_medias,
    body,
    all_media_url,
    tags,
    published_at,
    publish_ended_at,
    status,
    user,
    updated_at,
    remand_comments,
    revision,
    btns,
  } = getAdminArticleByIdResponse?.data;

  const { comment_to_title, comment_to_body, comment_to_image, comment } =
    remand_comments || {};

  return (
    <AdminArticleDetailProvider articleId={id}>
      <MainBlock className="mb-[80px] max-w-[50rem] space-y-[.625rem] lg:px-0">
        <PageTitle>記事詳細</PageTitle>
        <DetailInfoContainer className="border-b-[3px] border-shade-100 pb-5 lg:border-0 lg:pb-0">
          <LabelFieldBlockDetailView
            label="記事タイトル"
            child={
              <div className="flex gap-2.5">
                {pr_flg && <DetailInfoPRBadge>PR</DetailInfoPRBadge>}

                <p>{title}</p>
              </div>
            }
          />
          <LabelFieldBlockDetailView
            label="記事カテゴリ"
            value={categories.map((category) => category.name).join(", ")}
          />
          <LabelFieldBlockDetailView
            label="記事本文"
            child={<div className="whitespace-pre-line">{body || "-"}</div>}
          />
          <LabelFieldBlockDetailView
            label="記事画像"
            child={
              <DetailInfoImageList>
                {all_media_url?.map(({ id, original }) => (
                  <DetailInfoImageItem key={id}>
                    <DetailInfoImage imageSource={original} />
                  </DetailInfoImageItem>
                )) || <span>-</span>}
              </DetailInfoImageList>
            }
          />
          <LabelFieldBlockDetailView
            label="タグ"
            child={
              <DetailInfoTagList>
                {tags.map(({ id, name }) => {
                  return (
                    <DetailInfoTagItem key={id}>
                      <p>{name}</p>
                    </DetailInfoTagItem>
                  );
                })}
              </DetailInfoTagList>
            }
          />
          <LabelFieldBlockDetailView
            label="公開期間"
            child={
              <p>{`${published_at}  ${publish_ended_at ? `- ${publish_ended_at}` : ""}`}</p>
            }
          />
          <LabelFieldBlockDetailView
            label="記事ステータス"
            value={status?.label || "-"}
          />
          <LabelFieldBlockDetailView
            label="投稿者名"
            value={user?.contributor_name || "-"}
          />
          <LabelFieldBlockDetailView
            label="連携他メディア"
            child={
              alignment_medias && alignment_medias.length > 0
                ? alignment_medias.map((media) => media.name).join(", ")
                : "-"
            }
          />
          <LabelFieldBlockDetailView
            label="対象組織"
            value={organization?.name || "-"}
          />
          <LabelFieldBlockDetailView
            label="最終更新日時"
            value={updated_at || "-"}
          />
        </DetailInfoContainer>

        {revision && (
          <DetailInfoContainer className="border-b-[3px] border-shade-400 pb-5 lg:border-[.125rem] lg:p-2.5">
            <DetailInfoSectionTitle>編集依頼内容</DetailInfoSectionTitle>

            <LabelFieldBlockDetailView
              label="変更事由"
              child={
                <div className="flex gap-2.5">
                  <p>{revision?.comment || "-"}</p>
                </div>
              }
            />
            <LabelFieldBlockDetailView
              label="記事タイトル"
              child={
                <div className="flex gap-2.5">
                  {revision?.pr_flg && (
                    <DetailInfoPRBadge>PR</DetailInfoPRBadge>
                  )}

                  <p>{revision?.title || "-"}</p>
                </div>
              }
            />
            <LabelFieldBlockDetailView
              label="記事カテゴリ"
              value={
                revision?.categories
                  ?.map((category) => category.name)
                  .join(", ") || "-"
              }
            />
            <LabelFieldBlockDetailView
              label="記事本文"
              child={
                <div className="whitespace-pre-line">
                  {revision?.body || "-"}
                </div>
              }
            />
            <LabelFieldBlockDetailView
              label="記事画像"
              child={
                <DetailInfoImageList>
                  {revision?.all_media_url?.length > 0 ? (
                    revision?.all_media_url.map(({ id, original }) => (
                      <DetailInfoImageItem key={id}>
                        <DetailInfoImage imageSource={original} />
                      </DetailInfoImageItem>
                    ))
                  ) : (
                    <span>-</span>
                  )}
                </DetailInfoImageList>
              }
            />
            <LabelFieldBlockDetailView
              label="タグ"
              child={
                <DetailInfoTagList>
                  {revision?.tags?.map(({ id, name }) => {
                    return (
                      <DetailInfoTagItem key={id}>
                        <p>{name}</p>
                      </DetailInfoTagItem>
                    );
                  }) || "-"}
                </DetailInfoTagList>
              }
            />
          </DetailInfoContainer>
        )}

        {remand_comments && (
          <DetailInfoContainer className="border-b-[3px] border-shade-400 pb-5 lg:border-[.125rem] lg:p-2.5">
            <DetailInfoSectionTitle>
              差し戻しコメント内容
            </DetailInfoSectionTitle>
            <LabelFieldBlockDetailView
              label="記事タイトル"
              child={
                <div className="whitespace-pre-line">
                  {comment_to_title || "-"}
                </div>
              }
            />
            <LabelFieldBlockDetailView
              label="記事カテゴリ"
              child={
                <div className="whitespace-pre-line">
                  {comment_to_body || "-"}
                </div>
              }
            />
            <LabelFieldBlockDetailView
              label="記事本文"
              child={
                <div className="whitespace-pre-line">
                  {comment_to_image || "-"}
                </div>
              }
            />
            <LabelFieldBlockDetailView
              label="記事画像"
              child={
                <div className="whitespace-pre-line">{comment || "-"}</div>
              }
            />
          </DetailInfoContainer>
        )}
        <DetailInfoButtonList className="mt-[1.875rem] lg:mt-0">
          <Button variant="secondary" asChild>
            <Link href="/admin/articles">戻る</Link>
          </Button>
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
            {/* EDIT */}
            <Button variant="secondary" asChild>
              <Link href={`/admin/articles/new?id=${id}`}>編集</Link>
            </Button>
            {/* SUBMIT APPROVAL */}
            {btns?.approve && <SubmitApproval />}
            {/* REMAND */}
            {btns?.remand && (
              <Button asChild>
                <Link href={`/admin/articles/${id}/remand`}>差し戻し</Link>
              </Button>
            )}
            <div className="flex justify-between gap-3 lg:flex-row lg:gap-5">
              {/* EDIT APPROVAL */}
              {btns?.editApproval && <EditApproval />}
              {/* DELETE APPROVAL */}
              {btns?.deleteApproval && <DeleteApproval />}
            </div>
          </div>
        </DetailInfoButtonList>
      </MainBlock>
    </AdminArticleDetailProvider>
  );
}
