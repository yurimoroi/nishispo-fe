import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className = "" }: SpinnerProps) => {
  return (
    <div className={cn("bg-gray-100 py-1", className)}>
      <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
    </div>
  );
};
