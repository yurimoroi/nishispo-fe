"use client";

import { toast } from "@/hooks/use-toast";
import {
  approveContributor,
  approveUserToOrganization,
  approveUserWithdrawFromOrganization,
} from "./lib/actions";
import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ApproveToContributorButton = ({
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
      const response = await approveContributor(userId);

      if (!response?.success) {
        toast({
          title: "Contributor Approval Warning",
          description: response?.message,
        });
      } else {
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Contributor Approval Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button type="button" disabled={isLoading} onClick={handleClick}>
      承認する
    </Button>
  );
};

export const ApproveUserToOrganizationButton = ({
  userId,
  organizationId,
}: CommonProps & {
  userId: string;
  organizationId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await approveUserToOrganization(userId, organizationId);
      if (!response?.success) {
        toast({
          title: "Contributor Approval Warning",
          description: response?.message,
        });
      } else {
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Contributor Approval Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button type="button" disabled={isLoading} onClick={handleClick}>
      組織加入承認
    </Button>
  );
};

export const ApproveUserWithdrawFromOrganizationButton = ({
  children,
  className,
  userId,
  organizationId,
}: CommonProps & {
  userId: string;
  organizationId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await approveUserWithdrawFromOrganization(
        userId,
        organizationId,
      );

      if (!response?.success) {
        toast({
          title: "Contributor Withdraw Approval Warning",
          description: response?.message,
        });
      } else {
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Contributor Withdraw Approval Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button type="button" disabled={isLoading} onClick={handleClick}>
      {children || "組織の承認 撤退"}
    </Button>
  );
};