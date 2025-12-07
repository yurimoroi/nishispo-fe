import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type LayoutContainerProps = PropsWithChildren & {
  className?: string;
};

export const LayoutContainer = ({
  children,
  className,
}: LayoutContainerProps) => {
  return (
    <section className={cn(`mx-auto max-w-40`, className)}>{children}</section>
  );
};

export const LoginSection = ({ children, className }: LayoutContainerProps) => {
  return (
    <section
      className={cn(
        `mx-auto mt-6 max-w-[55rem] px-6 lg:mt-10 lg:px-0`,
        className,
      )}
    >
      {children}
    </section>
  );
};
