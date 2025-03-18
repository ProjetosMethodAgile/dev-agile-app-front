import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { ChangeEvent } from "react";

type FormCheckboxProps = {
  label: string;
  id: string;
  checked?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: PermissaoCompletaData | any;
};

export default function FormCheckbox({
  label,
  id,
  onChange,
  checked,
  name,
  value,
}: FormCheckboxProps) {
  return (
    <div className="flex cursor-pointer items-center space-x-2 p-1">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        name={name}
        id={id}
        value={JSON.stringify(value)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
