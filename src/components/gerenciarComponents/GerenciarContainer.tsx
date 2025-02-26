"use client";
import { useState } from "react";
import { Form } from "@/components/form";
import ListGerenciar from "@/components/gerenciarComponents/ListGerenciar";
import iconsMap from "@/utils/iconsMap";

type GerenciarContainerProps = {
  empresaName: string;
};

export default function GerenciarContainer({
  empresaName,
}: GerenciarContainerProps) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Form.Section title={empresaName}>
        <Form.InputText
          id="search"
          name="search"
          icon={iconsMap["search"]}
          placeholder="busque a configuração"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </Form.Section>
      <ListGerenciar search={search} />
    </>
  );
}
