import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { FormResetPassword } from "@/components/password";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: " パスワード再設定 - ミヤスポ ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
  const email = searchParams.email;
  const token = searchParams.token;

  if (!email || !token) notFound();

  return (
    <MainBlock className="mt-10 max-w-[40rem] xl:px-0">
      <PageTitle size="lg">パスワード再設定</PageTitle>
      <FormResetPassword />
    </MainBlock>
  );
}
