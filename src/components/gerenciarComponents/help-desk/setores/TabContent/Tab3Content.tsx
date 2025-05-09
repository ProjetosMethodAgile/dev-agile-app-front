"use client";
import React, { useEffect, useState } from "react";
import getMotivoSetor from "@/actions/getMotivoSetor";
import { deletaMotivoKanban } from "@/actions/HelpDesk/deleteMotivoKanbam";
import { postMotivoKanbanHelpdesk } from "@/actions/HelpDesk/postKanbanMotivos";
import { atualizamotivoPorID } from "@/actions/HelpDesk/putEditMotivo";
import { Form } from "@/components/form";
import Modal from "@/components/modal/Modal";
import { MotivoHelpDesk, SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { toast } from "react-toastify";

interface Tab3ContentProps {
  setorProps: SetorHelpDesk;
}

export default function Tab3Content({ setorProps }: Tab3ContentProps) {
  const Delete = iconsMap["delete"];
  const Edit = iconsMap["editBtn"];
  const More = iconsMap["add"];

  const [motivosKanban, setMotivosKanban] = useState<MotivoHelpDesk[]>([]);
  const [activeMenu, setActiveMenu] = useState<"add" | "edit">("edit");
  const [tituloMotivo, setTituloMotivo] = useState<string>("");
  const [urlMotivo, setUrlMotivo] = useState<string>("");
  const [slaMinutes, setSlaMinutes] = useState<number>(0);

  const [popUp, setPopUp] = useState<"" | "modalDelet" | "modalEdit">("");
  const [motivoSelecionado, setMotivoSelecionado] =
    useState<MotivoHelpDesk | null>(null);

  // busca motivos para este setor
  useEffect(() => {
    async function load() {
      const resp = await getMotivoSetor(setorProps.id);
      if (resp.data) setMotivosKanban(resp.data);
    }
    load();
  }, [setorProps.id]);

  // cadastrar novo motivo
  async function handleRegisterMotivo() {
    const resp = await postMotivoKanbanHelpdesk(
      setorProps.id,
      tituloMotivo,
      urlMotivo,
      slaMinutes,
    );
    if (resp.success) {
      toast.success("Motivo cadastrado com sucesso");
      setTituloMotivo("");
      setUrlMotivo("");
      setSlaMinutes(0);
      setActiveMenu("edit");
      const fresh = await getMotivoSetor(setorProps.id);
      if (fresh.data) setMotivosKanban(fresh.data);
    } else {
      toast.error(resp.message || "Erro ao cadastrar motivo");
    }
  }

  // confirmar exclusão
  async function handleConfirmDelete() {
    if (!motivoSelecionado) return;
    const resp = await deletaMotivoKanban(motivoSelecionado.id);
    if (resp.success) {
      toast.success(`Motivo "${motivoSelecionado.descricao}" excluído`);
      setPopUp("");
      const fresh = await getMotivoSetor(setorProps.id);
      if (fresh.data) setMotivosKanban(fresh.data);
    } else {
      toast.error("Erro ao excluir");
    }
  }

  // salvar edição
  async function handleEditMotivo() {
    if (!motivoSelecionado) return;
    const resp = await atualizamotivoPorID(
      tituloMotivo,
      motivoSelecionado.id,
      urlMotivo,
      slaMinutes,
    );
    if (resp.success) {
      toast.success(`Motivo "${tituloMotivo}" atualizado`);
      setPopUp("");
      const fresh = await getMotivoSetor(setorProps.id);
      if (fresh.data) setMotivosKanban(fresh.data);
    } else {
      toast.error("Erro ao editar");
    }
  }

  return (
    <div className="animate-move-left-to-right relative min-h-[22rem] min-w-[32rem]">
      {activeMenu === "add" ? (
        <Form.Root className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Novo Motivo</h1>
            <button
              className="rounded bg-gray-700 p-2 hover:bg-gray-600"
              onClick={() => setActiveMenu("edit")}
            >
              Voltar
            </button>
          </div>
          <p className="text-[15px] text-gray-500">
            Cadastre o motivo e defina o SLA em minutos.
          </p>
          <Form.InputText
            placeholder="Título do motivo"
            value={tituloMotivo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTituloMotivo(e.target.value)
            }
            className="focus:outline-none"
          />
          <Form.InputText
            placeholder="URL da imagem"
            value={urlMotivo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrlMotivo(e.target.value)
            }
            className="focus:outline-none"
          />
          <Form.InputText
            placeholder="SLA (minutos)"
            type="number"
            value={slaMinutes.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSlaMinutes(Number(e.target.value))
            }
            className="focus:outline-none"
          />
          <Form.InputSubmit
            disabled={!tituloMotivo || !urlMotivo || slaMinutes <= 0}
            className="rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
            onClick={(e) => {
              e.preventDefault();
              handleRegisterMotivo();
            }}
          >
            Cadastrar
          </Form.InputSubmit>
        </Form.Root>
      ) : (
        <div className="h-[20rem] overflow-y-auto pr-4">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-2xl">
              {popUp === "modalDelet"
                ? "Confirmar Exclusão"
                : popUp === "modalEdit"
                  ? "Editar Motivo"
                  : "Motivos Cadastrados"}
            </h1>
            <button
              className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
              onClick={() => setActiveMenu("add")}
            >
              <More />
            </button>
          </div>

          {popUp && (
            <Modal>
              <div className="p-5">
                {popUp === "modalDelet" ? (
                  <>
                    <p>
                      Deseja realmente deletar o motivo{" "}
                      <strong>{motivoSelecionado?.descricao}</strong>?
                    </p>
                    <div className="mt-4 flex gap-3">
                      <button
                        className="rounded bg-red-500 px-4 py-2 text-white"
                        onClick={handleConfirmDelete}
                      >
                        Sim
                      </button>
                      <button
                        className="rounded bg-gray-500 px-4 py-2 text-white"
                        onClick={() => setPopUp("")}
                      >
                        Não
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Form.InputText
                      placeholder="Título do motivo"
                      value={tituloMotivo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTituloMotivo(e.target.value)
                      }
                    />
                    <Form.InputText
                      placeholder="URL da imagem"
                      value={urlMotivo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUrlMotivo(e.target.value)
                      }
                    />
                    <Form.InputText
                      placeholder="SLA (minutos)"
                      type="number"
                      value={slaMinutes.toString()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSlaMinutes(Number(e.target.value))
                      }
                    />
                    <div className="mt-4 flex gap-3">
                      <button
                        className="rounded bg-green-500 px-4 py-2 text-white"
                        onClick={handleEditMotivo}
                      >
                        Salvar
                      </button>
                      <button
                        className="rounded bg-gray-500 px-4 py-2 text-white"
                        onClick={() => setPopUp("")}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Modal>
          )}

          {!popUp && (
            <ul className="mb-2 flex rounded bg-gray-700 px-2 py-1 text-white">
              <li className="flex-1 text-center">Descrição</li>
              <li className="flex-1 text-center">SLA (min)</li>
              <li className="w-32 text-center">Ações</li>
            </ul>
          )}

          {!popUp &&
            motivosKanban.map((mot) => (
              <div
                key={mot.id}
                className="flex items-center justify-between border-b border-gray-600 py-2"
              >
                <div className="flex-1 truncate">{mot.descricao}</div>
                <div className="flex-1 text-center">{mot.sla_minutes}</div>
                <div className="flex gap-2">
                  <button
                    className="rounded bg-blue-500 p-1 text-white"
                    onClick={() => {
                      setPopUp("modalEdit");
                      setMotivoSelecionado(mot);
                      setTituloMotivo(mot.descricao);
                      setUrlMotivo(mot.src_img ?? "");
                      setSlaMinutes(mot.sla_minutes ?? 0);
                    }}
                  >
                    <Edit />
                  </button>
                  <button
                    className="rounded bg-red-500 p-1 text-white"
                    onClick={() => {
                      setPopUp("modalDelet");
                      setMotivoSelecionado(mot);
                    }}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            ))}

          {!popUp && motivosKanban.length === 0 && (
            <p className="text-center text-gray-400">
              Nenhum motivo cadastrado.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
