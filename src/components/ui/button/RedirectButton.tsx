"use client";

import { redirect } from "next/navigation";

type AddButtonProps = React.ComponentProps<"button"> & {
  route: string;
  text: string;
  icon?: React.ElementType;
  secondary?: boolean;
};

export default function RedirectButton({
  route,
  text,
  secondary = false,
  icon: Icon,
  ...props
}: AddButtonProps) {
  const primaryStyles = "bg-custom-green-700 hover:bg-custom-green-800 text-custom-green-100 "
  const secondaryStyles = "border-2 hover:bg-custom-green-200 text-custom-green-100 hover:bg-primary-200 "


  return (
    <button
      {...props}
      onClick={() => redirect(route)}
      className={`${secondary ? secondaryStyles : primaryStyles} flex scale-101 cursor-pointer items-center justify-between gap-1 self-start rounded-xl px-4 py-2 font-semibold shadow-md transition-all`}
    >
      {Icon && <Icon className="size-4" />}
      {text}
    </button>
  );
}
