import {
  TwoColContainer,
  TwoColContainerItemLogin,
  LoginSection,
} from "@feature/layout";
import { Button } from "../ui/button";
import Link from "next/link";
import { FormMenu } from "./form-menu";
import {
  FacebookLogin,
  InstagramLogin,
  LineLogin,
  SocialLoginContainer,
  XLogin,
} from "../login";
import { SocialAction } from "../social/lib/types";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const RegistrationMenu = () => {
  return (
    <LoginSection>
      <h1 className="mb-5 text-lg font-bold leading-normal lg:text-[1.375rem] lg:leading-[2.0625rem]">
        会員登録方法の選択
      </h1>

      <TwoColContainer
        className={cn("m-auto grid grid-cols-1 gap-5 lg:grid-cols-2", {
          "lg:grid-cols-1": true, // TODO: remove this classname once the Social Section is re-implemented, so it will be two columns on desktop
        })}
      >
        <TwoColContainerItemLogin>
          <RegistrationMenuSectionTitle>
            ログイン ID で登録される方
          </RegistrationMenuSectionTitle>
          <FormMenu />
        </TwoColContainerItemLogin>

        {/* Disabling Social Login, since we do not have a domain yet, remove disabled once it is available, Instagram has different reason */}
        {/* Hiding the Social Section not for Phase 1 as per Seima's request*/}
        <TwoColContainerItemLogin
          className={cn("flex flex-col", {
            hidden: true, // TODO: remove this classname once the Social Section is re-implemented
          })}
        >
          {/* <RegistrationMenuSectionTitle>
            SNS で新規登録の方
          </RegistrationMenuSectionTitle>
          <SocialLoginContainer>
            <LineLogin
              action={SocialAction.Register}
              redirectUrl="/"
              disabled
            />
            <XLogin action={SocialAction.Register} redirectUrl="/" disabled />
            <FacebookLogin
              action={SocialAction.Register}
              redirectUrl="/"
              disabled
            />
            <InstagramLogin
              action={SocialAction.Register}
              redirectUrl="/"
              disabled
            />
          </SocialLoginContainer> */}
        </TwoColContainerItemLogin>
      </TwoColContainer>

      <TwoColContainerItemLogin className="mb-10 mt-5 flex flex-col justify-between gap-6 lg:flex-row">
        <RegistrationMenuSectionTitle className="mb-0 lg:mb-0">
          すでにご登録済みの方
        </RegistrationMenuSectionTitle>
        <Button asChild>
          <Link href="/login">ログインする</Link>
        </Button>
      </TwoColContainerItemLogin>
    </LoginSection>
  );
};

const RegistrationMenuSectionTitle = ({ className, children }: CommonProps) => {
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
