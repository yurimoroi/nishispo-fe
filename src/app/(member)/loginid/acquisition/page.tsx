import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { FormLoginNotification } from "@/components/loginid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " ログインID通知 - ミヤスポ  ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default function Page() {
  return (
    <MainBlock className="mt-10 max-w-[40rem] xl:px-0">
      <PageTitle size="lg">ログインID通知</PageTitle>
      <FormLoginNotification />
    </MainBlock>
  );
}
