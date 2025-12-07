import { getDashboardData } from "@/components/admin/dashboard/lib";
import LinkBlock from "@/components/admin/dashboard/link-block";
import { AdminUsersQueryKeys } from "@/components/admin/users/lib/helper";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";

type LinkItem = { id: string; url: string; label: string; num: number };
type LinksBlocks = LinkItem[];

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - ダッシュボード",
};

export default async function Page() {
  const [dashboardDataResponse] = await Promise.all([getDashboardData()]);
  const { data } = dashboardDataResponse;

  const linkItems: LinksBlocks = [
    {
      id: "0",
      url: `/admin/users?${AdminUsersQueryKeys.ApprovalStatus}=2`,
      label: "記事投稿者承認待ち数",
      num: data?.contributor_waiting_approval,
    },
    {
      id: "1",
      url: `/admin/articles?${AdminUsersQueryKeys.GenericStatus}=1,4`,
      label: "記事公開承認待ち数",
      num: data?.article_waiting_approval,
    },
    {
      id: "2",
      url: `/admin/articles?${AdminUsersQueryKeys.GenericStatus}=4`,
      label: "記事編集承認待ち数",
      num: data?.article_waiting_edit_approval,
    },
    {
      id: "3",
      url: `/admin/articles?${AdminUsersQueryKeys.GenericStatus}=5`,
      label: "記事削除承認待ち数",
      num: data?.article_waiting_delete_approval,
    },

    // This is not included in Phase 1 so it should be hidden for now.
    // {
    //   id: "4",
    //   url: "/admin/teams",
    //   label: "種目参加承認待ち数",
    //   num: data?.event_participation_approval,
    // },
    // {
    //   id: "5",
    //   url: "/admin/users",
    //   label: "種目脱退承認待ち数",
    //   num: data?.withdrawal_request_pending_approval,
    // },
    // {
    //   id: "6",
    //   url: "/admin/users",
    //   label: "アップグレード承認待ち数",
    //   num: data?.upgrade_approval,
    // },
    // {
    //   id: "7",
    //   url: "/admin/users",
    //   label: "ダウングレード承認待ち数",
    //   num: data?.downgrade,
    // },
    // {
    //   id: "8",
    //   url: "/admin/teams",
    //   label: "グループウェア利用権未作成種目数",
    //   num: data?.club_payment_type_count,
    // },
    // {
    //   id: "9",
    //   url: "/admin/teams",
    //   label: "グループウェア利用権未入金種目数",
    //   num: data?.club_usage_rights,
    // },
  ];

  return (
    <MainBlock>
      <PageTitle>ダッシュボード</PageTitle>
      <LinkBlock linkItems={linkItems} />
    </MainBlock>
  );
}
