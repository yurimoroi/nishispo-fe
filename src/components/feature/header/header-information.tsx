import { cn } from "@/lib/utils";
import Link from "next/link";

export const HeaderInformation = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/informations"
      className={cn(
        "text-sm leading-[1.125rem] text-blue-200 lg:text-base lg:leading-normal",
        className,
      )}
    >
      お知らせ
    </Link>
  );
};
