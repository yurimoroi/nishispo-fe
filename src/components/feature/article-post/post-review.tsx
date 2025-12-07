import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const PostReviewTitle = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "bg-orange-200 px-4 py-1.5 text-base text-white lg:max-w-max lg:px-2 lg:py-1 lg:text-xxs",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PostReviewContent = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "border-[.0625rem] border-orange-200 px-4 py-2 lg:border-[.125rem] lg:p-2 whitespace-pre-line",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PostReviewBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};
