import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const PostButtonBlock = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex flex-col lg:flex-row lg:justify-center gap-5", className)}>{children}</div>
  );
};
