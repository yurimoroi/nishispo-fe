"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";
import { FieldGenericInput } from "./field-generic-input";
import { CustomErrorMessage } from "./custom-error-message";

type FormHook = {
  setValue: (propertyName: string, value: string) => void;
  // Add other relevant form hook methods here
};

type FieldColorPickerProps = {
  formHook: any;
  propertyName: string;
  currentValue?: string;
  className?: string;
};

export const FieldColorPicker = ({
  formHook,
  propertyName = "color",
  currentValue = "#000000",
  className = "",
}: FieldColorPickerProps) => {
  const [colorPickerValue, setColorPickerValue] =
    useState<string>(currentValue);
  const [hexInputValue, setHexInputValue] = useState<string>(currentValue);

  useEffect(() => {
    if (formHook && formHook.setValue) {
      formHook.setValue(propertyName, colorPickerValue);
    }
  }, [colorPickerValue, formHook, propertyName]);

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const color = event.target.value;
      if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
        // Validate the color format
        setColorPickerValue(color);
        setHexInputValue(color);
      }
    },
    [],
  );

  const handleHexInputChange = (hex: string) => {
    setHexInputValue(hex);
    setColorPickerValue(hex);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row-reverse items-center gap-x-2 lg:flex-row",
          className,
        )}
      >
        <input
          id={propertyName}
          type="color"
          value={colorPickerValue}
          onChange={handleColorChange}
          className="h-[2.375rem] w-[2.375rem] lg:h-[1.6875rem] lg:w-[3.125rem]"
        />
        <div className="w-full">
          <FieldGenericInput
            formHook={formHook}
            formInputName={propertyName}
            currentValue={hexInputValue}
            labelText=""
            isShowMultipleErrors={true}
            hideErrorMessage={true}
            onChange={handleHexInputChange}
          />
        </div>
      </div>
      {/* Custom Error Message */}
      <CustomErrorMessage formHook={formHook} propertyName={propertyName} />
    </>
  );
};
