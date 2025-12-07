"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";

type ModalOrgListProps = PropsWithChildren & {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const ModalOrgList = ({
  children,
  isModalOpen,
  setIsModalOpen,
}: ModalOrgListProps) => {
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="gap-0">
          <DialogHeader className="pb-5">
            <DialogTitle>所属スポーツクラブ選択</DialogTitle>
            {/* We are hiding this since the UI there is no description */}
            <DialogDescription
              className="font-xs hidden pb-5 text-black"
              asChild
            >
              <section>
                <p>Organization Selection List</p>
              </section>
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};
