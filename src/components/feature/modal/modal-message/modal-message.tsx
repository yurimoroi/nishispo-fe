"use client";

import {
  Dialog,
DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import {
  closeModalMessage,
  ModalMessageVariant,
  openModalMessage,
  useModalMessageStore,
} from "./lib/store";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

type ModalActionProps = {
  isConfirmVariant: boolean;
  handleModalClose: () => void;
  isLoading: boolean;
};

const ModalAction = ({
  isConfirmVariant,
  handleModalClose,
  isLoading,
}: ModalActionProps) => {
   const confirmText = useModalMessageStore.getState().confirmText;
   const cancelText = useModalMessageStore.getState().cancelText;

   if (isConfirmVariant) {
     return (
       <div className="mt-5 flex gap-5">
         <Button
           type="button"
           size="sm"
           variant="default"
           className="inline-flex max-w-min"
           onClick={handleModalClose}
           disabled={isLoading}
         >
           {confirmText}
         </Button>
         <Button
           type="button"
           size="sm"
           variant="secondary"
           className="inline-flex max-w-min"
           onClick={closeModalMessage}
           disabled={isLoading}
         >
           {cancelText}
         </Button>
       </div>
     );
   }

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      className="!mt-5 inline-flex max-w-min"
      onClick={handleModalClose}
      disabled={isLoading}
    >
      閉じる
    </Button>
  );
};

export const ModalMessage = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const title = useModalMessageStore.getState().title;
  const message = useModalMessageStore.getState().message;
  const isConfirmVariant =
    ModalMessageVariant.Confirm === useModalMessageStore.getState().variant;

  useEffect(() => {
    const unSub = useModalMessageStore.subscribe((state, prevState) => {
      setIsOpen(state.isOpen);
    });

    return unSub;
  }, []);

  useEffect(() => {
    if (searchParams.get("linked")) {
      openModalMessage({
        title: "Social Account Already Linked",
        message: "Social Account Already Linked, we have logged in for you.",
      });
    }
  }, [searchParams]);

  const handleModalClose = async () => {
    const handler = useModalMessageStore.getState().handler;

    // If handler is provided (like redirects or delete operations)
    if (handler) {
      setIsLoading(true);
      try {
        await handler();
      } finally {
        setIsLoading(false);
      }
    }

    closeModalMessage();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="gap-0">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="pb-5">{message}</DialogDescription>
          </DialogHeader>
          {/* Buttons */}
          <div className="flex justify-center">
            <ModalAction
              isConfirmVariant={isConfirmVariant}
              handleModalClose={handleModalClose}
              isLoading={isLoading}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
