"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FieldErrorIndicator } from "./field-error-indicator";
import { useState } from "react";
import { FormMessageGenerator } from "./form-multi-error-message/form-message-generator";
import { Textarea } from "@/components/ui/textarea";
import { LabelBadge } from "../common";

type FieldGenericInputProps = {
  formHook: any; //the react hook form
  formInputName: string; //the input name
  placeholder?: string;
  labelText: string | React.ReactNode; //the field label text
  isFieldRequired?: boolean; // For additional UI that depends on the field being required like the asterisk
  isShowMultipleErrors?: boolean;
  hideErrorMessage?: boolean;
  labelClassName?: string;
  textAreaClassName?: string;
  formItemClassName?: string;
  formLabelClassName?: string;
  isModal?: boolean;
  hasBadge?: boolean;
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

export const FieldGenericTextArea = ({
  formHook,
  formInputName,
  placeholder,
  labelText,
  isFieldRequired = false,
  isShowMultipleErrors = false,
  hideErrorMessage = false,
  textAreaClassName,
  formItemClassName,
  formLabelClassName,
  isModal,
  hasBadge = false,
}: FieldGenericInputProps) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;

        return (
          <FormItem className={cn("", formItemClassName)}>
            {labelText && (
              <FormLabel
                className={cn(
                  "shrink-0 text-sm text-black lg:text-base",
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
                  <Textarea
                    placeholder={placeholder}
                    className={cn(
                      "pr-8 text-base lg:text-lg",
                      {
                        "border-red": invalid,
                      },
                      textAreaClassName,
                    )}
                    {...field}
                  />
                </FormControl>
                {invalid && (
                  <FieldErrorIndicator
                    className={cn("right-[1rem] top-[1.25rem]")}
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
