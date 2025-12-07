import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  size?: "sm" | "lg";
  className?: string;
};
export const PageTitle = ({ size, children, className }: CommonProps) => {
  return (
    <h1
      className={cn(
        "pb-5 font-bold",
        {
          "text-3xl sm:leading-[2.25rem] lg:text-[1.375rem]": !size,
          "text-lg sm:text-xl sm:leading-[1.875rem]": size === "sm",
          "text-lg lg:text-[1.625rem] lg:leading-[2.4375rem]": size === "lg",
        },
        className,
      )}
    >
      {children}
    </h1>
  );
};
