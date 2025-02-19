'use client'
import { twMerge } from "tailwind-merge";
type FormSubmit = React.ComponentProps<"button">;

export default function FormSubmit({children,className, ...props }: FormSubmit) {
  return (
    <button
      className={twMerge(`bg-primary-300 active:bg-primary-500 h-10 w-full 
      text-xl cursor-pointer rounded-[12px] font-semibold focus-within:border-primary-600 hover:text-white transition-all outline-none hover:bg-primary-300/90 focus:bg-primary-300/90
      hover:shadow-[0px_0px_2px_2px] focus-within:shadow-[0px_0px_2px_2px] shadow-primary-300/40 text-white`,className)}
      {...props}
    >
      {children}
    </button>
  );
}
