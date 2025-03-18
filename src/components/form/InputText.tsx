import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

// Omitindo "children" de div para evitar conflitos
type FormInputTextProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: ElementType;
    label?: string;
    inputId?: string 
  };

export default function FormInputText({
  icon: Icon,
  inputId,
  label,
  className,
  ...props
}: FormInputTextProps) {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={props.id as string}
          className="text-gray-500 dark:text-gray-400"
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          `focus-within:border-primary-600 hover:border-primary-600 shadow-primary-300/40 flex items-center justify-center gap-2 rounded-[12px] border-2 border-transparent bg-gray-400/30 pl-4 text-gray-50 transition-all outline-none focus-within:bg-gray-400/30 focus-within:shadow-[0px_0px_2px_2px] hover:bg-gray-400/30 hover:shadow-[0px_0px_2px_2px] active:scale-98 dark:bg-gray-400/20`,
          // Caso queira permitir customizar o container interno, pode propagar props.className aqui
          "",
        )}
      >
        {Icon && <Icon className="text-gray-600 dark:text-gray-400" />}
        <input
          {...props}
          type={props.type || "text"}
          id={inputId && inputId}
          className="flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl placeholder:text-gray-600/50 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>
    </div>
  );
}
