"use client";

import { cn } from "@/lib/utils";

type BlockHeaderSectionProps = {
  headerTitle?: string;
  className?: string;
};

export const BlockHeaderSectionTitle = ({
  headerTitle = "",
  className = "",
}: BlockHeaderSectionProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <span className="text-base font-bold lg:text-xl">{headerTitle}</span>
    </div>
  );
};
