import MainBlock from "@/components/feature/wrapper/main-block";
import { RegistrationConfirm } from "@/components/registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "会員情報入力確認 - ミヤスポ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default function RegistrationConfirmPage() {
  return (
    <MainBlock className="max-w-[55rem] pt-6 lg:pt-[2.5rem]">
      <h1 className="mb-5 mt-[.25rem] text-base font-bold lg:mt-2 lg:text-2xl lg:leading-[2.25rem]">
        登録情報の確認
      </h1>
      <RegistrationConfirm />
    </MainBlock>
  );
}
