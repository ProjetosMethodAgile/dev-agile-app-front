"use client";
import { ReactNode } from "react";

type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};

export default function FormRoot({ children, ...props }: FormRootProps) {
  return (
    <form
      className="flex flex-col gap-5 p-5 bg-black/20  rounded-3xl border-1 border-primary-600 backdrop-blur-2xl min-h-100 min-w-90"
      {...props}
    >
      {children}
    </form>
  );
}
