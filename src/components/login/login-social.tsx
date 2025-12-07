"use client";

import { PropsWithChildren } from "react";
import IconFacebookALt from "@public/icon-fb-alt.svg";
import IconXAlt from "@public/icon-x-twitter-alt.svg";
import IconLineAlt from "@public/icon-line-alt.svg";
import IconInstagramWhite from "@public/icon-instagram-white.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { setSocialLoginCookies } from "../social/lib/actions";
import { SocialAction, SocialProvider } from "../social/lib/types";

type CommonProps = PropsWithChildren & { className?: string };

export const SocialLoginContainer = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex h-full w-full max-w-60 flex-col justify-center gap-6 lg:gap-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

const LoginButton = ({
  children,
  className,
  handleClick,
  disabled = false,
}: CommonProps & {
  disabled?: boolean;
  handleClick?: () => void;
}) => {
  return (
    <Button
      type="button"
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center gap-3 rounded-[.25rem] px-2 py-2 text-xs font-bold text-white lg:text-base",
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

const SocialIconBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("relative h-4 w-4", className)}>{children}</div>;
};

const SocialIcon = ({
  children,
  className,
  imageSource,
}: CommonProps & { imageSource: string }) => {
  return (
    <Image
      src={imageSource}
      alt="social icon"
      fill
      style={{ objectFit: "contain" }}
      sizes="100%"
    />
  );
};

type CommonSocialButtonProps = PropsWithChildren & {
  className?: string;
  action?: SocialAction;
  redirectUrl?: string;
  disabled?: boolean;
};

export const LineLogin = ({
  action = SocialAction.Login,
  redirectUrl,
  disabled,
}: CommonSocialButtonProps) => {
  const handleClick = () => {
    setSocialLoginCookies({
      action,
      provider: SocialProvider.Line,
    });
    signIn("line", { callbackUrl: redirectUrl });
  };

  return (
    <LoginButton
      className="bg-green-100 hover:bg-green-100"
      handleClick={handleClick}
      disabled={disabled}
    >
      <SocialIconBlock>
        <SocialIcon imageSource={IconLineAlt} />
      </SocialIconBlock>
      LINEで新規登録
    </LoginButton>
  );
};

export const XLogin = ({
  action = SocialAction.Login,
  redirectUrl,
  disabled,
}: CommonSocialButtonProps) => {
  const handleClick = () => {
    setSocialLoginCookies({
      action,
      provider: SocialProvider.TwitterX,
    });
    signIn("twitter", { callbackUrl: redirectUrl });
  };

  return (
    <LoginButton
      className="bg-black hover:bg-black"
      handleClick={handleClick}
      disabled={disabled}
    >
      <SocialIconBlock>
        <SocialIcon imageSource={IconXAlt} />
      </SocialIconBlock>
      Xで新規登録
    </LoginButton>
  );
};

export const FacebookLogin = ({
  action = SocialAction.Login,
  redirectUrl,
  disabled,
}: CommonSocialButtonProps) => {
  const handleClick = () => {
    setSocialLoginCookies({
      action,
      provider: SocialProvider.Facebook,
    });
    signIn("facebook", { callbackUrl: redirectUrl });
  };

  return (
    <LoginButton
      className="bg-blue-400 hover:bg-blue-400"
      handleClick={handleClick}
      disabled={disabled}
    >
      <SocialIconBlock>
        <SocialIcon imageSource={IconFacebookALt} />
      </SocialIconBlock>
      Facebookで新規登録
    </LoginButton>
  );
};

export const InstagramLogin = ({
  action = SocialAction.Login,
  redirectUrl,
  disabled,
}: CommonSocialButtonProps) => {
  const handleClick = () => {
    setSocialLoginCookies({
      action,
      provider: SocialProvider.Instagram,
    });
    signIn("instagram", { callbackUrl: redirectUrl });
  };
  return (
    <LoginButton
      className="bg-instagram-gradient bg-center hover:bg-instagram-gradient"
      handleClick={handleClick}
      disabled={disabled}
    >
      <SocialIconBlock>
        <SocialIcon imageSource={IconInstagramWhite} />
      </SocialIconBlock>
      Instagramで新規登録
    </LoginButton>
  );
};
