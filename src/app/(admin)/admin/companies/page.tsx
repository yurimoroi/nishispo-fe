import { auth } from "@/app/auth";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - メニュー",
};

const linkList = [
  { id: "1", label: "利用規約", url: "/admin/terms" },
  { id: "2", label: "サービス紹介", url: "/admin/companies/about" },
  {
    id: "3",
    label: "運営会社について",
    url: "/admin/companies/about/company",
  },
  {
    id: "4",
    label: "プライバシーポリシー",
    url: "/admin/companies/privacy",
  },
  {
    id: "5",
    label: "掲載内容について",
    url: "/admin/companies/about_report",
  },
  {
    id: "6",
    label: "広告掲載について",
    url: "/admin/companies/ad",
  },
  {
    id: "7",
    label: "記者・編集部員募集",
    url: "/admin/companies/work/reporter_editor",
  },
];

const buttonLinkList = [
  { id: "1", label: "アカウント管理", url: "/admin/users" },
  { id: "2", label: "記事管理", url: "/admin/articles" },
  {
    id: "3",
    label: "組織管理",
    url: "/admin/organizations",
  },
  // temporarily commented, will uncommen on next phase
  // {
  //   id: "4",
  //   label: "種目管理",
  //   url: "/admin/teams",
  // },
  {
    id: "5",
    label: "連携メディア管理",
    url: "/admin/alignment_media",
  },
  {
    id: "6",
    label: "天気管理",
    url: "/admin/weather",
  },
  {
    id: "7",
    label: "投稿数設定",
    url: "/admin/post_limit",
  },
  // temporarily removed for current phase.
  // {
  //   id: "8",
  //   label: "グループウェアお試し利用設定",
  //   url: "/admin/trial_setting",
  // },
];

export default async function Page() {
  const session = await auth();

  return (
    <MainBlock>
      <PageTitle className="text-center lg:text-left uppercase">
        {session?.user?.company}
      </PageTitle>
      <div className="overflow-x-auto lg:overflow-hidden">
        <ul className="flex min-w-max gap-5 lg:gap-[3.7%]">
          {linkList.map((link) => (
            <li key={link.id} className="flex-shrink-0 pb-5">
              <Link
                className="text-xs text-blue-100 underline hover:opacity-70 md:text-lg"
                href={link.url}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex-wrap gap-[2%] lg:flex">
        {buttonLinkList.map((link) => (
          <li key={link.id} className="pb-5">
            <Button className="block w-full text-center" asChild>
              <Link href={link.url}>{link.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </MainBlock>
  );
}
