"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldErrorIndicator } from "./field-error-indicator";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export type DropDownValuesType = {
  id: string | number;
  value?: string | number;
  label?: string | number;
  name?: string;
};

type FieldGenericSelectProps = {
  formHook: any; //the react hook form
  formInputName: string; //the input name
  currentValue?: string | null; //the current value of the combobox (when in edit mode)
  labelText: string | React.ReactNode; //the field label text
  isFieldRequired?: boolean; // For additional UI that depends on the field being required like the asterisk
  isColumn?: boolean; // For layout purpose only, if true then label will be displayed on the left side of the input
  isModal?: boolean; // For styling purpose only like file label color
  dropdownValues: DropDownValuesType[]; // For dropdown values
  selectPlaceholder?: string; // For dropdown placeholder
  formItemClassName?: string;
  formLabelClassName?: string;
  selectTriggerClassName?: string;
  onChange?: (value: string) => void;
};
export const FieldGenericSelect = ({
  formHook,
  formInputName,
  currentValue,
  labelText,
  isFieldRequired = false,
  isColumn = false,
  isModal = false,
  dropdownValues = [],
  selectPlaceholder = "",
  formItemClassName,
  formLabelClassName,
  selectTriggerClassName,
  onChange,
}: FieldGenericSelectProps) => {
  const { trigger, setValue, control } = formHook;

  // #region field select setup for buttonless submission (no submit button)
  // Set the initial value when the component mounts or when currentValue changes
  useEffect(() => {
    if (currentValue !== undefined && currentValue !== null) {
      setValue(formInputName, currentValue);
    }
  }, [currentValue, formInputName, setValue]);
  // #endregion

  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;

        // Handle the value change safely
        const handleChange = (value: string) => {
          // Use custom onChange behavior if provided
          if (onChange) {
            onChange(value);
          }

          // Set the value value from selected option
          setValue(formInputName, value);
        };

        return (
          <FormItem className={cn("", formItemClassName)}>
            {labelText && (
              <FormLabel
                className={cn("shrink-0 text-base", formLabelClassName)}
              >
                {labelText}
              </FormLabel>
            )}
            <div className="w-full space-y-[.5rem]">
              <Select onValueChange={handleChange} value={field.value}>
                <div className="relative w-full">
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "text-base lg:text-lg",
                        {
                          "border-red": invalid,
                        },
                        selectTriggerClassName,
                      )}
                    >
                      <SelectValue placeholder={selectPlaceholder} />
                    </SelectTrigger>
                  </FormControl>
                  {invalid && (
                    <FieldErrorIndicator className={cn("right-[2rem]")} />
                  )}
                </div>

                <SelectContent
                  onCloseAutoFocus={async () => {
                    await trigger(formInputName);
                  }}
                >
                  <SelectGroup className="max-h-[10rem] overflow-y-auto">
                    {dropdownValues.map((item, index) => {
                      const { id, label, name } = item;
                      // Ensure a fallback for missing 'id' (use label or index)
                      const uniqueId = id ?? label ?? index;

                      return (
                        <SelectItem
                          className="text-base lg:text-lg"
                          key={uniqueId}
                          value={uniqueId.toString()}
                        >
                          {label || name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
};
