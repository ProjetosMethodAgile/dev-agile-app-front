"use client";

import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";
type FormSubmit = React.ComponentProps<"button">;

export default function FormSubmit({ children, className, ...props }: FormSubmit) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={twMerge(
        `h-10 w-full rounded-[12px] text-xl font-semibold transition-all outline-none 
         bg-primary-300 text-primary-50 
         hover:bg-primary-300/90 hover:text-white 
         active:bg-primary-500 
         focus:bg-primary-300/90 
         focus-within:border-primary-600 focus-within:shadow-[0px_0px_2px_2px] 
         shadow-primary-300/40 
         disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed`,
        className
      )}
      {...props}
    >
      {pending ? "Atualizando..." : children}
    </button>
  );
}
