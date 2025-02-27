"use client";
import { useUser } from "@/context/userContext";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { redirect, usePathname } from "next/navigation";

export type ListGerenciarProps = React.ComponentProps<"ul"> & {
  search?: string;
};

export default function ListGerenciar({
  search = "",
  ...props
}: ListGerenciarProps) {
  const { permissions } = useUser();

  if (!permissions) redirect("/");
  const pathAtual = usePathname();

  // Filtra as subtelas com base no ID e no valor de busca (usando lowercase para comparação)
  const accessibleSubScreens = permissions?.filter(
    (screen: PermissaoCompletaData) =>
      screen.parent_id === process.env.NEXT_PUBLIC_ID_SCRENN_GEREN_SIST &&
      screen.nome.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ul {...props} className="flex flex-wrap gap-4">
      {accessibleSubScreens.map((screen) => {
        const slug = screen.nome.trim().toLowerCase().replace(/\s+/g, "-");
        const IconComponent = iconsMap[slug] || "House";

        return (
          <li
            key={screen.nome}
            className="dark:border-primary-600/70 border-primary-300 gap-2 justify-between flex  h-35 w-60 cursor-pointer flex-col items-center 
           rounded-3xl border-2 bg-transparent p-5 backdrop-blur-2xl hover:scale-103 dark:border-1 transition-all
             dark:bg-black/20 dark:backdrop-blur-2xl"
            onClick={() => redirect(pathAtual + "/" + slug)}
          >
            <IconComponent className="size-16 text-primary-900 dark:text-primary-50" />
            <span className="font-semibold text-primary-900/80 dark:text-primary-50">{screen.nome}</span>
          </li>
        );
      })}
    </ul>
  );
}
