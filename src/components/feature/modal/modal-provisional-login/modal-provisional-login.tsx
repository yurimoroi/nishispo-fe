"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { FormProvisionalLogin } from "./form-provisional-login";
import { setFirstVisitCookie, getFirstVisitCookie } from "./lib/actions";

export const ModalProvisionalLogin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // Check for cookies
  useEffect(() => {
    const checkCookies = async () => {
      const hasVisited = await getFirstVisitCookie();

      if (!hasVisited) {
        setIsOpen(true);
        await setFirstVisitCookie();
      }
    };
    checkCookies();
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] gap-0 overflow-auto">
          <DialogHeader>
            <DialogTitle>
              <span className="hidden lg:inline">ミヤスポ読者アンケート</span>
              <span className="lg:hidden">会員仮登録</span>
            </DialogTitle>
            <DialogDescription className="pb-5 text-black" asChild>
              <section>
                <p>初回訪問時のみの簡単なアンケートにぜひご協力ください</p>
                <p>今後の情報発信の内容充実に活用させていただきます</p>
              </section>
            </DialogDescription>
          </DialogHeader>
          <FormProvisionalLogin handleModalClose={handleModalClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
