import Image from "next/image";
import IconEyeOpen from "@public/icon-eye-open.svg";
import IconEyeClose from "@public/icon-eye-close.svg";
import { cn } from "@lib/utils";

export const FieldTogglePassword = ({
  isPasswordShow,
  handlePasswordShow,
  className = "'",
}: {
  isPasswordShow: boolean;
  handlePasswordShow: () => void;
  className?: string;
}) => {
  const iconSource = isPasswordShow ? IconEyeClose : IconEyeOpen;
  return (
    <Image
      className={cn(
        "absolute right-[1rem] top-1/2 -translate-y-1/2 transform cursor-pointer",
        className,
      )}
      src={iconSource}
      alt="icon password toggle"
      height={16}
      width={16}
      onClick={handlePasswordShow}
    />
  );
};
