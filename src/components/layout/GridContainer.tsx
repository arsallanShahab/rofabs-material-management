import React from "react";
import { cn } from "../../lib/utils";

interface GridContainerProps {
  children: React.ReactNode;
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "none";
  className?: string;
  isContainer?: boolean;
}

const getGapClass = (gap: GridContainerProps["gap"]) => {
  switch (gap) {
    case "xs":
      return "gap-1";
    case "sm":
      return "gap-2";
    case "md":
      return "gap-3";
    case "lg":
      return "gap-4";
    case "xl":
      return "gap-5";
    case "2xl":
      return "gap-6";
    case "3xl":
      return "gap-8";
    case "none":
      return "gap-0";
    default:
      return "gap-3";
  }
};

const GridContainer = ({
  gap = "md",
  className,
  children,
  isContainer = false,
}: GridContainerProps) => {
  const gapClass = getGapClass(gap);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        gapClass,
        isContainer && "p-4 pb-4 rounded-xl border",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GridContainer;
