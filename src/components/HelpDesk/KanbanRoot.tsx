"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type KanbanRootProps = React.ComponentProps<"div"> & {
  children: ReactNode;
};

export default function KanbanRoot({
  children,
  className,
  ...props
}: KanbanRootProps) {
  return (
    <div
      className={twMerge(`flex h-[90dvh] gap-4 overflow-x-auto p-6`, className)}
      {...props}
    >
      {children}
    </div>
  );
}
