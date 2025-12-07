import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export type FieldMultipleCheckboxProps = {
  formHook: any;
  formInputName: string;
  items: {
    id: string;
    label: string;
  }[];
  onChange?: () => void;
};

export function FieldMultipleCheckbox({
  formHook,
  formInputName,
  items,
  onChange,
}: FieldMultipleCheckboxProps) {
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field }) => (
        <FormItem className="grid grid-cols-3 gap-5 space-y-0 lg:grid-cols-7">
          {items.map((item) => (
            <FormItem key={item.id} className="flex gap-2 space-x-0 space-y-0">
              <FormControl>
                <Checkbox
                  id={item.id}
                  checked={field.value?.includes(item.id)} // Bind checkbox checked state
                  onCheckedChange={(checked) => {
                    // Trigger onChange callback
                    if (onChange) {
                      onChange();
                    }

                    const newValue = checked
                      ? [...field.value, item.id]
                      : field.value?.filter(
                          (value: string) => value !== item.id,
                        );
                    formHook.setValue(formInputName, newValue); // Update form field value
                  }}
                />
              </FormControl>
              <FormLabel htmlFor={item.id} className="font-base">
                {item.label}
              </FormLabel>
            </FormItem>
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
