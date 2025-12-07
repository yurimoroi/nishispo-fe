import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateInvalidFileNameListMessage } from "./lib/validation";
import { cn } from "@/lib/utils";

type FieldGenericFileProps = {
  formHook: any; //the react hook form
  formInputName: string; //the input name
  labelText: string; //the field label text
  placeholder?: string; //the placeholder text
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; //the onChange event
  isMultiple?: boolean;
  inputClassName?: string;
  formItemClassName?: string;
  inputFileLabelClassName?: string;
  inputFileClassName?: string;
};
export const FieldGenericFileImage = ({
  formHook,
  formInputName,
  labelText,
  placeholder,
  handleFileChange,
  isMultiple = false,
  inputClassName,
  formItemClassName,
  inputFileLabelClassName,
  inputFileClassName,
}: FieldGenericFileProps) => {
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field }) => {
        const { value } = field;
        return (
          <FormItem
            className={cn(
              "flex flex-col justify-center lg:justify-normal",
              formItemClassName,
            )}
          >
            <div className="flex flex-col justify-center gap-2 lg:flex-row-reverse lg:justify-end lg:gap-2.5">
              {value?.name && (
                <div className="sm:order-0 order-1 flex items-center break-all text-sm leading-[1.125rem] lg:justify-start">
                  {value.name}
                </div>
              )}
              {labelText && (
                <FormLabel
                  className={cn(
                    "order-0 flex w-max items-center justify-center rounded-none border-[1px] border-black bg-shade-100 px-2 py-1 text-sm leading-[1.125rem] text-black sm:order-1",
                    inputClassName,
                    inputFileLabelClassName,
                  )}
                >
                  {labelText}
                </FormLabel>
              )}
            </div>
            <FormControl className="hidden w-auto">
              <Input
                type="file"
                className={cn("", inputFileClassName)}
                placeholder={"placeholder"}
                accept="image/*"
                multiple={isMultiple}
                onChange={(event) => {
                  if (!isMultiple)
                    field.onChange(event.target.files && event.target.files[0]);
                  else
                    field.onChange([...Array.from(event.target.files ?? [])]);

                  handleFileChange && handleFileChange(event);

                  formHook.trigger(formInputName);
                }}
              />
            </FormControl>
            <FormMessage />
            {isMultiple && (
              <span className="font-open text-sm text-black">
                {generateInvalidFileNameListMessage("", value)}
              </span>
            )}
          </FormItem>
        );
      }}
    />
  );
};
