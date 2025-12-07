import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ButtonConfig = {
  label: string;
  styles?: string;
  onClick: () => void;
  disabled?: boolean;
};

export type FormButtonsGenericProps = {
  buttons: ButtonConfig[];
  className?: string;
};

export const FormButtonsGeneric = ({
  buttons,
  className = "",
}: FormButtonsGenericProps) => {
  return (
    <div className={cn("", className)}>
      {buttons.map((button, index) => (
        <Button
          key={button.label}
          onClick={button.onClick}
          disabled={button.disabled}
          className={button?.styles}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};
