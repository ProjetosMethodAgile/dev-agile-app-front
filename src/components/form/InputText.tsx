import { ElementType } from "react";

type FormInputTextProps = React.ComponentProps<"div"> & {
  icon: ElementType;
  id: string;
  placeholder: string;
};

export default function FormInputText({
  icon: Icon,
  id,
  placeholder,
  ...props
}: FormInputTextProps) {
  return (
    <div className="relative" {...props}>
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder" />
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-4 text-gray-800 bg-white rounded-[10px] placeholder:text-xl placeholder:leading-10"
      />
    </div>
  );
}
