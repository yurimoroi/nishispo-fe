"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { setSocialLoginCookies, unlinkSocialAccount } from "./lib/actions";
import { SocialAction, SocialProvider } from "./lib/types";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type CommonProps = PropsWithChildren & { className?: string };
/**
 * A component that displays a list of social media items.
 *
 * This component expects children to be a list of `SocialItem` components.
 * It displays the items in a grid layout with two columns on large devices.
 */

export const SocialItems = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 lg:gap-5", className)}>
      {children}
    </div>
  );
};

export const SocialItem = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-2 border-b-[.0625rem] border-shade-400 py-5 lg:flex-row lg:border-[.25rem] lg:px-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SocialBlock = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex w-full items-center gap-2 lg:gap-5", className)}>
      {children}
    </div>
  );
};

export const SocialIconBlock = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("relative h-4 w-4 lg:h-8 lg:w-8", className)}>
      {children}
    </div>
  );
};

export const SocialIcon = ({
  children,
  className,
  imageSource,
}: CommonProps & {
  imageSource: string;
}) => {
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

export const SocialLabel = ({ children, className }: CommonProps) => {
  return (
    <p className={cn("text-base font-bold lg:text-xl", className)}>
      {children}
    </p>
  );
};

export const SocialBadge = ({
  children,
  className,
  isLinked,
}: CommonProps & {
  isLinked?: boolean;
}) => {
  return (
    <div
      className={cn(
        "bg-shade-400 px-2.5 py-1 text-sm font-bold text-black lg:px-2 lg:text-lg",
        className,
        {
          "border-[.0625rem] border-blue-100 bg-white text-blue-100": isLinked,
        },
      )}
    >
      {children}
    </div>
  );
};

export const SocialLinkLine = ({ children, className }: CommonProps) => {
  return (
    <Button
      onClick={() => {
        setSocialLoginCookies({
          action: SocialAction.Link,
          provider: SocialProvider.Line,
        });
        signIn("line");
      }}
    >
      連携する
    </Button>
  );
};

export const SocialLinkFacebook = ({ children, className }: CommonProps) => {
  return (
    <Button
      onClick={() => {
        setSocialLoginCookies({
          action: SocialAction.Link,
          provider: SocialProvider.Facebook,
        });
        signIn("facebook");
      }}
    >
      連携する
    </Button>
  );
};

export const SocialLinkTwitter = ({ children, className }: CommonProps) => {
  return (
    <Button
      onClick={() => {
        setSocialLoginCookies({
          action: SocialAction.Link,
          provider: SocialProvider.TwitterX,
        });
        signIn("twitter");
      }}
    >
      連携する
    </Button>
  );
};

export const SocialLinkInstagram = ({ children, className }: CommonProps) => {
  return (
    <Button
      className={cn("", className)}
      onClick={() => {
        setSocialLoginCookies({
          action: SocialAction.Link,
          provider: SocialProvider.Facebook,
        });
        signIn("instagram");
      }}
    >
      連携する
    </Button>
  );
};


export const UnlinkSocial = ({
  children,
  className,
  provider,
}: CommonProps & {
  provider: SocialProvider;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      disabled={isLoading}
      className={cn("", className)}
      onClick={async () => {
        try {
          const response = await unlinkSocialAccount(provider);

          if (!response?.success) {
            toast({
              title: "Error Unlinking Social Account",
              description: response?.message,
            });
          } else {
            router.refresh();
          }
        } catch (error) {
          toast({
            title: "Error Unlinking Social Account",
            description: String(error),
          });
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {children}
    </Button>
  );
};