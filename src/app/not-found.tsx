export const dynamic = "force-dynamic";

import MainBlock from "@/components/feature/wrapper/main-block";
import Link from "next/link";
import MemberLayout from "./(member)/layout";
import { headers } from "next/headers";
import DashboardLayout from "./(admin)/layout";

const GenericNotFound = ({
  redirectPath,
  label = "トップページへ",
}: {
  redirectPath: string;
  label?: string;
}) => {
  return (
    <MainBlock className="flex flex-col items-center justify-center gap-5 pt-6 lg:gap-[3.75rem] lg:py-[6.25rem]">
      <h1 className="block text-lg font-bold text-black lg:text-[1.375rem]">
        {"ご指定のページが見つかりませんでした"}
      </h1>
      <Link
        href={redirectPath}
        className="shadow-[0px_4px_4px_0px_#00000040] w-full rounded-sm bg-blue-100 px-3 py-[.375rem] text-center text-base text-white lg:w-auto"
      >
        {label}
      </Link>
    </MainBlock>
  );
};

export default async function NotFound() {
  const headersList = headers();
  const isAdminPath = headersList.get("current-url")?.includes("/admin");

  return !isAdminPath ? (
    <MemberLayout>
      <GenericNotFound redirectPath="/" />
    </MemberLayout>
  ) : (
    <DashboardLayout>
      <GenericNotFound redirectPath="/admin" />
    </DashboardLayout>
  );
} 
