"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useEffect } from "react";

export type InputSelectHelpDeskTypes = {
  options: { id: string; nome: string }[];
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (selectedId: string) => void;
  defaultOption?: boolean;
  defaultOptionText?: string;
  resetAfterSelect?: boolean;
  currentColumn?: string;
  setCurrentColumn: React.Dispatch<React.SetStateAction<string>>;
  //necessario para distinguir select de setor e colunas
  columnSelect?: boolean;
};

export default function InputSelectHelpDesk({
  options,
  label,
  id,
  name,
  value: propValue,
  onChange,
  defaultOptionText = "Selecione as opções da lista",
  resetAfterSelect = false,
  defaultOption = true,
  columnSelect,
  currentColumn,
  setCurrentColumn,
}: InputSelectHelpDeskTypes) {
  const { currentSetor, setCurrentSetor } = useGlobalContext();

  // Se não houver um valor e existir pelo menos uma opção, define o primeiro valor
  useEffect(() => {
    if (!propValue && options.length > 0 && !currentSetor) {
      setCurrentSetor(options[0].id);
    }
  }, [propValue, options, currentSetor, setCurrentSetor]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (onChange) onChange(selectedValue);

    if (columnSelect) {
      setCurrentColumn(selectedValue);
    } else {
      setCurrentSetor(resetAfterSelect ? "" : selectedValue);
    }
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={id || "teste"}
          className="text-gray-500 dark:text-gray-400"
        >
          {label}
        </label>
      )}
      <select
        name={name}
        id={id}
        onChange={handleChange}
        value={currentColumn ? currentColumn : currentSetor}
        className="mb-1 flex w-full cursor-pointer rounded-[12px] border-2 border-transparent bg-gray-400/30 py-2 pl-4 text-xl outline-0 transition-all placeholder:text-xl placeholder:text-gray-600/50 dark:placeholder:text-gray-600/50"
      >
        {defaultOption && (
          <option value="" disabled>
            {defaultOptionText}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
