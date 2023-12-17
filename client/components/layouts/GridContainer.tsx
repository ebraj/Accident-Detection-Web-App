import React from "react";
import { cn } from "@/lib/clsxTwMerge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GridContainer({ className, children }: Props) {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}
