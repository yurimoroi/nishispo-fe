"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { FormModalContributor } from "./form-modal-contributor";
import { useModalContributorStore } from "./lib";

export const ModalContributor = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unSub = useModalContributorStore.subscribe((state, prevState) => {
      setIsOpen(state.isOpen);
    });

    return unSub;
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="gap-0">
          <DialogHeader className="pb-5">
            <DialogTitle>記事投稿者申請</DialogTitle>
            {/* We are hiding this since the UI there is no description */}
            <DialogDescription
              className="font-xs hidden pb-5 text-black"
              asChild
            >
              <section>
                <p>Article Contribution</p>
              </section>
            </DialogDescription>
          </DialogHeader>
          <FormModalContributor />
        </DialogContent>
      </Dialog>
    </>
  );
};
