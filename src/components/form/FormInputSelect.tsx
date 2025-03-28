"use client";
import { useEffect, useState } from "react";

export type FormInputSelectTypes = {
  options: { id: string; nome: string }[];
  label?: string;
  id?: string;
  name?: string;
  // Valor controlado (opcional)
  value?: string;
  // Callback de alteração
  onChange?: (selectedId: string) => void;
  defaultOption?: boolean;
  defaultOptionText?: string; // Texto para o placeholder
  resetAfterSelect?: boolean; // Se true, reseta o select para o valor default após seleção
};

export default function FormInputSelect({
  options,
  label,
  id,
  name,
  value: propValue,
  onChange,
  defaultOptionText = "Selecione as opções da lista",
  resetAfterSelect = false,
  defaultOption = true,
}: FormInputSelectTypes) {
  // Estado interno sincronizado com propValue
  const [value, setValue] = useState(propValue || "");

  useEffect(() => {
    setValue(propValue || "");
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
    // Se resetAfterSelect estiver true, reseta para o placeholder; caso contrário, mantém o valor selecionado
    if (resetAfterSelect) {
      setValue("");
    } else {
      setValue(selectedValue);
    }
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={id || "teste"}
          className="text-gray-500 dark:text-gray-400 "
        >
          {label}
        </label>
      )}
      <select
        name={name}
        id={id}
        onChange={handleChange}
        value={value}
        className="focus-within:border-primary-600 mt-1 hover:border-primary-600 shadow-primary-300/40 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] border-2 border-transparent bg-gray-400/30 py-2 pl-4 text-xl outline-0 transition-all outline-none placeholder:text-xl placeholder:text-gray-600/50 focus-within:bg-gray-400/30 focus-within:shadow-[0px_0px_2px_2px] hover:bg-gray-400/30 hover:shadow-[0px_0px_2px_2px] dark:bg-gray-400/20 dark:text-gray-100 dark:placeholder:text-gray-500"
      >
        {/* Placeholder que força a escolha */}
        {defaultOption && (
          <option value=""  className="dark:text-primary-170" disabled>
            {defaultOptionText}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="dark:text-primary-170"
          >
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
