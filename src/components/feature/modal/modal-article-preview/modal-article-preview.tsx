"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { closeModalArticlePreview, useModalArticlePreviewStore } from "./lib/store";
import { ArticlePreviewMain } from "../../article-preview";
export const ModalArticlePreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unSub = useModalArticlePreviewStore.subscribe((state, prevState) => {
      setIsOpen(state.isOpen);
    });

    return unSub;
  }, []);

  // Handle store when closing modal via close button
  useEffect(() => {
    if (!isOpen) {
      closeModalArticlePreview();
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-screen gap-0 overflow-y-auto">
          <DialogHeader className="pb-5">
            <DialogTitle>記事プレビュー</DialogTitle>
            {/* We are hiding this since the UI there is no description */}
            <DialogDescription
              className="font-xs hidden pb-5 text-black"
              asChild
            >
              <section>
                <p>Article Preview</p>
              </section>
            </DialogDescription>
          </DialogHeader>
          <ArticlePreviewMain />
        </DialogContent>
      </Dialog>
    </>
  );
};