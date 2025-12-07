import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type RadioValuesType = {
  id: string | number;
  label: string;
};
type FieldGenericRadioGroupProps = {
  formHook: any; //the react hook form
  formInputName: string; //the input name
  labelText: string; //the field label text
  formLabelClassName?: string;
  isFieldRequired?: boolean; // For additional UI that depends on the field being required like the asterisk
  isColumn?: boolean; // For layout purpose only, if true then label will be displayed on the left side of the input
  isModal?: boolean; // For styling purpose only like file label color
  radioValues: RadioValuesType[]; // For radio values
  isHorizontal?: boolean; // For horizontal radio group
};

export const FieldGenericRadioGroup = ({
  formHook,
  formInputName,
  labelText,
  formLabelClassName,
  isFieldRequired = false,
  isColumn = false,
  radioValues = [],
  isHorizontal = false,
}: FieldGenericRadioGroupProps) => {
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field }) => (
        <FormItem className="">
          {labelText && <FormLabel>{labelText}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex flex-col", {
                "flex-row gap-5 lg:gap-10": isHorizontal,
              })}
            >
              {radioValues.map((item, index) => {
                const { id, label } = item;
                return (
                  <FormItem
                    className="flex items-center gap-2 space-y-0"
                    key={id}
                  >
                    <FormControl>
                      <RadioGroupItem
                        value={id.toString()}
                        checked={field.value === id.toString()}
                      />
                    </FormControl>
                    <FormLabel
                      className={cn("font-base font-open", formLabelClassName)}
                    >
                      {label}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
