"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useModalUserEventsStore } from "./lib/store";
import { ModalEventsList } from "./modal-events-list";

export const ModalUserEvents = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unSub = useModalUserEventsStore.subscribe((state, prevState) => {
      setIsOpen(state.isOpen);
    });

    return unSub;
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="gap-0">
          <DialogHeader className="pb-5">
            <DialogTitle>アカウント参加種目一覧</DialogTitle>
            {/* We are hiding this since the UI there is no description */}
            <DialogDescription
              className="font-xs hidden pb-5 text-black"
              asChild
            >
              <section>
                <p>User Events</p>
              </section>
            </DialogDescription>
          </DialogHeader>
          <ModalEventsList />
        </DialogContent>
      </Dialog>
    </>
  );
};
