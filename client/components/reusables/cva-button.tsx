import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/clsxTwMerge";

const buttonStyles = cva(
  "w-full rounded-md border-2 px-8 transition-all hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-white border-white text-gray-900",
        defaultOutline: "bg-transparent border-white",
        defaultDark: "font-bold bg-slate-900 text-white border-slate-900",
        defaultDarkOutline: "",
        primary: "border-white",
        primaryOutline: "",
        secondary: "bg-red-500 border-red-500",
        secondaryOutline: "",
      },
      size: {
        sm: "py-2",
        default: "py-3",
        md: "py-4",
        large: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    React.HTMLAttributes<HTMLButtonElement> {}

export default function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    ></button>
  );
}
