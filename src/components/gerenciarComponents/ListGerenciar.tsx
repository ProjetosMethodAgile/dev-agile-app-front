"use client";
import { useUser } from "@/context/userContext";
import iconsMap from "@/utils/iconsMap";
import { redirect, usePathname } from "next/navigation";
export type ListGerenciarProps = React.ComponentProps<"ul"> & {};

export default function ListGerenciar({ ...props }: ListGerenciarProps) {
  const { permissions, user } = useUser();

  if (!permissions) redirect("/");
  const pathAtual = usePathname();
  console.log(user);

  return (
    <ul {...props} className="flex flex-wrap gap-4">
      {permissions.map((screen) => {
        const slug = screen.nome.trim().toLowerCase().replace(/\s+/g, "-");
        const IconComponent = iconsMap[slug] || "House";

        return (
          <li
            key={screen.nome}
            className="dark:border-primary-600/70 border-primary-300 flex h-40 w-50 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 bg-transparent p-5 backdrop-blur-2xl hover:scale-105 dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl"
            onClick={() => redirect(pathAtual + "/" + slug)}
          >
            <IconComponent className="size-15" />
            <span>{screen.nome}</span>
          </li>
        );
      })}
    </ul>
  );
}
