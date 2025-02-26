import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

type FormInputTextProps = React.ComponentProps<"div"> & {
  icon?: ElementType;
  id: string;
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
};

export default function FormInputText({
  icon: Icon,
  id,
  placeholder,
  type,
  name,
  label,
  ...props
}: FormInputTextProps) {
  return (
    <div {...props} className="flex flex-col gap-1">
      {label && <label htmlFor={id} className="text-gray-500 dark:text-gray-400 ">{label}</label>}
    <div
      className={twMerge(`focus-within:border-primary-600 hover:border-primary-600 shadow-primary-300/40 flex items-center justify-center gap-2 rounded-[12px] border-2 border-transparent bg-gray-400/50 pl-4
       text-gray-50 transition-all outline-none focus-within:bg-gray-200/30 
       focus-within:shadow-[0px_0px_2px_2px] hover:bg-gray-200/30 hover:shadow-[0px_0px_2px_2px] 
       active:scale-98 `, props.className ? props.className : "dark:bg-gray-200/20")}
    >
      {Icon && <Icon className="text-gray-600 dark:text-gray-400" />}
      <input
        id={id}
        name={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        className="flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl placeholder:text-gray-600/50 dark:text-gray-100 dark:placeholder:text-gray-600"
      />
    </div>
    </div>
  );
}
