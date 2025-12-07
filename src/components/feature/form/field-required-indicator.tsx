import { FormLabel } from "@/components/ui/form";
import { JP_ERROR_MESSAGE_ALT } from "./lib";
import { cn } from "@/lib/utils";

type FieldRequiredIndicatorProps = {
  showIndicator?: boolean;
  labelText: string;
  className?: string;
};

export default function FieldRequiredIndicator({
  showIndicator,
  labelText,
  className = "",
}: FieldRequiredIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <FormLabel>{labelText}</FormLabel>
      {showIndicator && (
        <p className="text-[0.75rem] text-red">
          {JP_ERROR_MESSAGE_ALT.GENERIC_REQUIRED}
        </p>
      )}
    </div>
  );
}
