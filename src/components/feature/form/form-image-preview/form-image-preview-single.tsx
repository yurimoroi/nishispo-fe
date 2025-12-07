import { cn } from "@/lib/utils";
import Image from "next/image";
import ImageProfilePlaceholder from "@public/placeholder/image-profile-preview.png";
import { PropsWithChildren } from "react";
type FormImagePreviewSingleProps = {
  imageSource: string;
  imageAlt: string;
  className?: string;
};
export const FormImagePreviewSingle = ({
  imageSource,
  imageAlt,
  className = "",
}: FormImagePreviewSingleProps) => {
  
  return (
    <div
      className={cn(
        "relative h-[7.5rem] w-[7.5rem] shrink-0 lg:h-[8.75rem] lg:w-[8.75rem]",
        className,
      )}
    >
      <Image
        src={imageSource || ImageProfilePlaceholder}
        alt={imageAlt}
        fill
        sizes="100"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

type FormImagePreviewSingleBlockProps = PropsWithChildren & {
  className?: string;
};
export const FormImagePreviewSingleBlock = ({
  children,
  className,
}: FormImagePreviewSingleBlockProps) => {
  return (
    <div
      className={cn("item-center flex gap-5 lg:flex-col lg:gap-5", className)}
    >
      {children}
    </div>
  );
};
