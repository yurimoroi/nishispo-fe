import { cn } from "@/lib/utils";
import React from "react";
import { useUserArticlesContext } from "@components/contributor";

type ListBottomContentProps = {
  className?: string;
};

export const ListBottomContent = ({
  className = "",
}: ListBottomContentProps) => {
  const {
    articleId,
    articleTitle,
    publishedAt,
    publishEndedAt,
    createdAt,
    updatedAt,
    articleStatus,
    articleStatusBtns,
    unSubmittedEdits,
  } = useUserArticlesContext();

  return (
    <>
      {/* FOR DESKTOP ONLY */}
      <div className="hidden lg:block">
        <div className={cn("flex justify-between", className)}>
          <div className="flex gap-2">
            <span>公開期間</span>
            <div className="dates flex gap-2 text-base">
              <span>{publishedAt}</span>
              <span>-</span>
              <span>{publishEndedAt}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="block text-xxs">
              {unSubmittedEdits ? "未提出の編集あり" : ""}
            </span>
            <span>最終更新日時</span>
            <span>{updatedAt}</span>
          </div>
        </div>
      </div>

      {/* FOR MOBILE ONLY */}
      <div className="block lg:hidden">
        <span className="block text-sm">公開期間</span>
        <div className="dates flex gap-1 text-sm">
          <span>{publishedAt}</span>
          <span>-</span>
          <span>{publishEndedAt}</span>
        </div>
      </div>
    </>
  );
};
