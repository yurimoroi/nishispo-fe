import { cn, replaceLocalhost } from "@/lib/utils";
import { PropsWithChildren } from "react";
import Image from "next/image";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const DetailInfoContainer = ({ children, className }: CommonProps) => {
  return <div className={className}>{children}</div>;
};

export const DetailInfoSectionTitle = ({
  children,
  className,
}: CommonProps) => {
  return (
    <h2 className={cn("mb-5 font-bold lg:mb-3", className)}>{children}</h2>
  );
};

export const DetailInfoPRBadge = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "inline-flex min-w-[2.0625rem] justify-center bg-orange-100 text-xxs font-bold !text-white lg:min-w-[38px] lg:text-base",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DetailInfoImageList = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex flex-wrap gap-3 lg:gap-2.5", className)}>
      {children}
    </div>
  );
};

export const DetailInfoImageItem = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "relative h-[7.5rem] w-[9.875rem] bg-shade-100 lg:h-[9.4375rem] lg:w-[9.4375rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DetailInfoImage = ({
  children,
  className,
  imageSource,
}: CommonProps & {
  imageSource: string;
}) => {
  const finalLink = replaceLocalhost(imageSource);
  return (
    <Image
      src={finalLink}
      alt="article image"
      fill
      sizes="100%"
      style={{ objectFit: "contain" }}
    />
  );
};

export const DetailInfoTagList = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex flex-wrap gap-3 lg:gap-2.5", className)}>
      {children}
    </div>
  );
};

export const DetailInfoTagItem = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "inline-flex rounded-[1.875rem] bg-blue-100 px-2.5 py-[.3125rem] !text-xxs leading-3 text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DetailInfoButtonList = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex flex-col lg:flex-row justify-between gap-3", className)}>{children}</div>
  );
};
