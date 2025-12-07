import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type TwoColContainerProps = {
  children: React.ReactNode[];
  className?: string;
};

export const TwoColContainer = ({
  children,
  className = "",
}: TwoColContainerProps) => {
  return (
    <div
      className={cn("flex flex-col lg:flex-row lg:justify-between", className)}
    >
      {children}
    </div>
  );
};

type TwoColContainerItemProps = PropsWithChildren & {
  className?: string;
};

export const TwoColContainerItem = ({
  children,
  className,
}: TwoColContainerItemProps) => {
  return (
    <div
      className={cn(
        "two-col-container-item flex h-full w-full items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const TwoColContainerItemLogin = ({
  children,
  className,
}: TwoColContainerItemProps) => {
  return (
    <TwoColContainerItem
      className={cn(
        "block border-[.1875rem] px-5 py-5 lg:border-[.25rem]",
        className,
      )}
    >
      {children}
    </TwoColContainerItem>
  );
};