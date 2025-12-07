"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ButtonConfig = {
  id?: string;
  label: string;
  articleCount?: number;
  itemCountBgColor?: string;
  onClick: (event: React.MouseEvent) => void;
  disabled?: boolean;
  styles?: string;
};

type FormButtonsGroupProps = {
  buttons: ButtonConfig[];
  className?: string;
};

export const FormButtonsGroup = ({
  buttons,
  className,
}: FormButtonsGroupProps) => {
  const [activeButtonId, setActiveButtonId] = useState<string | undefined>(
    undefined,
  );

  const handleButtonClick = (
    id: string,
    onClick: (event: React.MouseEvent) => void,
  ) => {
    setActiveButtonId(id);
    onClick && onClick({} as React.MouseEvent);
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {buttons.map((button) => (
        <Button
          key={button.id}
          onClick={() => handleButtonClick(button.id || "", button.onClick)}
          disabled={button.disabled}
          className={cn(
            "h-full w-full flex-col-reverse justify-between gap-1 rounded-none shadow-none lg:flex-row lg:gap-5",
            button.styles,
            activeButtonId === button.id ? "bg-blue-500 text-white" : "",
          )}
          type="button"
        >
          <span className="block text-wrap text-sm lg:text-base">
            {button.label}
          </span>
          <span
            className={cn(
              "itemCount flex h-8 w-8 items-center justify-center rounded-full px-[.375rem] py-[.1875rem] text-[.625rem] lg:px-1 lg:py-1 lg:text-base",
              button.itemCountBgColor,
            )}
          >
            {button?.articleCount || 0}
          </span>
        </Button>
      ))}
    </div>
  );
};
