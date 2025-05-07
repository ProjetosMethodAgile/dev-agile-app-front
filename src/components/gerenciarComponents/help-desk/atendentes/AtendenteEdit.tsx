"use client";

import { pegaTodosAtendente } from "@/actions/HelpDesk/AcoesColuna/getAllAtendente";
import { ativaAtendenteHelpdesk } from "@/actions/HelpDesk/ativaAtendenteHelpDesk";
import { inativaAtendenteHelpdesk } from "@/actions/HelpDesk/deleteAtendenteHelpdesk";
import { HelpDeskSetoresPorAtendenteAtivos } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { toast } from "react-toastify";


import GerenciarAtendenteSetor from "./GerenciarAtendenteSetor";
import ModalGerenciar from "./ModalGerenciar";

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

  // Estado único para controlar o modal e o atendente selecionado
  const [ativaModalGerenciar, setAtivaModalGerenciar] = useState(false);
  const [dataAtendente, setDataAtendente] = useState<
    HelpDeskSetoresPorAtendenteAtivos | null
  >(null);


useEffect(()=>{
    console.log("aaaa",dataAtendente);
    
},[])
  // Função para recarregar a lista após alterações
  async function refreshAtendentes() {
    try {
      const res = await pegaTodosAtendente();
  
      
      if (res && "data" in res && Array.isArray(res.data)) {
        setAtendentes(res.data);
      } else {
        toast.error(res.error || "Resposta inesperada da API");
      }
    } catch (e) {
      toast.error("Falha ao buscar atendentes.");
    }
  }

  // Toggle de status ativa/inativa
  async function handleToggleStatus(id: string, currentStatus: boolean) {
    // Atualização otimista
    setAtendentes((prev) =>
      prev.map((at) =>
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
      // Rollback em caso de erro
      setAtendentes((prev) =>
        prev.map((at) =>
          at.id === id ? { ...at, status: currentStatus } : at
        )
      );
      toast.error("Erro ao alterar status. Tente novamente.");
    }
  }

  // Ao clicar em Gerenciar: guarda o item e abre o modal
  function handleGerenciaAtendente(item: HelpDeskSetoresPorAtendenteAtivos) {
    setDataAtendente(item);
    setAtivaModalGerenciar(true);
  }

  // Fecha o modal
  function handleCloseModal() {
    setAtivaModalGerenciar(false);
    setDataAtendente(null);
  }

  // Fecha todo o componente de edição de atendentes
  function handleBackPage() {
    setAtivaModalGerenciar(false);
    setModalAtendenteEdit(false);
  }

  // Se estiver com modal aberto e atendente selecionado, renderiza o modal
  if (ativaModalGerenciar && dataAtendente) {
    return (
      <ModalGerenciar onClose={handleCloseModal}>
        <GerenciarAtendenteSetor dataAtendente={[dataAtendente]} />
      </ModalGerenciar>
    );
  }

  // Caso contrário, exibe a lista de atendentes
  return (
    <div className="min-w-[37rem] p-4">
      {/* Botão fechar */}
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
        {atendentes.map((item) => (
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
                Status:{" "}
                <span
                  className={item.status ? "text-green-600" : "text-red-600"}
                >
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
              onClick={() => handleToggleStatus(item.id, item.status)}
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
