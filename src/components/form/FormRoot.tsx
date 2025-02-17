"use client";
import { ReactNode } from "react";

type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};

export default function FormRoot({ children, ...props }: FormRootProps) {
  return (
    <form
      className="animate-move-left-to-right border-primary-600 flex min-h-115 min-w-100 flex-col gap-6 self-center rounded-3xl border-1 bg-black/20 p-5 backdrop-blur-2xl max-lg:mt-0 max-sm:min-w-full"
      {...props}
    >
      {children}
    </form>
  );
}
