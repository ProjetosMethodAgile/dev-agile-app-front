"use client";

import { User } from "@/types/api/apiTypes";
import { Form } from "../form";
import ScreenTitle from "../titles/ScreenTitle";
import UsuariosCards from "./UsuariosCards";
import iconsMap from "@/utils/iconsMap";
import { Filter, Search, XIcon } from "lucide-react";
import AddButton from "@/components/ui/button/RedirectButton";
import React from "react";

export type filterTypes = {
  status: "ativo" | "inativo" | "ambos";
  perfil: "usuario" | "master" | "administrador" | "ambos";
};

export default function UsuariosContainer({ data }: { data: User[] }) {
  const [search, setSearch] = React.useState("");
  const [showFilter, setShowFilter] = React.useState(false);
  const [currentFilter, setCurrentFilter] = React.useState<filterTypes>({
    status: "ativo",
    perfil: "ambos",
  });

  //atualiza o estado quando o filtro é alterado
  function changeFilter(value: string, key: string) {
    console.log(value, key);
    setCurrentFilter({
      ...currentFilter,
      [key]: value,
    });
  }

  //limpa todos os filtros
  function clearFilter() {
    setCurrentFilter({
      perfil: "ambos",
      status: "ambos",
    });
  }

  // mostra o filtro na tela
  function showFilterSettings() {
    setShowFilter(!showFilter);
  }

  return (
    <div className="container">
      <ScreenTitle
        title="Usuarios do sistema"
        icon={iconsMap["usuarios-do-sistema"]}
      />
      <div className="mirror-container h-[100vh]">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Form.InputText
              placeholder="Procure por usuario"
              icon={Search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
            <div className="relative flex items-center gap-3">
              <Filter
                onClick={() => showFilterSettings()}
                className="bg-primary-150 hover:bg-primary-600 size-9 cursor-pointer rounded-lg p-2"
              />
              <div className="flex items-center gap-2">
                {(
                  Object.keys(currentFilter) as Array<
                    keyof typeof currentFilter
                  >
                ).map((key) => {
                  return (
                    <div
                      key={key}
                      className="bg-primary-150 flex items-center gap-1 rounded-xl p-2"
                    >
                      <span className="text-sm">{key}</span>
                      <span className="font-bold">{currentFilter[key]}</span>
                    </div>
                  );
                })}
                {(currentFilter.perfil.toLowerCase() !== "ambos" ||
                  currentFilter.status.toLowerCase() !== "ambos") && (
                  <XIcon className="cursor-pointer" onClick={clearFilter} />
                )}
              </div>
              {showFilter && (
                <div className="bg-primary-150 absolute top-12 w-70 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-1xl">Filtrar</h4>
                    <XIcon
                      onClick={() => setShowFilter(false)}
                      className="cursor-pointer justify-self-end"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Form.InputSelect
                      options={[
                        { id: "ativo", nome: "Ativo" },
                        { id: "inativo", nome: "Inativo" },
                        { id: "ambos", nome: "Ambos" },
                      ]}
                      defaultOptionText="Status"
                      label="Usuarios com status"
                      onChange={(e) => changeFilter(e, "status")}
                      value={currentFilter.status}
                    />
                    <Form.InputSelect
                      options={[
                        { id: "usuario", nome: "Usuario" },
                        { id: "master", nome: "Master" },
                        { id: "administrador", nome: "Administrador" },
                        { id: "ambos", nome: "Ambos" },
                      ]}
                      defaultOptionText="Perfil"
                      label="Usuarios com perfil"
                      onChange={(e) => changeFilter(e, "perfil")}
                      value={currentFilter.perfil}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <AddButton route="usuarios-do-sistema/criar" />
        </header>

        <UsuariosCards
          data={data}
          search={search}
          currentFilter={currentFilter}
        />
        {/* <Table data={data} columns={userColumns} /> */}
      </div>
    </div>
  );
}
