// src/components/GerenciarAtendenteSetor.tsx
"use client";

import { useEffect, useState } from "react";
import { HelpDeskSetoresPorAtendenteAtivos } from "@/types/api/apiTypes";
import { activeAttendantBySector, inactiveAttendantBySector } from "@/actions/HelpDesk/putAtendenteHelpdeskSetor";

type GerenciarAtendenteSetorProps =  {
  dataAtendente: HelpDeskSetoresPorAtendenteAtivos[];
}

export default function GerenciarAtendenteSetor({
  dataAtendente,
}: GerenciarAtendenteSetorProps) {
  // estado: map de "assignmentId-setorId" → boolean
  const [statuses, setStatuses] = useState<Record<string, boolean>>({});

  // inicializa cada chave única com o status real do join
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    dataAtendente.forEach((item) => {
      console.log(item);
      
      item.Setores.forEach((s) => {
        const join = s.kanban_atendente_setores;
        const key = `${join.id}-${s.id}`;
        initial[key] = join.status;  // ← aqui!
      });
    });
    setStatuses(initial);
  }, [dataAtendente]);

  // toggle por assignmentId (join.id) + setorId
  const handleToggle = async (
    assignmentId: string,
    setorId: string
  ) => {
    const key = `${assignmentId}-${setorId}`;
    const next = !statuses[key];

    try {
      if (next) {
        await activeAttendantBySector(assignmentId);
      } else {
        await inactiveAttendantBySector(assignmentId);
      }
      setStatuses((prev) => ({ ...prev, [key]: next }));
    } catch (err) {
      console.error("Erro ao atualizar status", err);
    }
  };

  return (
    <div className="p-4">
      {dataAtendente.map((item) =>
        item.Setores.map((s) => {
          const join = s.kanban_atendente_setores;
          const key = `${join.id}-${s.id}`;
          const isActive = statuses[key];

          return (
            <div
              key={key}
              className="border-primary-100/35 hover:bg-primary-200/50 transition cursor-pointer mb-2 rounded-md border p-3 w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">{s.nome}</span>
                  <span className="text-sm">
                    {isActive ? "Ativo" : "Inativo"}
                  </span>
                </div>

                {/* switch */}
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={() => handleToggle(join.id, s.id)}  // ← aqui!
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors
                      peer-focus:ring-2 peer-focus:ring-primary-300
                      ${
                        isActive
                          ? "bg-green-500 peer-checked:bg-green-500"
                          : "bg-red-500"
                      }`}
                  />
                  <span
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform
                      ${
                        isActive ? "translate-x-5" : "translate-x-0"
                      }`}
                  />
                </label>
              </div>
            </div>
          );
        }),
      )}
    </div>
  );
}
