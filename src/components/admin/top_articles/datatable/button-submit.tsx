"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArticlePopup } from "@/components/admin/article_popup";

export const ButtonSubmit = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Button onClick={openPopup}>表示記事の追加</Button>
      <ArticlePopup
        isOpen={isPopupOpen}
        closeDialog={closePopup}
        popupTitle="記事の検索"
      />
    </>
  );
};
