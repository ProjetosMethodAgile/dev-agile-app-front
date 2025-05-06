"use client";
import { useEffect, useState } from "react";
import KanbanCardGerenciar from "../../kanban-gerenciar-sistema/kanbanCardGerenciar";
import KanbanColumnGerenciar from "../../kanban-gerenciar-sistema/KanbanColumnGerenciar";
import iconsMap from "@/utils/iconsMap";
import { KanbanColumn, SetorHelpDesk } from "@/types/api/apiTypes";
import putOrdemColsHelpDesk from "@/actions/putOrdemColsHelpDesk";
import { toast } from "react-toastify";
import { postColumnHelpdesk } from "@/actions/HelpDesk/postColumnHelpdesk";
import getKanbanColunaBySetorId from "@/actions/getKanbanColunaBySetorId";
import { getAcosEmpresa } from "@/actions/HelpDesk/AcoesColuna/getAcoesEmpresa";
import { FolderPen, MessageCircleQuestion } from "lucide-react";

function Tab1Content({ setorProps }: { setorProps: SetorHelpDesk }) {
  const Config = iconsMap["settings"];
  const IconDelete = iconsMap["delete"];
  const IconEdit = iconsMap["editBtn"];
  const AddSetorBtn = iconsMap["add"];

  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formsModal, setFormsModal] = useState(false);
  const [messagePanne, setMessagePanne] = useState(false);
  const [messagePanneTetx, setMessagePaneText] = useState("");
  const [opcoes, setOption] = useState<{ label?: string; value?: string }[]>(
    [],
  );

  // Estados para os inputs do cadastro da coluna
  const [nomeColuna, setNomeColuna] = useState("");
  const [acaoSelecionada, setAcaoSelecionada] = useState("");
 const [disableBtn, setDisableBtn] = useState<boolean>(false)
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    setDraggedIndex(index);
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const updatedColumns = [...columns];
    const draggedItem = updatedColumns[draggedIndex];
    updatedColumns.splice(draggedIndex, 1);
    updatedColumns.splice(dropIndex, 0, draggedItem);
    setColumns(updatedColumns);
    setDraggedIndex(null);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
  };

  async function editaOrdemCols(setorId: string, setorList: KanbanColumn[]) {
    try {
      const listaFormatada = setorList.map((coluna, index) => ({
        id: coluna.id,
        posicao: index,
      }));

      const resposta = await putOrdemColsHelpDesk(setorId, listaFormatada);
      console.log("Resposta da atualização:", resposta);

      if (!resposta.ok) {
        toast.error(
          "Erro ao atualizar a lista, contate o administrador do sistema.",
        );
      } else {
        const mensagem =
          typeof resposta.data === "string"
            ? resposta.data
            : "Ordem das colunas atualizada com sucesso!";
        toast.success(mensagem);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

  async function handleCadastraColuna(
    nome: string,
    setor_id: string,
    id_acao: string,
  ) {
    // Validação simples
    if (!nome || !id_acao) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    if (disableBtn) {
      return;
    }
    setDisableBtn(true);
    try {
      const response = await postColumnHelpdesk(nome, setor_id, id_acao);
      console.log(response);

      if (!response.error) {
        toast.success("Coluna cadastrada com sucesso!");
        // Limpa os inputs após o cadastro
        setNomeColuna("");
        setAcaoSelecionada("");
        // Atualiza a lista de colunas após o cadastro
        const updatedResponse = await getKanbanColunaBySetorId(setorProps.id);
        const sortedColumns = updatedResponse.columns.sort(
          (a: KanbanColumn, b: KanbanColumn) =>
            parseInt(a.posicao) - parseInt(b.posicao),
        );
        setColumns(sortedColumns);
        setTimeout(()=>{
          setDisableBtn(false)
          setDisableBtn(true)
        },3000)
      } else {
        toast.error("Erro ao cadastrar a coluna.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro inesperado ao cadastrar a coluna.");
    }finally {
    
      setTimeout(() => setDisableBtn(false), 3500);
    }
   
  }

  const handleAddKanbanSetor = () => {
    setFormsModal(!formsModal);
  };

  const onMouseEventPanne = (data: string) => {
    const SELECT_MESSAGE =
      "Escolha a ação que deve ser executada quando o card chegar nesta coluna.";
    const DEFAULT_MESSAGE = "Responsável pela identificação de sua coluna";
    console.log(data);

    const message = data === "Select" ? SELECT_MESSAGE : DEFAULT_MESSAGE;
    setMessagePaneText(message);
    setMessagePanne(true);

    setTimeout(() => {
      setMessagePanne(false);
    }, 15000);
  };

  const onMouseOutFunc = () => {
    setMessagePaneText("");
    setMessagePanne(false);
  };

  useEffect(() => {
    async function getColumnsSetor() {
      const response = await getKanbanColunaBySetorId(setorProps.id);
      const sortedColumns = response.columns.sort(
        (a: KanbanColumn, b: KanbanColumn) =>
          parseInt(a.posicao) - parseInt(b.posicao),
      );
      setColumns(sortedColumns);
    }
    getColumnsSetor();
  }, [setorProps.id]);

  useEffect(() => {
    async function buscaAcoesColuna() {
      try {
        const result = await getAcosEmpresa();
        if (Array.isArray(result.data)) {
          const opcoesExtraidas = result.data.map((item) => {
            const acao = item.kanban_empresa_por_acao;
            return {
              value: acao.id,
              label: acao.nome,
            };
          });
          setOption(opcoesExtraidas);
        } else {
          console.error("result.data não é um array:", result.data);
        }
      } catch (error) {
        console.error("Erro ao buscar ações da coluna:", error);
      }
    }
    buscaAcoesColuna();
  }, []);

  return (
    <div className="animate-move-left-to-right min-h-90 min-w-130">
      <div className="mb-2 flex items-center gap-2">
        <Config />
        <h1 className="text-2xl">Configurações do setor - {setorProps.nome}</h1>
      </div>
      <div>
        <div className="mb-3 flex justify-between">
          <h1 className="text-2xl">Colunas do Kanban</h1>
          <div className="flex gap-2">
            <div className="cursor-pointer rounded-xl bg-red-500 p-2 text-white hover:bg-red-700 active:scale-95">
              <IconDelete />
            </div>
            <div
              onClick={() => {
                if (!isEditing) setIsEditing(true);
              }}
              className={`cursor-pointer rounded-xl p-2 text-white hover:bg-blue-600 active:scale-95 ${
                isEditing ? "bg-blue-600" : "bg-primary-100"
              }`}
            >
              <IconEdit />
            </div>
            <div
              className="cursor-pointer rounded-xl bg-green-500 p-2 text-white hover:bg-green-600 active:scale-95"
              onClick={handleAddKanbanSetor}
            >
              <AddSetorBtn />
            </div>
          </div>
        </div>
        {formsModal ? (
          <div className="mt-5 flex w-[90%] flex-col gap-2">
            <h1>Cria coluna</h1>
            <label
              className="border-general flex justify-between rounded-[15px] border p-2 pr-4 pl-4"
              htmlFor="inputNameKanban"
            >
              <input
                id="inputNameKanban"
                type="text"
                placeholder="Digite o nome da coluna"
                value={nomeColuna}
                onChange={(e) => setNomeColuna(e.target.value)}
                className="flex w-[90%] focus:border-none focus:outline-none "
              />
              <FolderPen
                className="hover:text-custom-green-100 cursor-pointer text-amber-200 hover:scale-105"
                onMouseOut={onMouseOutFunc}
                onMouseMove={() => onMouseEventPanne("column")}
              />
            </label>
            <label
              className="border-general flex justify-between rounded-[15px] border p-2 pr-4 pl-4"
              htmlFor="acao"
            >
              <select
                name="opcoes"
                id="opcoes"
                value={acaoSelecionada}
                onChange={(e) => setAcaoSelecionada(e.target.value)}
                className="flex w-[90%] focus:border-none focus:outline-none"
              >
                <option value="">Selecione uma ação</option>
                {opcoes.map((opcao) => (
                  <option
                    key={opcao.value}
                    value={opcao.value}
                    className="bg-primary-900"
                  >
                    {opcao.label}
                  </option>
                ))}
              </select>

              <MessageCircleQuestion
                className="hover:text-custom-green-100 cursor-pointer text-amber-200 hover:scale-105"
                onMouseMove={() => onMouseEventPanne("Select")}
                onMouseOut={onMouseOutFunc}
              />

              {messagePanne && (
                <p className="bg-primary-100 absolute bottom-0 left-0 flex w-[100%] flex-wrap justify-center p-5">
                  {messagePanneTetx}
                </p>
              )}
            </label>

            <input
              onClick={() =>
                handleCadastraColuna(nomeColuna, setorProps.id, acaoSelecionada)
              }
              disabled={disableBtn}
              type="button"
              value={"Cadastrar"}
              className={`${disableBtn?"bg-primary-900":"bg-primary-300"} flex w-[100%] rounded-[10px] border border-amber-50 p-1 text-center`}
            />
          </div>
        ) : (
          <div className="bg-primary-150 flex max-w-130 overflow-x-auto rounded-[10px] p-5">
            <div className="flex gap-1">
              {columns.length ? (
                columns.map((col, index) => (
                  <div
                    key={col.id}
                    draggable={isEditing}
                    onDragStart={
                      isEditing ? (e) => handleDragStart(e, index) : undefined
                    }
                    onDragOver={
                      isEditing ? (e) => handleDragOver(e) : undefined
                    }
                    onDrop={isEditing ? (e) => handleDrop(e, index) : undefined}
                    onDragEnd={isEditing ? handleDragEnd : undefined}
                  >
                    <KanbanColumnGerenciar title={col.nome}>
                      <KanbanCardGerenciar titleCard="card" />
                      <KanbanCardGerenciar titleCard="card" />
                    </KanbanColumnGerenciar>
                  </div>
                ))
              ) : (
                <div className="flex-1">
                  <h1 className="text-center text-2xl">
                    Sem colunas cadastradas no setor {setorProps.nome}
                  </h1>
                </div>
              )}
            </div>
          </div>
        )}
        {isEditing && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => editaOrdemCols(setorProps.id, columns)}
              className="cursor-pointer rounded-xl bg-green-500 p-2 text-white hover:bg-green-600 active:scale-95"
            >
              Confirmar Edição
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Tab1Content;
