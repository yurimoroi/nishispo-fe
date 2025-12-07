"use client";
import { Button } from "@/components/ui/button";
import { cn, getUniqueId } from "@/lib/utils";
import React from "react";
import { useAdminArticlesContext } from "@components/admin/articles";

type ButtonConfig = {
  id?: string;
  articleId?: string;
  label: string;
  onClick: (event: React.MouseEvent, id: string, rowData?: any) => void;
  disabled?: boolean;
  styles?: string;
  status?: { value: number; label: string };
};

type TableActionProps = {
  buttons: ButtonConfig[];
  hasSeparator?: boolean;
  className?: string;
};

export const CustomTableAction = ({
  buttons = [],
  hasSeparator = false,
  className = "",
}: TableActionProps) => {
  // #region [useAdminArticlesContext]
  const rowData = useAdminArticlesContext();
  const { articleStatusBtns, articleId } = useAdminArticlesContext();
  const filteredButtons = buttons.filter((button) =>
    articleStatusBtns.includes(button?.id || ""),
  );
  // #endregion

  return (
    <div
      className={cn(
        "flex flex-wrap items-center lg:flex-nowrap lg:justify-center",
        className,
      )}
    >
      {filteredButtons.length > 0 &&
        filteredButtons.map((button, index) => {
          const buttonKey = getUniqueId(button.id) || index.toString();

          return (
            <React.Fragment key={buttonKey}>
              <Button
                key={buttonKey}
                onClick={(event) =>
                  button.onClick(event, articleId || "", rowData)
                }
                disabled={button.disabled}
                className={cn(
                  "bg-transparent lg:text-sm font-noto underline shadow-none hover:bg-transparent lg:px-2 lg:py-1",
                  button.styles,
                )}
              >
                {button.label}
              </Button>
              {/* Only render separator if it's not the last button */}
              {index < filteredButtons.length - 1 && (
                <span className="mx-2 block text-gray-400">|</span>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default CustomTableAction;
