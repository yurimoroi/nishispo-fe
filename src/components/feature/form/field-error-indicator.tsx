import { cn } from "@/lib/utils";
import IconWarningCircle from "@public/icon-warning-circle.svg";
import Image from "next/image";

type FieldErrorIndicatorProps = {
  className?: string;
};
export const FieldErrorIndicator = ({
  className,
}: FieldErrorIndicatorProps) => {
  return (
    <Image
      src={IconWarningCircle}
      alt="icon-warning-circle"
      width={12}
      height={12}
      className={cn(
        "absolute right-[1rem] top-1/2 -translate-y-1/2 transform",
        className,
      )}
    />
  );
};
