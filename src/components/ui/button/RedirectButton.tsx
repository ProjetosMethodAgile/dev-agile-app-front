"use client";

import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";

type AddButtonProps = React.ComponentProps<"button"> & {
  route: string;
};

export default function RedirectButton({ route, ...props }: AddButtonProps) {
  return (
    <button
      {...props}
      onClick={() => redirect(route)}
      className="bg-custom-green-700 hover:bg-custom-green-800 text-custom-green-100 flex scale-101 cursor-pointer items-center justify-between gap-1 self-start rounded-xl px-4 py-2 font-semibold shadow-md transition-all"
    >
      <PlusCircle className="size-5" />
      Novo
    </button>
  );
}
