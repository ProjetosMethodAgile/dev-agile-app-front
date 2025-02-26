"use client";

import getSetoresHelpDesk from "@/actions/getSetoresHelpDesk";
import { useEffect } from "react";

export type SetorListProps = React.ComponentProps<"div"> & {};

export default function SetorList({ ...props }: SetorListProps) {
  useEffect(() => {
    async function getSetores() {
      const permissoes = await getSetoresHelpDesk();
      console.log(permissoes);
    }
    getSetores();
  }, []);

  return (
    <div className="" {...props}>
      <ul className="bg-primary-600 flex rounded-md">
        <li className="w-3xl text-center">nome</li>
        <li className="w-3xl text-center">qtde. func</li>
        <li className="w-3xl text-center">ações</li>
      </ul>

      <ul className="dark:border-primary-600/70 border-primary-300 flex h-13 items-center rounded-md border-1">
        <li className="w-3xl text-center">nome</li>
        <li className="w-3xl text-center">qtde. func</li>
        <li className="w-3xl text-center">ações</li>
      </ul>
    </div>
  );
}
