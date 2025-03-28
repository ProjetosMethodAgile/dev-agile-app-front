"use client";
import { RegisterNavProps } from "@/types/frontend/uiTypes";
import { Circle, CircleCheck } from "lucide-react";
import React, { act } from "react";

type RegisterNavigationProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export default function RegisterNavigation({setActiveTab, activeTab}: RegisterNavigationProps) {
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
    <ul className=" flex flex-col gap-2 *:flex *:cursor-pointer *:items-center *:gap-2 
    *:rounded-2xl *:px-5 *:py-2 ">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${activeTab === tab.id ? "dark:bg-primary-300/30 shadow-sm bg-primary-600 text-general" : ""} transition-all`}
        >
          <tab.icon className=" size-5 dark:text-general" />
          <span className="text-xl font-semibold dark:text-general">{tab.name}</span>
        </li>
      ))}
    </ul>
  );
}
