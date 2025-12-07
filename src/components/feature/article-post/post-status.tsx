import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const PostStatusTitle = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-3 text-xs lg:mb-2 lg:text-base lg:text-dark-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PostStatusTag = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-2 max-w-max bg-orange-100 px-3 py-1.5 text-base text-white lg:mb-2.5 lg:px-4 lg:py-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PostStatusReminder = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("text-xs text-shade-600", className)}>{children}</div>
  );
};

export const PostStatusBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("mb-5 lg:mb-10", className)}>{children}</div>;
};
