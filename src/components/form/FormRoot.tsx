"use client";
import { ReactNode } from "react";

type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};

export default function FormRoot({ children, ...props }: FormRootProps) {
  return (
    <form
      className="animate-move-left-to-right dark:border-primary-600/70 border-primary-300 border-2 flex min-h-115 min-w-100 
      flex-col gap-6 self-center rounded-3xl dark:border-1 
       dark:bg-black/20 bg-trnasparent p-5 dark:backdrop-blur-2xl backdrop-blur-2xl  max-lg:mt-0 max-sm:min-w-full"
      {...props} 
    >
      {children}
    </form>
  );
}
