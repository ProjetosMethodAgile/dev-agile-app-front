"use client";
import { RegisterNavProps } from "@/types/frontend/uiTypes";
import { Circle, CircleCheck } from "lucide-react";
import React, { FormEvent, useState } from "react";

type RegisterNavigationProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  inputsValidate: (
    e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>,
  ) => boolean;
};

export default function RegisterNavigation({
  setActiveTab,
  activeTab,
  inputsValidate,
}: RegisterNavigationProps) {
  const tabs: RegisterNavProps[] = [
    {
      name: "Informações",
      icon: activeTab !== "informacoes" ? CircleCheck : Circle,
      id: "informacoes",
    },
    {
      name: "Permissões",
      icon: Circle,
      id: "permissoes",
    },
  ];
  const [validate, setValidate] = useState(false);

  return (
    <ul className="flex flex-col gap-2 *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-2xl *:px-5 *:py-2">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          onClick={(e) => {
            const validate = inputsValidate(e);
            if (validate) {
              setActiveTab(tab.id);
              setValidate(true);
            }
          }}
          className={`${activeTab === tab.id ? "dark:bg-primary-300/30 bg-primary-600 text-general shadow-sm" : ""} transition-all`}
        >
          <tab.icon className="dark:text-general size-5 rounded-full " />
          <span className="dark:text-general text-xl font-semibold">
            {tab.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
