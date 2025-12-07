import { RegistrationMenu } from "@/components/registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン - ミヤスポ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default function RegistrationMenuPage() {
  return <RegistrationMenu />;
}
