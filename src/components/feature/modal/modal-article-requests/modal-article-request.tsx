"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { FormArticleRequest } from "./form-article-request";
import { useModalArticleRequestStore } from "./lib";

export const ModalArticleRequests = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unSub = useModalArticleRequestStore.subscribe((state, prevState) => {
      setIsOpen(state.isOpen);
    });

    return unSub;
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="gap-0">
          <DialogHeader className="pb-5">
            <DialogTitle>記事変更依頼</DialogTitle>
            {/* We are hiding this since the UI there is no description */}
            <DialogDescription
              className="font-xs hidden pb-5 text-black"
              asChild
            >
              <section>
                <p>Article Request</p>
              </section>
            </DialogDescription>
          </DialogHeader>
          <FormArticleRequest isModal={true}/>
        </DialogContent>
      </Dialog>
    </>
  );
};
