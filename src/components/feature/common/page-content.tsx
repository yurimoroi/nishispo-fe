import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};
export const PageContent = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "min-h-[35rem] text-sm leading-7 sm:text-lg sm:leading-6 [&_p]:pb-[.625rem] sm:[&_p]:pb-[.75rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};
