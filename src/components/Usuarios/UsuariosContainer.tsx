'use client'

import { User, UsuariosData } from "@/types/api/apiTypes";
import { Form } from "../form";
import ScreenTitle from "../titles/ScreenTitle";
import UsuariosCards from "./UsuariosCards";
import iconsMap from "@/utils/iconsMap";
import { Search } from "lucide-react";
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
        <div className="flex items-center justify-between">
          <Form.InputText
            placeholder="Procure por usuario"
            icon={Search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <AddButton route="usuarios-do-sistema/criar" />
        </div>

        <UsuariosCards data={data} search={search} />
        {/* <Table data={data} columns={userColumns} /> */}
      </div>
    </div>
  );
}
