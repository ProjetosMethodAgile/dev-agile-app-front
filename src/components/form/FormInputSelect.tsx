type FormInputSelectTypes = {
  options: {
    id: string;
    nome: string;
  }[];
  label: string;
  id?: string;
};

export default function FormInputSelect({
  options,
  label,
  id,
}: FormInputSelectTypes) {
  return (
    <div>
      {label && (
        <label htmlFor={"teste"} className="text-gray-500 dark:text-gray-400">
          {label}
        </label>
      )}
      <select
        className="dark:bg-primary-150 mt-2 flex w-full rounded-xl px-3 py-4 text-gray-600 outline-0 placeholder:text-gray-600/50 dark:text-gray-100 dark:placeholder:text-gray-500"
        name={id}
        id={id}
      >
        {options.map((option) => {
          return (
            <option
              className="dark:text-primary-50"
              key={option.id}
              value={option.id}
            >
              {option.nome}
            </option>
          );
        })}
      </select>
    </div>
  );
}
