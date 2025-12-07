"use client";

import { Button } from "@/components/ui/button";
import { cn, getUniqueId } from "@/lib/utils";
import { useUserArticlesContext } from "@components/contributor";
import { contributorArticleStatusName } from "@components/contributor/lib/param-keys";

type ListContentTopProps = {
  buttons: ButtonConfig[];
  className?: string;
};

type ButtonConfig = {
  id?: string;
  label: string;
  onClick: (id: string, payload?: any) => void;
  disabled?: boolean;
  styles?: string;
};

type ButtonListProps = {
  buttons: ButtonConfig[];
  rowData?: any;
  articleId?: string;
  articleStatusBtns?: string[];
};

const ButtonList = ({
  buttons,
  rowData = {},
  articleId = "",
  articleStatusBtns = [],
}: ButtonListProps) => {
  // Filter buttons that are included in articleStatusBtns
  const filteredButtons = buttons.filter((button) =>
    articleStatusBtns.includes(button?.id || ""),
  );

  return (
    <div className="flex flex-wrap lg:flex-nowrap lg:gap-2">
      {filteredButtons.map((button, index) => {
        return (
          <div key={getUniqueId(button?.id)} className="flex items-center">
            <Button
              onClick={() =>
                button.onClick && button.onClick(articleId, rowData)
              }
              disabled={button.disabled || false}
              className={cn(
                "bg-transparent text-sm underline shadow-none hover:bg-transparent py-0 lg:px-2 lg:py-1",
                button.styles,
              )}
            >
              {button.label}
            </Button>

            {/* Only render separator if it's not the last button */}
            {index < filteredButtons.length - 1 && (
              <span className="mx-2 block text-gray-400">|</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ListTopContent = ({
  buttons,
  className = "",
}: ListContentTopProps) => {
  const rowData = useUserArticlesContext();

  const {
    articleId,
    articleTitle,
    publishedAt,
    publishEndedAt,
    createdAt,
    updatedAt,
    unSubmittedEdits,
    articleStatus,
    articleStatusBtns,
  } = useUserArticlesContext();

  // Define the color of the status button
  const buttonStatusColor = (() => {
    switch (articleStatus) {
      case contributorArticleStatusName.remand:
        return "bg-orange-100";
      case contributorArticleStatusName.applyingPublish:
      case contributorArticleStatusName.requestEdit:
      case contributorArticleStatusName.requestDelete:
        return "bg-orange-200";
      case contributorArticleStatusName.draft:
        return "bg-gray-100 !text-black";
      default:
        return "bg-blue-100";
    }
  })();

  return (
    <>
      {/* FOR DESKTOP ONLY */}
      <div className="desktop hidden lg:block">
        <div
          className={cn("flex w-full items-center justify-between", className)}
        >
          <span className="title block w-full text-lg font-bold">
            {articleTitle}
          </span>
          <div className="flex items-center gap-5">
            <span
              className={`status block whitespace-nowrap p-2 text-white ${buttonStatusColor}`}
            >
              {articleStatus}
            </span>
            <ButtonList
              buttons={buttons}
              rowData={rowData}
              articleId={articleId}
              articleStatusBtns={articleStatusBtns}
            />
          </div>
        </div>
      </div>

      {/* FOR MOBILE ONLY */}
      <div className="mobile block lg:hidden">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="dates flex flex-col">
            <span className="text-[.875rem]">最終更新日時</span>
            <span className="text-[.875rem]">{createdAt}</span>
          </div>
          <div className="actions">
            <ButtonList
              buttons={buttons}
              articleStatusBtns={articleStatusBtns}
            />
          </div>
        </div>
        {/* Title */}
        <span className="title block w-full text-base font-bold">
          {articleTitle}
        </span>
        {/* Label */}
        <div className="my-[.625rem] flex items-center gap-[1.125rem]">
          <span
            className={`status block px-2 py-1 text-xs text-white ${buttonStatusColor}`}
          >
            {articleStatus}
          </span>
          <span className="block text-xxs">
            {unSubmittedEdits ? "未提出の編集あり" : ""}
          </span>
        </div>
      </div>
    </>
  );
};
