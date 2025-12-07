"use client";

import {
  ModalMessageVariant,
  openModalMessage,
} from "@/components/feature/modal/modal-message";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteOrganization } from "./lib/actions";

interface Props {
  orgId: string;
  orgName: string;
}

export const OrganizationSpreadActions = ({ orgId, orgName }: Props) => {
  const [isClicked, setClicked] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      setClicked(true);
      const response = await deleteOrganization(id);
      setClicked(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "Error during saving the content",
        description: errorMessage,
      });
      setClicked(false);
    }
  };

  const handleClosePopup = (id: string) => {
    handleDelete(id);
    router.refresh();
  };

  const handleOpenConfirmDeletion = (id: string) => {
    const title = "警告";
    const message = " 一度削除されると復元はできませんがよろしいですか？";

    openModalMessage({
      title,
      message,
      variant: ModalMessageVariant.Confirm,
      handler: () => handleClosePopup(id),
    });
  };

  return (
    <div className="flex gap-5">
      <Button className="text-base" asChild>
        <Link href={`/admin/teams?filter[org]=${orgId}&orgl=${orgName}`}>
          種目
        </Link>
      </Button>
      <Button asChild className="ml-auto text-base">
        <Link href={`/admin/organizations/${orgId}/edit`}>編集</Link>
      </Button>
      <Button
        disabled={isClicked}
        onClick={() => handleOpenConfirmDeletion(orgId)}
        className="bg-orange-100 text-base"
      >
        削除
      </Button>
    </div>
  );
};
