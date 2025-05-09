"use client";

import { pegaTodosAtendente } from "@/actions/HelpDesk/AcoesColuna/getAllAtendente";
import { ativaAtendenteHelpdesk } from "@/actions/HelpDesk/Atendente/ativaAtendenteHelpDesk";
import { inativaAtendenteHelpdesk } from "@/actions/HelpDesk/deleteAtendenteHelpdesk";
import { HelpDeskSetoresPorAtendenteAtivos } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { toast } from "react-toastify";

import GerenciarAtendenteSetor from "./ModalGerenciar";
export type AtendenteEditProps = {
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

  const [ativaModalGerenciar, setAtivaModalGerenciar] = useState(false);
  const [dataAtendente, setDataAtendente] = useState<HelpDeskSetoresPorAtendenteAtivos | null>(null);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  // Fetch inicial ao montar
  useEffect(() => {
    handleResetList();
  }, []);

  // Recarrega a lista de atendentes
  async function handleResetList() {
    try {
      const res = await pegaTodosAtendente();
      if (res && "data" in res && Array.isArray(res.data)) {
        setAtendentes(res.data);
      } else {
        toast.error(res.error || "Resposta inesperada da API");
      }
    } catch {
      toast.error("Falha ao buscar atendentes.");
    }
  }

  // Toggle de status: chama a API correta e atualiza lista
  async function handleToggleStatus(id: string, currentStatus: boolean) {
    if (!id) return;

    try {
      // Marca como carregando
      setLoadingIds(prev => new Set(prev).add(id));

      if (currentStatus) {
        // Se ativo, desativa
        await inativaAtendenteHelpdesk(id);
        toast.success("Usuário desativado");
      } else {
        // Se inativo, ativa
        await ativaAtendenteHelpdesk(id);
        toast.success("Usuário ativado");
      }

      // Atualiza a lista após operação
      await handleResetList();
    } catch {
      toast.error("Erro ao atualizar status do usuário");
    } finally {
      // Remove do estado de loading
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  // Abre modal de gerenciamento
  function handleGerenciaAtendente(item: HelpDeskSetoresPorAtendenteAtivos) {
    
    setDataAtendente(item);
   
    setAtivaModalGerenciar(true);
  }

  // Fecha modal
  function handleCloseModal() {
    setAtivaModalGerenciar(false);
    setDataAtendente(null);
  }

  // Fecha toda a edição
  function handleBackPage() {
    setAtivaModalGerenciar(false);
    setModalAtendenteEdit(false);
  }

  // Se modal aberto, renderiza só ele
  if (ativaModalGerenciar && dataAtendente) {
    return (
      <GerenciarAtendenteSetor dataAtendente={dataAtendente} onClose={setAtivaModalGerenciar}/>
    );
  }

console.log("aqui",dataAtendente);

  // Renderiza lista de atendentes
  return (
    <div className="min-w-[37rem] p-4">
      <div className="flex justify-between">
        <button
          aria-label="Fechar Modal"
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 active:scale-95"
          onClick={handleBackPage}
        >
          <Voltar className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {atendentes.map(item => {
          const isLoading = loadingIds.has(item.id);
          return (
            <li
              key={item.id}
              className="border-primary-100/35 hover:bg-primary-200/50 flex items-center justify-between rounded-md border p-3 transition"
            >
              <div className="w-50">
                <p className="font-semibold">
                  {item.UsuarioAtendente.nome.length > 40
                    ? `${item.UsuarioAtendente.nome.slice(0, 40)}...`
                    : item.UsuarioAtendente.nome}
                </p>
                <p className="text-sm text-gray-500">
                  {item.UsuarioAtendente.email.length > 40
                    ? `${item.UsuarioAtendente.email.slice(0, 40)}…`
                    : item.UsuarioAtendente.email}
                </p>
                <p className="mt-1 text-sm">
                  Status: <span className={item.status ? "text-green-600" : "text-red-600"}>
                    {item.status ? "Ativo" : "Inativo"}
                  </span>
                </p>
              </div>

              <button
                className="bg-primary-100 p-2 rounded-2xl"
                onClick={() => handleGerenciaAtendente(item)}
              >
                Gerenciar
              </button>

              <div
                onClick={() => !isLoading && handleToggleStatus(item.id, item.status)}
                className={`relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ${
                  item.status ? "bg-green-500" : "bg-red-500"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                    item.status ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
