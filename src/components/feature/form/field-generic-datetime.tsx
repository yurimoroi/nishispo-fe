// This if from https://shadcnui-expansions.typeart.cc/docs/datetime-picker

import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import IconCalendar from "@public/icon-calendar.svg";
import Image from "next/image";
import { FieldErrorIndicator } from "./field-error-indicator";

type FieldGenericDatetimeProps = {
  formHook: any; //the react hook form
  formInputName: string; //the input name
  labelText?: string | React.ReactNode; //the field label text
  placeholder?: string;
  isFieldRequired?: boolean;
  labelClassName?: string;
  hideErrorMessage?: boolean;
};

export const FieldGenericDateTime = ({
  formHook,
  formInputName,
  labelText,
  placeholder = " ",
  isFieldRequired = false,
  labelClassName,
  hideErrorMessage = false,
}: FieldGenericDatetimeProps) => {
  const handleCheck = () => {
    formHook.trigger(formInputName);
  };

  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;
        return (
          <FormItem className="w-full">
            {labelText && (
              <FormLabel
                htmlFor="datetime"
                className={cn(
                  "rounded-[.0625rem] border-shade-400 text-sm text-black lg:text-base",
                  labelClassName,
                )}
              >
                {labelText}
              </FormLabel>
            )}
            <div className="relative">
              <FormControl>
                <DateTimePicker
                  className={cn(
                    "relative z-30 w-full bg-transparent hover:bg-transparent [&>svg]:hidden",
                    {
                      "border-red pr-8": invalid,
                    },
                  )}
                  placeholder={placeholder}
                  granularity="minute"
                  displayFormat={{
                    hour24: "yyyy/MM/dd HH:mm",
                    hour12: "yyyy/MM/dd HH:mm",
                  }}
                  value={field.value}
                  onChange={field.onChange}
                  handleCheck={handleCheck}
                />
              </FormControl>
              <Image
                className="absolute right-2 top-1/2 -translate-y-1/2"
                src={IconCalendar}
                width={16}
                height={16}
                alt="icon calendar"
              />
              {invalid && !hideErrorMessage && (
                <FieldErrorIndicator className={cn("right-[2rem]")} />
              )}
            </div>

            {!hideErrorMessage && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};
