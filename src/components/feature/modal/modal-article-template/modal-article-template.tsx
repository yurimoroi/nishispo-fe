"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  closeModalArticleTemplate,
  ModalArticleTemplateResponse,
  openModalArticleTemplateAsync,
  setModalArticleTemplateAndClose,
  useModalArticleTemplateStore,
} from "./lib";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormArticleTemplate } from "./form-article-template";

export const ModalArticleTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle changes on or when is modal toggled
  useEffect(() => {
    const unSub = useModalArticleTemplateStore.subscribe((state) => {
      setIsOpen(state.isOpen);
    });

    return unSub;
  }, []);

  // Handle closing modal via close button
  useEffect(() => {
    if (!isOpen) {
      closeModalArticleTemplate();
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-screen max-w-[98%] gap-0 overflow-y-auto px-2.5 py-10 lg:!right-0 lg:!top-0 lg:w-auto lg:!translate-x-0 lg:!translate-y-0 lg:px-[6.25rem] lg:py-[3.75rem] [&>button:last-child]:hidden">
          <DialogHeader className="pb-5">
            {/* We are hiding this since the UI there is no title and description */}
            <DialogTitle className="hidden">Article Template</DialogTitle>
            <DialogDescription
              className="font-xs hidden pb-5 text-black"
              asChild
            >
              <section>
                <p>Article Preview</p>
              </section>
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setModalArticleTemplateAndClose(null);
            }}
            className="mb-[2rem] max-w-min"
          >
            戻る
          </Button>
          <FormArticleTemplate />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const ModalArticleTemplateTrigger = ({
  className,
  children,
  handleResponse,
}: PropsWithChildren & {
  className?: string;
  handleResponse: (data: ModalArticleTemplateResponse) => void;
}) => {
  return (
    <Button
      type="button"
      variant="empty"
      className={cn(
        "h-auto p-0 text-sm text-blue-100 underline lg:text-sm",
        className,
      )}
      onClick={async () => {
        const response = await openModalArticleTemplateAsync();

        handleResponse(response);
      }}
    >
      {children || "見本を表示する"}
    </Button>
  );
};
