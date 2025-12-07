"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import IconMenu from "@public/icon-menu.svg";
import { handleLogout } from "@/components/login/lib/actions";

type MenuItem = {
  id: number;
  label: string;
  path: string;
  setIsMenuOpen?: (value: boolean) => void;
};

// Paths bases on the provided 010 sheet
const menuItems: MenuItem[] = [
  // Dashboard
  { id: 1, label: "ダッシュボード", path: "/admin" },
  // Secretariat Menu AF-10
  { id: 2, label: "事務局管理", path: "/admin/companies" },
  // Account Management AC-10
  { id: 3, label: "アカウント管理", path: "/admin/users" },
  // Article Management AD-10
  { id: 4, label: "記事管理", path: "/admin/articles" },
  // Organization Management AH-10
  { id: 5, label: "組織管理", path: "/admin/organizations" },
  // Event Management AH-30
  // { id: 6, label: "種目管理", path: "/admin/teams" }, // Commented out for now as per Seima's request
  // Advertising Management AI-10
  { id: 7, label: "連携他メディア管理", path: "/admin/alignment_media" },
  // Inquiry AK-10
  { id: 8, label: "お問い合わせ", path: "/admin/inquiries" },
  // News Notification Settings AN-10
  { id: 9, label: "お知らせ管理", path: "/admin/informations" },
];

type CommonProps = PropsWithChildren & {
  className?: string;
};

const HeaderItem = (item: MenuItem) => {
  return (
    <Link
      href={item.path}
      className="block py-5 text-sm text-dark-100 underline md:py-0"
      onClick={() => item.setIsMenuOpen?.(false)}
    >
      {item.label}
    </Link>
  );
};

const MobileActions = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex w-full justify-between bg-shade-100 p-5 lg:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};

const LogoutButton = () => {
  const handleClick = () => {
    handleLogout();
  };
  return (
    <Button
      variant="empty"
      className="h-auto p-0 text-sm text-blue-100 lg:text-sm lg:text-dark-100 lg:underline"
      onClick={handleClick}
    >
      ログアウト
    </Button>
  );
};

export const HeaderDesktop = () => {
  return (
    <div className="mx-auto hidden max-w-[80rem] lg:flex">
      <ul className="flex flex-col gap-10 p-5 lg:flex lg:flex-row lg:justify-between">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="border-b-[.0625rem] border-shade-500 md:border-0"
          >
            <HeaderItem {...item} />
          </li>
        ))}
      </ul>
      <div className="hidden flex-1 items-center justify-end px-5 md:flex">
        <LogoutButton />
      </div>
    </div>
  );
};

export const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="relative !bg-red">
      <MobileActions>
        <Button
          variant="empty"
          className="h-auto p-0 text-sm"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? (
            "戻る"
          ) : (
            <div className="relative h-3.5 w-5">
              <Image src={IconMenu} alt="menu" fill sizes="100%" />
            </div>
          )}
        </Button>
        <LogoutButton />
      </MobileActions>

      <ul
        className={cn(
          "absolute top-[3.125rem] z-30 mx-auto flex w-full flex-col bg-white p-5 md:hidden",
          {
            hidden: !isMenuOpen,
          },
        )}
      >
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="border-b-[.0625rem] border-shade-500 md:border-0"
          >
            <HeaderItem {...item} setIsMenuOpen={setIsMenuOpen} />
          </li>
        ))}
        <li className="hidden items-center md:flex">
          <LogoutButton />
        </li>
      </ul>
    </section>
  );
};
