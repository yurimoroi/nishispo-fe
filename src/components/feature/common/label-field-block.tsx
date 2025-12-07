// This component is found as label on forms and detail view pages.

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";
import Image, { StaticImageData } from "next/image";

type CommonProps = PropsWithChildren & {
  variant?: "default" | "alternate" | "empty" | "clean";
  className?: string;
};

export const FieldLabelSeparator = ({ className }: CommonProps) => {
  return <div className={cn("pb-8 lg:pb-5", className)}></div>;
};

const labelBlockVariants = cva(
  "mb-3 flex flex-wrap gap-2.5 items-center shrink-0 bg-blue-300 px-4 py-2 text-sm font-medium text-white lg:mb-0 lg:font-normal",
  {
    variants: {
      variant: {
        default: "lg:w-[12.5rem]",
        clean: "p-0 bg-transparent",
        alternate:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        empty: "lg:w-[12.5rem] bg-transparent hover:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const LabelBlock = ({
  children,
  className,
  variant = "default",
}: CommonProps) => {
  return (
    <div className={cn(labelBlockVariants({ variant, className }))}>
      {children}
    </div>
  );
};

export const LabelBadge = ({
  children,
  className,
  message = "必須",
}: CommonProps & {
  message?: string;
}) => {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center rounded-[.1875rem] bg-blue-100 px-2 font-noto text-xxs font-bold leading-normal text-white lg:text-xxs",
        className,
      )}
    >
      {children || message}
    </div>
  );
};

export const FieldBlock = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex-grow text-sm lg:px-5 lg:py-2.5", className)}>
      {children}
    </div>
  );
};

type LabelFieldBlockProps = PropsWithChildren & {
  className?: string;
  variant?: "default" | "compact";
};

const labelFieldBlockVariants = cva(
  "mb-2 flex flex-col font-open lg:mb-5 lg:flex-row",
  {
    variants: {
      variant: {
        default: "",
        compact: "lg:mb-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const LabelFieldBlock = ({
  children,
  className,
  variant = "default",
}: LabelFieldBlockProps) => {
  return (
    <div className={cn(labelFieldBlockVariants({ variant }), className)}>
      {children}
    </div>
  );
};

type LabelFieldBlockDetailViewProps = {
  label: string | React.ReactNode;
  value?: string;
  child?: React.ReactNode;
  className?: string;
  labelClassName?: string;
};
export const LabelFieldBlockDetailView = ({
  label,
  value,
  child,
  className,
  labelClassName,
}: LabelFieldBlockDetailViewProps) => {
  return (
    <LabelFieldBlock className={cn("mb-5 lg:mb-0.5", className)}>
      <LabelBlock
        className={cn("text-base text-white lg:text-lg", labelClassName)}
      >
        {label}
      </LabelBlock>
      <FieldBlock className="px-3 text-base lg:text-lg">
        {child ? child : value}
      </FieldBlock>
    </LabelFieldBlock>
  );
};

export const LabelHint = ({ children, className }: CommonProps) => {
  return (
    <span
      className={cn(
        "block pb-2.5 font-noto text-[.75rem] leading-[1.125rem] text-dark-300 lg:text-xxs",
        className,
      )}
    >
      {children}
    </span>
  );
};

type LabelFieldBlockDetailViewImageProps = {
  label: string;
  imageSrc?: string | StaticImageData;
  className?: string;
};
export const LabelFieldBlockDetailViewImage = ({
  label,
  imageSrc = "",
  className,
}: LabelFieldBlockDetailViewImageProps) => {
  return (
    <LabelFieldBlock className={cn("mb-5 lg:mb-0.5", className)}>
      <LabelBlock className="text-white">{label} </LabelBlock>
      <FieldBlock className="px-3 text-base">
        <div
          className={cn("relative h-[5.625rem] w-[12.5rem] overflow-hidden")}
        >
          <Image
            src={imageSrc}
            alt="announcement image"
            fill
            style={{ objectFit: "cover" }}
            sizes="auto"
            unoptimized // Disable image optimization
          />
        </div>
      </FieldBlock>
    </LabelFieldBlock>
  );
};

// This is composite component and might not handle all UI cases
export const LabelWithBadge = ({ label }: { label: string }) => {
  return (
    <LabelBlock>
      <LabelFieldBlock>
        {label}
        <LabelBadge />
      </LabelFieldBlock>
    </LabelBlock>
  );
};

// This is composite component and might not handle all UI cases
export const LabelWithBadgeTransparent = ({
  label,
  labelProps,
}: {
  label: string;
  labelProps?: { className?: string };
}) => {
  return (
    <LabelBlock variant="clean" className="mb-0">
      <span
        className={cn(
          "font-noto text-base font-medium text-dark-200 lg:text-lg",
          labelProps?.className,
        )}
      >
        {label}
      </span>
      <LabelBadge />
    </LabelBlock>
  );
};

// This is composite component and might not handle all UI cases
export const LabelWithHint = ({
  label,
  hint,
}: {
  label: string;
  hint: string;
}) => {
  return (
    <span className="flex font-bold lg:flex-col">
      {label} <span className="text-xxs">{hint}</span>
    </span>
  );
};
