"use client";


import { ativaAtendenteHelpdesk } from "@/actions/HelpDesk/ativaAtendenteHelpDesk";
import { inativaAtendenteHelpdesk } from "@/actions/HelpDesk/deleteAtendenteHelpdesk";
import { AtendentesHelpDesk, HelpDeskSetoresPorAtendenteAtivos } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type AtendenteEditProps = {
  atendentes: HelpDeskSetoresPorAtendenteAtivos[];
  setModalAtendenteEdit: (open: boolean) => void;
};

type AtendenteHelpdeskEdit = {
  id: string;
  nome: string;
  email: string;
  contato: string;
  status: "Ativo" | "Inativo";
};

export default function AtendenteEdit({
  atendentes,
  setModalAtendenteEdit,
}: AtendenteEditProps) {
  const [todosAtendentes, setTodosAtendentes] = useState<AtendenteHelpdeskEdit[]>([]);
  const Voltar = iconsMap.voltar;

  // Inicializa o estado por atendente
  useEffect(() => {
    const lista = atendentes.map((a) => {
      const ua = a.UsuarioAtendente;

   
      
      return {
        id: a.id,
        nome: ua.nome,
        email: ua.email,
        contato: ua.contato,
      } as AtendenteHelpdeskEdit;
    });
    setTodosAtendentes(lista);
  }, [atendentes]);

  async function inativar(id: string) {
    console.log(id);
    
    const resp = await inativaAtendenteHelpdesk(id);
    console.log(resp);
    
    toast.success(resp.message);
 
    setTodosAtendentes((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "Inativo" } : u
      )
    );
  }

  // Ativa local + chamada API
  async function ativar(id: string) {
    const resp = await ativaAtendenteHelpdesk(id);
    console.log(id);
    
    toast.success(resp.message);
    setTodosAtendentes((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "Ativo" } : u
      )
    );
  }

  // Toggle individual
  function toggleStatus(id: string) {    
    const user = todosAtendentes.find((u) => u.id === id);
    if (!user) return;
    if (user.status) inativar(id);
    else ativar(id);
  }

  return (
    <>
      {todosAtendentes.map((item) => {
        const ativo = item.status? true:"";
        return (
          <div
            key={item.id}
            className="dark:border-primary-600/70 border-1  dark:bg-primary-900dark:border-primary-300 hover:bg-primary-200/50 my-1 flex items-center justify-between rounded-md border p-2 transition-all"
          >
            {/* fechar modal */}
            <button
              aria-label="Fechar Modal"
              className="flex size-10 cursor-pointer items-center justify-center active:scale-95"
              onClick={() => setModalAtendenteEdit(false)}
            >
              <Voltar className="size-8 text-3xl" />
            </button>

            {/* dados */}
            <div className="flex-1 px-4">
              <div>
                <span className="font-medium">Nome:</span>
                <span className="ml-1">{item.nome}</span>
              </div>
              
              <div className="mt-1 text-sm text-gray-500">
                <span className="font-medium">Status:</span>
                <span className="ml-1">{item.status}</span>
              </div>
            </div>

            {/* toggle */}
            <div
              onClick={() => toggleStatus(item.id)}
              className={`relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 ${
                ativo ? "bg-green-500" : "bg-red-500"
              } transition-colors duration-200`}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow duration-200 ${
                  ativo ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
