import {
  LoginSection,
  TwoColContainer,
  TwoColContainerItemLogin,
} from "@/components/feature/layout";
import { auth } from "@/app/auth";
import Link from "next/link";
import { Metadata } from "next";
import { FormLogin } from "@/components/login/form-login";
import { redirect } from "next/navigation";
import {
  FacebookLogin,
  InstagramLogin,
  LineLogin,
  SocialLoginContainer,
  XLogin,
} from "@/components/login";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ログイン - ミヤスポ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default async function Page() {
  const session = await auth();

  if (session !== null) {
    redirect("/mypage");
  }

  return (
    <LoginSection>
      <TwoColContainer
        className={cn("m-auto grid grid-cols-1 gap-5 lg:grid-cols-2", {
          "lg:grid-cols-1": true, // TODO: remove this classname once the Social Section is re-implemented, so it will be two columns on desktop
        })}
      >
        <TwoColContainerItemLogin>
          <SectionTitle>ログインIDでログイン</SectionTitle>
          <FormLogin />
        </TwoColContainerItemLogin>

        {/* Disabling Social Login, since we do not have a domain yet, remove disabled once it is available, Instagram has different reason */}
        {/* Note: Disabling Instagram Login since Facebook deprecated as of this writing */}
        {/* Hiding the Social Section not for Phase 1 as per Seima's request*/}
        <TwoColContainerItemLogin
          className={cn("flex flex-col", {
            hidden: true, // TODO: remove this classname once the Social Section is re-implemented
          })}
        >
          <SectionTitle>SNS で新規登録の方</SectionTitle>
          <SocialLoginContainer>
            <LineLogin disabled />
            <XLogin disabled />
            <FacebookLogin disabled />
            <InstagramLogin disabled />
          </SocialLoginContainer>
        </TwoColContainerItemLogin>
      </TwoColContainer>

      <TwoColContainerItemLogin className="mb-5 mt-5 flex flex-col justify-between gap-3 lg:flex-row lg:gap-6">
        <SectionTitle className="mb-0 lg:mb-0">
          パスワードをお忘れの方
        </SectionTitle>

        <Link href="/password/reissue" className="text-base text-blue-100">
          パスワードを再発行する
        </Link>
      </TwoColContainerItemLogin>

      <TwoColContainerItemLogin className="mb-5 mt-5 flex flex-col justify-between gap-3 lg:flex-row lg:gap-6">
        <SectionTitle className="mb-0 lg:mb-0">
          ログインIDをお忘れの方
        </SectionTitle>

        <Link href="/loginid/acquisition" className="text-base text-blue-100">
          メールでログイン ID を通知する
        </Link>
      </TwoColContainerItemLogin>
    </LoginSection>
  );
}

const SectionTitle = ({ children, className }: CommonProps) => {
  return (
    <h2
      className={cn(
        "mb-6 text-center text-lg font-bold leading-normal lg:mb-5 lg:text-[1.375rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
};
