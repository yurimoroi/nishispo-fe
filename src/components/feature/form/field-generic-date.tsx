"use client";

import { format, isValid, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useMaskito } from "@maskito/react";
import { dateFormat } from "@/lib/maskito-options";
import { PopoverPortal } from "@radix-ui/react-popover";
import { Input } from "@/components/ui/input";
import IconCalendar from "@public/icon-calendar.svg";
import Image from "next/image";
import { ja } from "date-fns/locale";

const YEAR_FORMAT = "yyyy/MM/dd";

const parseAndValidateFormattedDate = (value: string) => {
  if (!value) return undefined;

  try {
    const parsedDate = parse(value, YEAR_FORMAT, new Date());
    if (!isValid(parsedDate)) {
      return undefined;
    }
    return parsedDate;
  } catch (error) {
    return undefined;
  }
};

type FieldGenericDateProps = {
  formHook: any;
  formInputName: string;
  currentValue: string | null;
  labelText: string;
  isFieldRequired?: boolean;
  hideErrorMessage?: boolean;
};

export const FieldGenericDate = ({
  formHook,
  formInputName,
  labelText,
  hideErrorMessage = false,
}: FieldGenericDateProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const maskitoRef = useMaskito({ options: dateFormat });

  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field }) => {
        const date = parseAndValidateFormattedDate(field.value);

        return (
          <FormItem className="flex w-full flex-col">
            {labelText && <FormLabel>{labelText}</FormLabel>}

            <div className="relative flex rounded border-[1px] border-shade-100">
              <FormControl>
                <Input
                  {...field}
                  className="text-base lg:text-lg"
                  maxLength={10}
                  value={field.value || ""}
                  ref={maskitoRef}
                  onBlur={(e) => {
                    // This will  prevent the old value to replace the updated value
                    const value = e.target.value;
                    field.onChange(format(value, YEAR_FORMAT));
                  }}
                />
              </FormControl>

              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="absolute right-0 h-full rounded-l-none border-l border-shade-400"
                  >
                    <Image
                      src={IconCalendar}
                      width={16}
                      height={16}
                      alt="calendar"
                    />
                  </Button>
                </PopoverTrigger>

                <PopoverPortal>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      defaultMonth={date}
                      onSelect={(newDate) => {
                        if (newDate) {
                          field.onChange(format(newDate, YEAR_FORMAT));
                          setIsPopoverOpen(false);
                        }
                      }}
                      locale={ja}
                    />
                  </PopoverContent>
                </PopoverPortal>
              </Popover>
            </div>

            {!hideErrorMessage && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};
