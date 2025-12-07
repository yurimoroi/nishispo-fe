import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select";
import { PropsWithChildren } from "react";
import Image from "next/image";
import IconCloseCircle from "@public/icon-close-circle.svg";


type CommonProps = PropsWithChildren & {
  className?: string;
};

export const PostTagErrorMessage = ({
  message,
}: {
  message: string | undefined;
}) => {
  if (!message) return null;
  return (
    <div>
      <p className="mt-2 font-open text-sm text-red">{message}</p>
    </div>
  );
};

export const PostTagDeleteButton = ({
  children,
  className,
  onClick,
}: CommonProps & { onClick: () => void }) => {
  return (
    <Button
      className={cn(
        "h-auto w-auto rounded-none bg-transparent p-0 hover:bg-transparent shadow-none",
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <Image
        src={IconCloseCircle}
        alt="delete tag button"
        width={16}
        height={16}
      />
    </Button>
  );
};

export const PostTagBlock = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "item-center flex gap-2.5 rounded-[1.875rem] border-[.0625rem] border-blue-100 px-2 py-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PostTag = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("leading-0 text-[.75rem] text-blue-100 leading-normal", className)}>
      {children}
    </div>
  );
};

export const PostTagList = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("mb-2.5 flex flex-wrap gap-2", className)}>
      {children}
    </div>
  );
};

export const PostTagsDropdown = ({
  children,
  className,
  dropdownValues,
  handleChange,
}: CommonProps & {
  dropdownValues: {
    id: string;
    name: string;
  }[];
  handleChange?: (value: string) => void;
}) => {
  return (
    <Select
      onValueChange={(value) => {
        handleChange?.(value);
      }}
    >
      <div className="relative w-full">
        <SelectTrigger className={cn("")}>
          <SelectValue placeholder="" />
        </SelectTrigger>
      </div>

      <SelectContent onCloseAutoFocus={async () => {}}>
        <SelectGroup className="max-h-[10rem] overflow-y-auto">
          {dropdownValues.map((item, index) => {
            const { id, name } = item;
            return (
              <SelectItem key={id} value={`${id}^_^${name}`}>
                {name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const PostTagLabel = ({ children, className }: CommonProps) => {
  return <p className={cn("font-noto", className)}>{children}</p>;
};

export const PostTagInputBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const PostTagsBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

