"use client";

import { pegaTodosAtendente } from "@/actions/HelpDesk/AcoesColuna/getAllAtendente";
import { ativaAtendenteHelpdesk } from "@/actions/HelpDesk/ativaAtendenteHelpDesk";
import { inativaAtendenteHelpdesk } from "@/actions/HelpDesk/deleteAtendenteHelpdesk";
import { HelpDeskSetoresPorAtendenteAtivos } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

type AtendenteEditProps = {
  atendentes: HelpDeskSetoresPorAtendenteAtivos[];
  setAtendentes: Dispatch<SetStateAction<HelpDeskSetoresPorAtendenteAtivos[]>>;
  setModalAtendenteEdit: (open: boolean) => void;
};

export default function AtendenteEdit({
  atendentes,
  setAtendentes,
  setModalAtendenteEdit,
}: AtendenteEditProps) {
  const Voltar = iconsMap.voltar;

  async function refreshAtendentes() {
    try {
      const res = await pegaTodosAtendente();

  
      if (
        res &&
        "data" in res &&
        Array.isArray(res.data)
      ) {
        setAtendentes(res.data);
      } else {
     
        toast.error(res.error || "Resposta inesperada da API");
      }
    } catch (e) {
      toast.error(e + "Falha ao buscar atendentes.");
    }
  }


  async function handleToggleStatus(
    id: string,
    currentStatus: boolean
  ) {
 
    setAtendentes(prev =>
      prev.map(at =>
        at.id === id ? { ...at, status: !currentStatus } : at
      )
    );

    try {
      if (currentStatus) {
        await inativaAtendenteHelpdesk(id);
        toast.success("Usuário desativado");
      } else {
        await ativaAtendenteHelpdesk(id);
        toast.success("Usuário ativado");
      }
      await refreshAtendentes();
    } catch {
      // rollback
      setAtendentes(prev =>
        prev.map(at =>
          at.id === id ? { ...at, status: currentStatus } : at
        )
      );
      toast.error("Erro ao alterar status. Tente novamente.");
    }
  }

  return (
    <div className="min-w-[37rem] p-4">
      {/* Botão fechar */}

      <div className="flex justify-between">

      <button
        aria-label="Fechar Modal"
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 active:scale-95"
        onClick={() => setModalAtendenteEdit(false)}
        >
        <Voltar className="h-6 w-6 text-gray-700" />
      </button>

      <button className="bg-primary-100 p-2 rounded-2xl ">Gerenciar</button>
        </div>

      <ul className="mt-4 space-y-2">
        {atendentes.map(item => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-md border border-primary-100/35 p-3 hover:bg-primary-200/50 transition"
          >
            <div>
              <p className="font-semibold">{item.UsuarioAtendente.nome}</p>
              <p className="text-sm text-gray-500">
                {item.UsuarioAtendente.email}
              </p>
              <p className="mt-1 text-sm">
                Status:{" "}
                <span
                  className={
                    item.status ? "text-green-600" : "text-red-600"
                  }
                >
                  {item.status ? "Ativo" : "Inativo"}
                </span>
              </p>
            </div>

            {/* Toggle */}
            <div
              onClick={() =>
                handleToggleStatus(item.id, item.status)
              }
              className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors ${
                item.status ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                  item.status ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
