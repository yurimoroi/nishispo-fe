import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-open rounded-[.25rem] text-base lg:text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-base lg:text-lg bg-blue-100 hover:bg-blue-100 text-white font-open font-normal shadow-button font-bold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "text-base lg:text-lg shadow-button bg-white border-blue-100 border-[2px] text-blue-100 hover:bg-white font-bold",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        empty: "bg-transparent hover:bg-transparent",
        strong:
          "bg-blue-300 text-white shadow-none rounded-none hover:bg-blue-100 lg:text-sm ",
        dull: "border-2 font-bold border-blue-100 bg-white text-blue-100  hover:border-transparent hover:text-white shadow-button   hover:bg-blue-100",
      },
      size: {
        default: "h-[2.375rem] px-3 py-1.5",
        sm: "py-[.375rem] px-[.75rem] font-[.875rem] leading-[1.3125rem] text-sm",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
