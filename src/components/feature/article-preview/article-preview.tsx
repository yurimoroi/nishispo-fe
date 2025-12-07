import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ArticlePreview = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const ArticlePreviewTopAction = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-[1.875rem] flex justify-center gap-5 lg:mb-2.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticlePreviewCategory = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div className={cn("mb-2.5 flex flex-wrap gap-2.5", className)}>
      {children}
    </div>
  );
};

export const ArticlePreviewCategoryBadge = ({
  children,
  className,
  backgroundColor,
}: CommonProps & {
  backgroundColor?: string;
}) => {
  return (
    <div
      style={{ backgroundColor }}
      className={cn(
        "max-w-content px-2 py-1 text-base font-bold text-white lg:text-lg",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticlePreviewHeader = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const ArticlePreviewTitle = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-2.5 text-2xl font-bold leading-normal lg:text-[1.625rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticlePreviewMetadata = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-2.5 border-t-[.0625rem] border-dark-400 pt-2.5 lg:mb-[1.875rem] lg:flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticlePreviewSocial = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex justify-center gap-2.5 lg:items-baseline lg:justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticlePreviewSocialItem = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[1.125rem] w-[3.75rem] items-center justify-center rounded-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticleHeaderImageGallery = ({
  children,
  className,
}: CommonProps) => {
  return <div className={cn("mt-10 pb-5 lg:pb-10", className)}>{children}</div>;
};

export const ArticleHeaderImageFeatured = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "relative mb-2.5 h-[9rem] w-full bg-shade-100 md:h-[16.25rem] lg:h-[26.25rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};
export const ArticleHeaderImageList = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div className={cn("flex flex-row flex-wrap gap-2.5", className)}>
      {children}
    </div>
  );
};
export const ArticleHeaderImageItem = ({
  children,
  className,
  isActive = false,
}: CommonProps & { isActive?: boolean }) => {
  return (
    <div
      className={cn("relative", className, {
        "border-[.125rem] border-dark-400": isActive,
      })}
    >
      {children}
    </div>
  );
};

export const ArticlePreviewBody = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mt-5 whitespace-pre-line border-b-[.0625rem] border-dark-400 pb-10 text-base leading-normal lg:text-lg",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticlePreviewTags = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-10 mt-2.5 flex flex-wrap gap-2 lg:mb-20 lg:gap-1",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticlePreviewTagItem = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[6.25rem] bg-blue-100 px-2 py-1 text-sm leading-normal text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ArticleHeaderBottomActions = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>{children}</div>
  );
};
