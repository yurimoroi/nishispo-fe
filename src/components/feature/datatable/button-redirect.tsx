"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { VariantProps } from "class-variance-authority";

type ButtonVariants = VariantProps<typeof Button>["variant"];

type ButtonRedirectProps = {
  label: string;
  redirectPath: string;
  className?: string;
  variant?: ButtonVariants;
};

export const ButtonRedirect = ({
  label = "",
  redirectPath = "",
  className = "",
  variant = "default",
}: ButtonRedirectProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(redirectPath);
  };
  return (
    <Button
      variant={variant}
      className={cn("text-base sm:text-lg", className)}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
