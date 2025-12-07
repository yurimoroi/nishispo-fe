import React from "react";
import { cn } from "@/lib/utils";

type MainBlockProps = {
  size?: "sm" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
};

export default function MainBlock({
  size,
  className = "",
  children,
}: MainBlockProps) {
  return (
    <div
      className={cn(
        "m-auto px-6 sm:px-8",
        {
          "max-w-[84rem]": !size,
          "max-w-[64rem]": size === "sm",
          "max-w-[120rem]": size === "lg",
          "max-w-[97.75rem]": size === "xl",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
