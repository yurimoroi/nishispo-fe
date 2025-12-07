"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldErrorIndicator } from "./field-error-indicator";
import { useState } from "react";
import { FieldTogglePassword } from "./field-toggle-password";
import { FormMessageGenerator } from "./form-multi-error-message/form-message-generator";
import { LabelBadge } from "../common";

type FieldGenericInputProps = {
  formHook: any; //the react hook form
  formInputName: string; //the input name
  currentValue?: string | null; //the current value of the combobox (when in edit mode)
  labelText: string | React.ReactNode;
  isFieldRequired?: boolean; // For additional UI that depends on the field being required like the asterisk
  isColumn?: boolean; // For layout purpose only, if true then label will be displayed on the left side of the input
  isModal?: boolean; // For styling purpose only like file label color
  isPasswordField?: boolean; // For password field, we will use this to show hide the password
  fieldType?: "text" | "password" | "number";
  isShowMultipleErrors?: boolean;
  hideErrorMessage?: boolean;
  formLabelClassName?: string;
  formItemClassName?: string;
  maxLength?: number;
  placeholder?: string;
  hasBadge?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
};

const ErrorMessageBlock = ({
  formHook,
  formInputName,
  isShowMultipleErrors,
}: {
  formHook: any;
  formInputName: string;
  isShowMultipleErrors?: boolean;
}) => {
  return isShowMultipleErrors ? (
    <FormMessageGenerator
      formStateField={formHook.formState.errors[formInputName]}
    />
  ) : (
    <FormMessage className="mt-2" />
  );
};

export const FieldGenericInput = ({
  formHook,
  formInputName,
  currentValue,
  labelText,
  isFieldRequired = false,
  isColumn = false,
  isModal = false,
  isPasswordField = false,
  fieldType = "text",
  isShowMultipleErrors = false,
  hideErrorMessage = false,
  formLabelClassName,
  formItemClassName,
  maxLength,
  placeholder = "",
  hasBadge = false,
  onBlur,
  onChange,
}: FieldGenericInputProps) => {
  const classNameOverride = isModal
    ? "flex flex-row items-center gap-[.625rem]"
    : "";
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const handlePasswordShow = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;

        const handleInputChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const value = event.target.value;
          if (onChange) {
            onChange(value);
          }
          field.onChange(value);
        };

        return (
          <FormItem className={cn("", classNameOverride, formItemClassName)}>
            {labelText && (
              <FormLabel
                className={cn(
                  "shrink-0 text-black",
                  {
                    "text-dark-200": isModal,
                    "font-open": !isModal,
                  },
                  formLabelClassName,
                )}
              >
                {labelText}
              </FormLabel>
            )}
            {hasBadge && (
              <LabelBadge className="ml-[.25rem] inline-block text-[.75rem]" />
            )}

            <div className="relative w-full">
              <div className="relative w-full">
                <FormControl>
                  <Input
                    maxLength={maxLength}
                    placeholder={placeholder}
                    {...field}
                    className={cn(
                      "text-base sm:text-lg",
                      invalid && "border-red pr-8",
                      {
                        "pr-14": isPasswordField && invalid,
                        "pr-8": isPasswordField && !invalid,
                      },
                    )}
                    type={
                      !isPasswordField
                        ? fieldType
                        : isPasswordShow
                          ? "text"
                          : "password"
                    }
                    onChange={handleInputChange}
                    onBlur={(e) => {
                      if (onBlur) {
                        onBlur(e);
                      }
                      field.onBlur();
                    }}
                  />
                </FormControl>
                {invalid && (
                  <FieldErrorIndicator
                    className={cn(`${isPasswordField && "right-[2.5rem]"}`)}
                  />
                )}
                {isPasswordField && (
                  <FieldTogglePassword
                    handlePasswordShow={handlePasswordShow}
                    isPasswordShow={isPasswordShow}
                  />
                )}
              </div>
              {/* error message for modals */}
              {!hideErrorMessage && isModal && (
                <ErrorMessageBlock
                  formHook={formHook}
                  formInputName={formInputName}
                  isShowMultipleErrors={isShowMultipleErrors}
                />
              )}
            </div>
            {/* error message for normal page */}
            {!hideErrorMessage && !isModal && (
              <ErrorMessageBlock
                formHook={formHook}
                formInputName={formInputName}
                isShowMultipleErrors={isShowMultipleErrors}
              />
            )}
          </FormItem>
        );
      }}
    />
  );
};
