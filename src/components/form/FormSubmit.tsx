"use client";

import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";
type FormSubmit = React.ComponentProps<"button">;

export default function FormSubmit({
  children,
  className,
  ...props
}: FormSubmit) {
  return (
    <button
      className={twMerge(
        `bg-primary-300 text-primary-50 hover:bg-primary-300/90 active:bg-primary-500 focus:bg-primary-300/90 focus-within:border-primary-600 shadow-primary-300/40 h-10 w-full rounded-[12px] text-xl font-semibold transition-all outline-none focus-within:shadow-[0px_0px_2px_2px] hover:text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
