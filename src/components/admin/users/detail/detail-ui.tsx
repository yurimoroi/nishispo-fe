import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const OrgBlockItems = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>{children}</div>
  );
};

export const OrgBlockItem = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex items-center border-[.125rem] border-shade-400 p-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const OrgBlockHeader = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const OrgBlockLabel = ({ children, className }: CommonProps) => {
  return <p className={cn("font-bold", className)}>{children}</p>;
};
