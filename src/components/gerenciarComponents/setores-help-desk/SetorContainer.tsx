"use client";
import { Form } from "@/components/form";
import iconsMap from "@/utils/iconsMap";
import { useState } from "react";
import { Setor } from ".";
import { twMerge } from "tailwind-merge";

export type SetorContainerProps = React.ComponentProps<"div"> & {};

export default function SetorContainer({
  className,
  ...props
}: SetorContainerProps) {
  const [search, setSearch] = useState("");

  return (
    <div className={twMerge("", className)} {...props}>
      <Form.InputText
        id="search"
        name="search"
        icon={iconsMap["search"]}
        placeholder="busque a configuração"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="mb-3"
      />
      <Setor.Root>
        <Setor.List />
      </Setor.Root>
    </div>
  );
}
