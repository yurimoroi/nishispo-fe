import { HeaderSearch } from "./header-search";
import { HeaderLogo } from "./header-logo";
import {
  HeaderActionsLoggedOut,
  HeaderActionsLoggedIn,
} from "./header-actions";
import { HeaderMetadata } from "./header-metadata";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { HeaderCategories } from "./header-categories";
import { auth } from "@/app/auth";
import { HeaderInformation } from "./header-information";
import { HeaderSalutation } from "./header-salutation";
import { getWeatherInfo } from "@/components/admin/weather";
type LayoutProps = PropsWithChildren & { className?: string };

const HeaderRight = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn("flex items-center gap-2.5 lg:gap-5", className)}>
      {children}
    </div>
  );
};

export const Header = async () => {
  const session = await auth();

  const [getWeatherInfoResponse] = await Promise.all([getWeatherInfo()]);

  return (
    <>
      <header className="mx-auto flex max-w-[1280px] justify-between px-6 py-[18px] lg:mx-auto xl:py-8">
        <div>
          <HeaderLogo />
        </div>
        <HeaderRight>
          <HeaderInformation className="hidden lg:flex" />
          <div className="flex gap-2.5">
            {session === null || session?.user.isSecretariat === true ? (
              <HeaderActionsLoggedOut />
            ) : (
              <>
                <HeaderActionsLoggedIn session={session} />
              </>
            )}
            <HeaderSearch />
          </div>
          <HeaderMetadata
            weatherInfo={getWeatherInfoResponse?.data}
            className="hidden lg:flex"
          />
        </HeaderRight>
      </header>
      <div className="flex justify-between border-t-[1px] border-dashed border-shade-400 py-1 lg:hidden">
        <HeaderMetadata
          weatherInfo={getWeatherInfoResponse?.data}
          className="flex justify-end px-6 pb-3 lg:hidden"
        />
        <HeaderInformation className="flex justify-end px-6 pb-3 text-sm lg:hidden" />
      </div>
      <div className="mx-6"></div>

      <HeaderCategories />
      {session && <HeaderSalutation />}
    </>
  );
};
