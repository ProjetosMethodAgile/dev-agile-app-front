"use client";
import { RegisterNavProps } from "@/types/frontend/uiTypes";
import { Circle, CircleCheck } from "lucide-react";
import React from "react";

type RegisterNavigationProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function RegisterNavigation({
  setActiveTab,
  activeTab,
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

  return (
    <ul className="flex flex-col gap-2 *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-2xl *:px-5 *:py-2">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${activeTab === tab.id ? "dark:bg-primary-300/30 bg-primary-600 text-general shadow-sm" : ""} transition-all`}
        >
          <tab.icon className="dark:text-general size-5" />
          <span className="dark:text-general text-xl font-semibold">
            {tab.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
