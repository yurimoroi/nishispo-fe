import { auth } from "@/app/auth";
import { HeaderDesktop, HeaderMobile } from "./header-main";
import Link from "next/link";

export const HeaderAdminActual = async () => {
  const session = await auth();

  return (
    <nav className="fixed z-30 w-full md:h-[3.8125rem] md:bg-shade-100">
      {!session ? (
        <div className="flex h-full items-center">
          <p className="mx-auto block w-full max-w-[80rem] px-5 py-5 text-sm text-dark-100 md:py-0 xl:px-0">
            ログイン
          </p>
        </div>
      ) : (
        <>
          <HeaderDesktop />
          <HeaderMobile />
        </>
      )}
    </nav>
  );
};
