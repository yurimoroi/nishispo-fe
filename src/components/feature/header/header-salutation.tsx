"use client";

import { PropsWithChildren } from "react";
import { TwoColContainer, TwoColContainerItem } from "../layout";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type CommonProps = PropsWithChildren & {
  className?: string;
};
export const HeaderSalutation = ({ children, className }: CommonProps) => {
  const pathname = usePathname();
  const { data: user } = useSession();

  if (
    !pathname.startsWith("/contributor") &&
    !pathname.startsWith("/contributors")
  ) {
    return null;
  }

  return (
    <div className={cn("bg-blue-300 px-6 py-5", className)}>
      <TwoColContainer className="mx-auto max-w-[80rem] justify-between gap-1.5">
        <TwoColContainerItem>
          <p className="text-base leading-normal text-white">
            ようこそ、{user?.user?.name || "-"}
          </p>
        </TwoColContainerItem>
        <TwoColContainerItem className="lg:justify-end">
          <p className="text-base leading-normal text-white">
            {user?.user?.company || "-"}
          </p>
        </TwoColContainerItem>
      </TwoColContainer>
    </div>
  );
};
