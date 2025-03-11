import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { ChangeEvent } from "react";

type FormCheckboxProps = {
  label: string;
  id: string;
  checked?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  screen?: PermissaoCompletaData;
};

export default function FormCheckbox({
  label,
  id,
  onChange,
  checked,
  name,
  screen,
}: FormCheckboxProps) {
  return (
    <div className="text-primary-50 flex cursor-pointer items-center justify-center space-x-2 p-1">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        name={name}
        id={id}
        value={JSON.stringify(screen)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
