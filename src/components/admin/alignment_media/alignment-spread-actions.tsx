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
import { deleteAlignMedia } from "./lib/actions";

interface Props {
  alignMediaId: string;
}

export const AlignmentSpreadActions = ({ alignMediaId }: Props) => {
  const [isClicked, setClicked] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      setClicked(true);
      const response = await deleteAlignMedia(id);
      if (response?.errors) {
        toast({
          title: "Error",
          description: "Unable to Delete Media",
        });
      }
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
    <div className="flex gap-5 border-t border-shade-400 pt-[.625rem]">
      <Button asChild className="ml-auto">
        <Link
          href={`/admin/alignment_media/:メディアULID/edit/${alignMediaId}`}
        >
          編集
        </Link>
      </Button>
      <Button
        disabled={isClicked}
        onClick={() => handleOpenConfirmDeletion(alignMediaId)}
        className="bg-orange-100"
      >
        削除
      </Button>
    </div>
  );
};
