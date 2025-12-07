"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useRef, useState } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};
export const PostTagAdd = ({
  children,
  className,
  handleTagAdd,
}: CommonProps & {
  handleTagAdd?: (name: string) => Promise<unknown>;
}) => {
  const inputAdd = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={cn("flex w-full gap-2 lg:gap-2.5", className)}>
      <Input ref={inputAdd} />
      <Button
        type="button"
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          const currentValue = inputAdd.current?.value || "";
          const value = currentValue.length === 0 ? "" : currentValue;
          if (!value) {
            setIsLoading(false);
            return;
          }
          const response = (await handleTagAdd?.(value)) as {
            success?: boolean;
            message?: string;
          };

          if (response?.success) {
            inputAdd.current!.value = "";
          } else {
            toast({
              title: "Save Article Warning",
              description: response?.message,
            });
          }

          setIsLoading(false);
        }}
      >
        追加
      </Button>
    </div>
  );
};
