"use client";

import TableActions from "./TableActions";

type TableProps<T extends { id: string | number }> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
};

export default function Table<T extends { id: string | number }>({
  data,
  columns,
}: TableProps<T>) {
  return (
    <table className="min-w-full mt-2">
      <thead className="dark:text-white text-start">
        <tr>
          {columns.map((col) => (
            <th key={col.key as string}>{col.label}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`rounded-2xl border-t border-gray-600/60 dark:border-gray-50/20 ${
              rowIndex % 2 === 0
                ? "dark:bg-primary-600/20 bg-primary-50/30"
                : "dark:bg-primary-600/40 bg-primary-50/10"
            } dark:hover:bg-primary-600/60 hover:bg-primary-50/70 transition-colors`}
          >
            {columns.map((col) => (
              <td className="px-6 py-4 cursor-pointer" key={col.key as string}>
                {row[col.key] as React.ReactNode}
              </td>
            ))}
            <TableActions dataId={row.id} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
