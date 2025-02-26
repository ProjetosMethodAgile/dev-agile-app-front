"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};


export default function FormRoot({ children,className, ...props }: FormRootProps) {
  return (
    <form
      className={twMerge(`animate-move-left-to-right dark:border-primary-600/70 border-primary-300 bg-trnasparent flex min-h-115 min-w-100 flex-col gap-6 rounded-3xl border-2 p-5 backdrop-blur-2xl max-lg:mt-0 max-sm:min-w-full dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl`,className)}
      {...props}
    >
      {children}
    </form>
  );
}
