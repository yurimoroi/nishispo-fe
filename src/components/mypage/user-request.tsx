"use client";

import { cn } from "@/lib/utils";
import { Button } from "@components/ui/button";
import { PropsWithChildren, useEffect } from "react";
import { openModalMessage } from "../feature/modal/modal-message";
import { handleLogout } from "../login/lib/actions";
import {
  openModalContributor,
  useModalContributorStore,
} from "../feature/modal/modal-contributor";
import { useRouter } from "next/navigation";

type CommonProps = PropsWithChildren & {
  className?: string;
};

// TODO Membership feature is not yet implemented - update this page when it is ready
// Show CP-40, then an BE email will be sent, if email sent show CP-30
export const MembershipToggle = ({ children, className }: CommonProps) => {
  const handleClick = () => {
    openModalMessage({
      title: "Updating Membership",
      message:
        "Membership feature is not yet implemented - update this page when it is ready",
    });
  };

  return (
    <div className={cn("", className)}>
      <Button onClick={handleClick}>通常会員になる</Button>
    </div>
  );
};

export const ApplyAsAuthor = ({ children, className }: CommonProps) => {
  const router = useRouter();
  const handleClick = () => {
    openModalContributor();
  };
  //Handle on close
  useEffect(() => {
    const unSub = useModalContributorStore.subscribe((state, prevState) => {
      if (prevState.isOpen && !state.isOpen) {
        router.refresh();
      }
    });
    return unSub;
  }, [router]);

  return (
    <div className={cn("", className)}>
      <Button onClick={handleClick}>記事投稿者として申請を行う</Button>
    </div>
  );
};

export const LogoutButton = ({ children, className }: CommonProps) => {
  const handleClick = () => {
    handleLogout();
  };
  return (
    <Button
      variant="empty"
      className={cn("text-blue-100 p-0 underline", className)}
      onClick={handleClick}
    >
      ログアウト
    </Button>
  );
};
