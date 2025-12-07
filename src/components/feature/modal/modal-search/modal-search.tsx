"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import IconSearch from "@public/icon-search.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ModalSearchForm } from "./modal-search-form";

export const ModalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex flex-col gap-2.5">
        <Button
          className="relative h-[2.375rem] w-[2.375rem] rounded-full shadow-none"
          onClick={() => setIsOpen(true)}
        >
          <Image src={IconSearch} alt="search" fill sizes="100%" />
        </Button>

        <p className="text-center font-open text-sm lg:hidden">検索</p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>記事の検索</DialogTitle>
            <DialogDescription></DialogDescription>
            <ModalSearchForm handleModalClose={handleModalClose} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
