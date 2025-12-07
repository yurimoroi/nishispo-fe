import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import IconUser from "@public/icon-user.svg";
import IconArrowRightBlue from "@public/icon-arrow-right-blue.svg";
import IconArrowRightWhite from "@public/icon-arrow-right-white.svg";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { auth } from "@/app/auth";

type RedirectPathType =
  | {
      path: string;
      label: string;
      button: "default" | "secondary";
      iconSource: string;
    }
  | undefined;

const REDIRECT_PATH = {
  login: {
    path: "/login",
    label: "ログイン",
    button: "default",
    iconSource: IconArrowRightWhite,
  },
  register: {
    path: "/register/menu",
    label: "会員登録",
    button: "secondary",
    iconSource: IconArrowRightBlue,
  },
};

const REDIRECT_PATH_LOGGED_IN: Record<string, RedirectPathType> = {
  mypage: {
    path: "/mypage",
    label: "マイページ",
    button: "default",
    iconSource: "",
  },
  contributor: {
    path: "/contributor",
    label: "記事を投稿",
    button: "default",
    iconSource: "",
  },
  // TODO Commenting out, this is for phase 2
  // groupware: {
  //   path: "/gw/:Organization ULID", // TODO for phase 2 - as per docs this depends on the organization
  //   label: "クラブ機能",
  // },
};

const ButtonIcon = ({ imageSource }: { imageSource: string }) => {
  return <Image src={imageSource} alt="arrow" width={16} height={16} />;
};

type ActionPathType = typeof REDIRECT_PATH_LOGGED_IN | typeof REDIRECT_PATH;

type ActionsPopoverProps = {
  data: Partial<typeof REDIRECT_PATH_LOGGED_IN> | ActionPathType;
};

const HeaderActionsPopover = async ({ data }: ActionsPopoverProps) => {
  const session = await auth();

  return (
    <Popover>
      <PopoverTrigger asChild className="lg:hidden">
        <div className="flex flex-col gap-2.5">
          <Button
            variant="outline"
            className="border-0 p-0 hover:bg-transparent"
          >
            <div className="relative block h-[2.375rem] w-[2.375rem] shrink-0 rounded-full">
              <Image src={IconUser} alt="search" fill sizes="100%" />
            </div>
          </Button>
          <p className="text-center font-open text-sm lg:hidden">
            {session ? "マイページ" : "ログイン/登録"}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="mt-2.5 flex w-[8.75rem] flex-col gap-[.3125rem] p-2 lg:hidden">
        {Object.values(data).map((action) => {
          if (action) {
            const { path, label, button, iconSource } = action;
            return (
              <Button
                key={path}
                size="sm"
                className={cn("text-[10px] leading-[15px] shadow-none", {
                  "border-[.0625rem]": button === "secondary",
                })}
                variant={button === "secondary" ? "secondary" : "default"}
                asChild
              >
                <Link href={path}>{label}</Link>
              </Button>
            );
          }
        })}
      </PopoverContent>
    </Popover>
  );
};

type HeaderActionsButtonProps = {
  data: Partial<typeof REDIRECT_PATH_LOGGED_IN> | ActionPathType;
};

const HeaderActionsButton = ({ data }: HeaderActionsButtonProps) => {
  return (
    <div className="hidden items-center gap-2.5 lg:flex">
      {Object.values(data).map((action) => {
        if (action) {
          const { path, label, button, iconSource } = action;
          return (
            <Button
              key={path}
              className={cn(
                "flex items-center rounded-[6.25rem] font-normal shadow-none",
                {
                  "border-[.0625rem]": button === "secondary",
                },
              )}
              variant={button === "secondary" ? "secondary" : "default"}
              asChild
            >
              <Link href={path} className="flex gap-2 text-xs lg:!text-base">
                {label}
                {iconSource && <ButtonIcon imageSource={iconSource} />}
              </Link>
            </Button>
          );
        } else {
          return (
            <div key="undefined-action" className="text-xs lg:!text-base">
              No action defined
            </div>
          );
        }
      })}
    </div>
  );
};

export const HeaderActionsLoggedOut = () => {
  return (
    <>
      <HeaderActionsButton data={REDIRECT_PATH} />
      <HeaderActionsPopover data={REDIRECT_PATH} />
    </>
  );
};

export const HeaderActionsLoggedIn = ({ session }: { session: Session }) => {
  const updatedRedirectPaths = {
    ...REDIRECT_PATH_LOGGED_IN,
  };

  if (!session.user.canContributeArticle) {
    delete updatedRedirectPaths.contributor;
  }

  return (
    <>
      <HeaderActionsButton data={updatedRedirectPaths} />
      <HeaderActionsPopover data={updatedRedirectPaths} />
    </>
  );
};
