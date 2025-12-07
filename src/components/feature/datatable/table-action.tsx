"use client";
import { Button } from "@/components/ui/button";
import { cn, getUniqueId } from "@/lib/utils";
import React from "react";

type ButtonConfig = {
  id?: string;
  articleId?: string;
  label: string;
  onClick: (event: React.MouseEvent, id: string) => void;
  disabled?: boolean;
  styles?: string;
  status?: { value: number; label: string };
};

type TableActionProps = {
  buttons: ButtonConfig[];
  hasSeparator?: boolean;
  className?: string;
};

export const TableAction = ({
  buttons = [],
  hasSeparator = false,
  className = "",
}: TableActionProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {buttons.length > 0 &&
        buttons.map((button, index) => {
          const buttonKey = getUniqueId(button.id) || index.toString();

          return (
            <React.Fragment key={buttonKey}>
              <Button
                key={buttonKey}
                onClick={(event) =>
                  button.onClick(event, button?.articleId || "")
                }
                disabled={button.disabled}
                className={button.styles}
              >
                {button.label}
              </Button>
              {hasSeparator && index < buttons.length - 1 && (
                <span
                  key={`separator-${index}`}
                  className="mx-2 block h-full leading-4 text-gray-400"
                >
                  |
                </span>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default TableAction;
