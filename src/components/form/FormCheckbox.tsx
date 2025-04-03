import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { ChangeEvent } from "react";

type FormCheckboxProps = {
  label: string;
  id: string;
  checked?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: PermissaoCompletaData;
  disabled?: boolean;
};

export default function FormCheckbox({
  label,
  id,
  onChange,
  checked,
  name,
  value,
  disabled,
}: FormCheckboxProps) {
  return (
    <div className="text-primary-50 flex cursor-pointer items-center space-x-2 p-1">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        name={name}
        id={id}
        value={JSON.stringify(value)}
        disabled={disabled}
      />
      <label
        className={`${disabled ? "text-gray-700" : ""} cursor-pointer`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
