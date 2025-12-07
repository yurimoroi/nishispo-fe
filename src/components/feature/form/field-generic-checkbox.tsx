import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type FieldGenericCheckboxProps = {
  formHook: any; //the react hook form
  formInputName: string; //the input name
  currentValue?: string | null; //the current value of the combobox (when in edit mode)
  labelText: string; //the field label text
  labelClassName?: string;
  isFieldRequired?: boolean; // For additional UI that depends on the field being required like the asterisk
  isModal?: boolean; // For styling purpose only like file label color
  handleChange?: () => void; // For additional logic to execute
  hideErrorMessage?: boolean;
};

export const FieldGenericCheckbox = ({
  formHook,
  formInputName,
  labelText,
  labelClassName,
  isModal = false,
  handleChange,
  hideErrorMessage = false,
}: FieldGenericCheckboxProps) => {
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <div className="items-top flex items-center space-x-2">
                <Checkbox
                  className="ml-[4px] mr-[5px] scale-[1.786] sm:ml-0 sm:mr-0 sm:scale-100"
                  id={formInputName}
                  checked={field.value}
                  onCheckedChange={() => {
                    if (handleChange !== undefined) {
                      handleChange();
                    }
                    field.onChange(!field.value);
                  }}
                />
                <div className="grid gap-2 leading-none">
                  <label
                    htmlFor="rememberMe"
                    className={cn("font-open text-base", labelClassName, {
                      "font-open": !isModal,
                    })}
                  >
                    {labelText}
                  </label>
                </div>
              </div>
            </FormControl>
            {!hideErrorMessage && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};
