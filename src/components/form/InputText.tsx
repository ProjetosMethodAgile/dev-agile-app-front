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
    <div className="relative" {...props}>
      <Icon className="text-placeholder absolute top-1/2 left-3 -translate-y-1/2 transform" />
      <input
        id={id}
        name={id}
        type={type ? type : "text"}
        placeholder={placeholder}
        className="h-10 w-full rounded-[10px] bg-white pr-4 pl-10 text-gray-800 placeholder:text-xl placeholder:leading-10"
      />
    </div>
  );
}
