"use client";


import { User} from "@/types/api/apiTypes";
import { Form } from "../form";
import ScreenTitle from "../titles/ScreenTitle";
import UsuariosCards from "./UsuariosCards";
import iconsMap from "@/utils/iconsMap";
import { Filter, Search } from "lucide-react";
import AddButton from "@/components/ui/button/RedirectButton";
import React from "react";

export default function UsuariosContainer({ data }: { data: User[] }) {
  const [search, setSearch] = React.useState("");

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
            <div className="relative flex">
              <Filter className="bg-primary-150 hover:bg-primary-600 size-9 cursor-pointer rounded-lg p-2" />
              <div className="absolute left-13"></div>
            </div>
          </div>
          <AddButton route="usuarios-do-sistema/criar" />
        </header>

        <UsuariosCards data={data} search={search} />
        {/* <Table data={data} columns={userColumns} /> */}
      </div>
    </div>
  );
}
