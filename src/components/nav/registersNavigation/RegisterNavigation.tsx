"use client";
import { RegisterNavProps } from "@/types/frontend/uiTypes";
import { Circle } from "lucide-react";
import React from "react";

type RegisterNavigationProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export default function RegisterNavigation({setActiveTab, activeTab}: RegisterNavigationProps) {
  const tabs: RegisterNavProps[] = [
    {
      name: "Informações",
      icon: Circle,
      id: "informacoes",
    },
    {
      name: "Permissões",
      icon: Circle,
      id: "permissoes",
    },
  ];

  return (
    <ul className="flex flex-col gap-2 *:flex *:cursor-pointer *:items-center *:gap-2 
    *:rounded-2xl *:px-5 *:py-2">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${activeTab === tab.id ? "bg-primary-300/30" : ""} transition-all`}
        >
          <tab.icon className="text-general size-5" />
          <span className="text-general text-xl">{tab.name}</span>
        </li>
      ))}
    </ul>
  );
}
