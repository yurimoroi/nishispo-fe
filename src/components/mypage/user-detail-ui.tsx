import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import Image from "next/image";
import ImageNoPhotoSmallLandscape from "@public/placeholder/image-no-photo-small-landscape.png";
type CommonProps = PropsWithChildren & { className?: string };

export const SectionHeader = ({ children, className }: CommonProps) => {
  return (
    <h2
      className={cn(
        "pb-5 text-lg font-bold lg:text-[1.375rem] lg:leading-[2.0625rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const SectionBlock = ({ children, className }: CommonProps) => {
  return (
    <section
      className={cn(
        "border-b-[1px] border-shade-400 pb-5 pt-5 lg:border-[4px] lg:p-5",
        className,
      )}
    >
      {children}
    </section>
  );
};

// TODO Update code when Membership feature is ready
export const MembershipDetail = ({ children, className }: CommonProps) => {
  return (
    <div className="flex items-center gap-2.5 font-bold text-dark-100">
      <span className="font-normal">閲覧用会員</span>
      <div className="flex items-center gap-2.5 bg-shade-400 px-2 py-1 text-[12px] leading-[18px]">
        お試し利用中
        <span className="rounded-[8px] bg-shade-100 p-[2px] px-2">
          2024/10/20 18:00 まで
        </span>
      </div>
    </div>
  );
};

export const AffiliationBlock = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex justify-between gap-5 border-[.25rem] border-shade-400 text-dark-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const AffiliationInfo = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex items-center gap-5", className)}>{children}</div>
  );
};

export const AffiliationImage = ({
  children,
  className,
  imageSource,
  affiliationLabel = "",
}: CommonProps & { imageSource: string; affiliationLabel?: string }) => {
  return (
    <div
      className={cn("relative h-20 w-20 lg:h-[70px] lg:w-[140px]", className)}
    >
      <Image
        src={imageSource || ImageNoPhotoSmallLandscape}
        alt={`${affiliationLabel} logo`}
        fill
        sizes="100%"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export const AffiliationAction = ({ children, className }: CommonProps) => {
  return <div className={cn("inline-flex gap-2.5", className)}>{children}</div>;
};

export const AffiliationTag = ({
  children,
  className,
  label,
}: CommonProps & { label: string }) => {
  return (
    <div
      className={cn(
        "flex items-center bg-shade-400 px-[5px] py-[2px] text-[8px] font-bold leading-[12px] text-dark-100 lg:px-2 lg:py-1 lg:text-base",
        className,
      )}
    >
      {label}
    </div>
  );
};
