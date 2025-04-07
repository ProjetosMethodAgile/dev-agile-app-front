"use client";

type TableProps<T extends { id: string | number }> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
};

export default function Table<T extends { id: string | number }>({
  data,
  columns,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-2">
        <thead className="dark:text-white bg-gray-200 dark:bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="px-6 py-3 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id} // Use o ID como chave
              className={`border-t border-gray-600/60 dark:border-gray-50/20 ${
                rowIndex % 2 === 0
                  ? "dark:bg-primary-600/20 bg-primary-50/30"
                  : "dark:bg-primary-600/40 bg-primary-50/10"
              } dark:hover:bg-primary-600/60 hover:bg-primary-50/70 transition-colors`}
            >
              {columns.map((col) => (
                <td key={col.key as string} className="px-6 py-4">
                  {row[col.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
