import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { ChangeEvent } from "react";

type FormCheckboxProps = {
  label: string;
  id: string;
  checked?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
<<<<<<< HEAD
  value?: PermissaoCompletaData | any;
  disabled?: boolean
=======
  value?: PermissaoCompletaData;
>>>>>>> 72b914a81e2e9f6044e8b4971c4fa9300306c60d
};

export default function FormCheckbox({
  label,
  id,
  onChange,
  checked,
  name,
  value,
<<<<<<< HEAD
  disabled
=======
>>>>>>> 72b914a81e2e9f6044e8b4971c4fa9300306c60d
}: FormCheckboxProps) {
  return (
    <div className="text-primary-50 flex cursor-pointer items-center  space-x-2 p-1">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        name={name}
        id={id}
        value={JSON.stringify(value)}
<<<<<<< HEAD
        disabled={disabled}
=======
>>>>>>> 72b914a81e2e9f6044e8b4971c4fa9300306c60d
      />
      <label className={`${disabled ? 'text-gray-700' : ''} cursor-pointer`} htmlFor={id}>{label}</label>
    </div>
  );
}
