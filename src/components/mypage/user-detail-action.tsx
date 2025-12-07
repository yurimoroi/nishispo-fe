"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import { affiliateWithdrawalRequest } from "./lib";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const AffiliateWithdrawalButton = ({
  children,
  className,
  userId,
}: CommonProps & {
  userId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await affiliateWithdrawalRequest(userId);
      if (!response?.success) {
        toast({
          title: "Withdrawal Request Warning",
          description: response?.message,
        });
      } else {
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Withdrawal Request Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      className={cn("bg-orange-100 hover:bg-orange-100", className)}
      disabled={isLoading}
      onClick={handleClick}
    >
      {children || "組織から退会する"}
    </Button>
  );
};
