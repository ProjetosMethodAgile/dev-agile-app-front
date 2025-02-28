"use client";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TableProps<T extends { id: string | number }> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
};

export default function Table<T extends { id: string | number }>({
  data,
  columns,
}: TableProps<T>) {
  const pathname = usePathname();

  return (
    <table className="min-w-full">
      <thead className="dark:text-white">
        <tr>
          {columns.map((col) => (
            <th key={col.key as string}>{col.label}</th>
          ))}
          <th>actions</th>
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
              <td className="px-6 py-4" key={col.key as string}>
                {row[col.key] as React.ReactNode}
              </td>
            ))}
            <td className="flex justify-center space-x-4 px-6 py-4 *:p-1">
              <button className="dark:text-primary-50 text-primary-150 hover:text-primary-200 cursor-pointer">
                <Link href={`${pathname}/${row.id}`}>
                  <Pencil size={19} />
                </Link>
              </button>
              <button className="cursor-pointer text-red-500 hover:text-red-700">
                <Trash2 size={19} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
