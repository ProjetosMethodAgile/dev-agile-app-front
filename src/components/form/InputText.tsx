import { ElementType } from "react";

type FormInputTextProps = React.ComponentProps<"div"> & {
  icon: ElementType;
  id: string;
  placeholder: string;
  type?: string;
};

export default function FormInputText({
  icon: Icon,
  id,
  placeholder,
  type,
  ...props
}: FormInputTextProps) {
  return (
    <div

      className="focus-within:border-primary-600 hover:border-primary-600 transition-all  outline-none hover:bg-gray-200/30  focus-within:bg-gray-200/30 
      hover:shadow-[0px_0px_2px_2px] focus-within:shadow-[0px_0px_2px_2px] shadow-primary-300/40 flex items-center justify-center gap-2 rounded-[12px] border-2 border-transparent bg-gray-200/20 pl-4 text-gray-50"
      {...props}
    >
      <Icon className="text-gray-400" />
      <input
        id={id}
        name={id}
        type={type ? type : "text"}
        placeholder={placeholder}
        className="flex w-full py-2 text-xl text-gray-100 outline-0 placeholder:text-xl"
      />
    </div>
  );
}
