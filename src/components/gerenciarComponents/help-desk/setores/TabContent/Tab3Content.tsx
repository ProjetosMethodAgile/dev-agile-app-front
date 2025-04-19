"use client";
import getMotivoSetor from "@/actions/getMotivoSetor";
import { deletaMotivoKanban } from "@/actions/HelpDesk/deleteMotivoKanbam";
import { postMotivoKanbanHelpdesk } from "@/actions/HelpDesk/postKanbanMotivos";
import { atualizamotivoPorID } from "@/actions/HelpDesk/putEditMotivo";
import { Form } from "@/components/form";
import Modal from "@/components/modal/Modal";
import { MotivoHelpDesk, SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Tab3Content({ setorProps }: { setorProps: SetorHelpDesk }) {
  const Delete = iconsMap["delete"];
  const Edit = iconsMap["editBtn"];
  const More = iconsMap["add"];
  const [motivosKanbanEdit, setMotivosKanbanEdit] = useState<MotivoHelpDesk[]>([]);
  const [activeMenu, setActiveMenu] = useState("edit");
  const [tituloMotivo, setTituloMotivo] = useState<string>("");
  const [urlMotivo, setUrlMotivo] = useState<string>("");
  const [popUp, setPopUp] = useState({
    message: "",
  });
  const [motivoSelecionado, setIdMotivoSelecionado] = useState<string>("");
  const [nomeMotivoSelecionado, setnomeMotivoSelecionado] =
    useState<string>("");

  useEffect(() => {
    async function pegaMotivoSetorID() {
      const response = await getMotivoSetor(setorProps.id);
      if (response.data) {
        setMotivosKanbanEdit(response.data);
      }
    }
    pegaMotivoSetorID();
  }, [setorProps.id]);

  async function handleRegisterMotivo(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    await postMotivoKanbanHelpdesk(setorProps.id, tituloMotivo, urlMotivo);

    getMotivoSetor(setorProps.id);
    setUrlMotivo("");
    setTituloMotivo("");
    setActiveMenu("edit");
    toast.success("Motivo cadastrado com sucesso");
  }

  async function handleConfirmDelete(motivoId: string) {
    const response = await deletaMotivoKanban(motivoId);
    await getMotivoSetor(setorProps.id);
    if (response.success) {
      setPopUp({ message: "" });
      toast.success(`Motivo ${nomeMotivoSelecionado} foi excluido com sucesso`);
    }
  }

  async function handleEditaMotivo(
    nomeMotivoSelecionado: string,
    motivoSelecionado: string,
    urlMotivo: string,
  ) {
    const response = await atualizamotivoPorID(
      nomeMotivoSelecionado,
      motivoSelecionado,
      urlMotivo,
    );
    if (response.success) {
      await getMotivoSetor(setorProps.id);
      setPopUp({ message: "" });
      toast.success(`Motivo ${nomeMotivoSelecionado} foi alterado com sucesso`);
    }
  }

  return (
    <div className="animate-move-left-to-right relative min-h-90 min-w-130">
      {activeMenu === "add" ? (
        <>
          <Form.Root className={`flex flex-col gap-5`}>
            <div className="flex justify-between gap-3">
              <h1 className="p-1 text-2xl">Motivo</h1>
              <div className="flex gap-3">
                <div
                  className="flex size-10 cursor-pointer items-center justify-center rounded-[5px] rounded-xl bg-green-500 p-2 text-white hover:bg-green-600 active:scale-95"
                  onClick={() => setActiveMenu("add")}
                >
                  <More />
                </div>

                <div
                  className="bg-primary-300 hover:bg-primary-300/70 flex size-10 cursor-pointer items-center justify-center rounded-xl active:scale-95"
                  onClick={() => setActiveMenu("edit")}
                >
                  <Edit />
                </div>
              </div>
            </div>
            <p className="w-100 pb-2 pl-1 text-[15px] text-gray-500">
              Aqui você cadastra os motivos pelos quais os setores podem entrar
              em contato com o seu time.
            </p>
            <Form.InputText
              className="focus:outline-none"
              type="text"
              placeholder="Titulo do motivo"
              value={tituloMotivo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTituloMotivo(e.target.value)
              }
            />
            <Form.InputText
              type="text"
              placeholder="URL da imagem"
              className="focus:outline-none"
              value={urlMotivo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrlMotivo(e.target.value)
              }
            />
            <Form.InputSubmit
              className={`hover:bg-primary-300 text-white ${tituloMotivo.length <= 0 || urlMotivo.length <= 0 ? "active:bg-primary-200/50 bg-primary-200/50 hover:bg-primary-200/50 cursor-no-drop" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleRegisterMotivo(e);
              }}
              disabled={tituloMotivo.length <= 0 || urlMotivo.length <= 0}
            >
              Cadastar
            </Form.InputSubmit>
          </Form.Root>
        </>
      ) : activeMenu === "edit" ? (
        <div className="h-80 overflow-y-auto pr-5">
          <div className="flex justify-between gap-3">
            <h1 className="p-1 text-2xl">Motivos cadastrado</h1>
            <div className="flex gap-3">
              <div
                className="flex size-10 cursor-pointer items-center justify-center rounded-[5px] rounded-xl bg-green-500 p-2 text-white hover:bg-green-600 active:scale-95"
                onClick={() => setActiveMenu("add")}
              >
                <More />
              </div>
            </div>
          </div>

          <p className="w-100 pb-2 text-[15px] text-gray-500">
            Aqui você pode editar ou excluir os motivos cadastrados. Eles são
            exibidos quando alguém abre um chamado
          </p>
          <ul className="dark:bg-primary-600 bg-primary-500 sticky top-0 flex rounded-md text-white">
            <li className="min-w-50 text-center">Descrição</li>
            <li className="min-w-50 text-center">Ações</li>
          </ul>
          <ul>
            {popUp.message === "modalDelet" ? (
              <Modal>
                <div className="popup-container fixed top-0 left-0 flex h-[100%] w-[100%] flex-col items-center justify-center bg-blue-950/75 backdrop-blur-3xl">
                  <div>
                    <p className="flex flex-col p-1 text-2xl">
                      Deseja realmente deletar o motivo {nomeMotivoSelecionado}?
                      Esta ação <strong>não poderá ser desfeita.</strong>
                    </p>
                    <div className="popup-buttons mt-5 flex gap-5">
                      <button
                        onClick={() => handleConfirmDelete(motivoSelecionado)}
                        className="w-30 rounded-[5px] bg-green-500 p-2"
                      >
                        Sim
                      </button>
                      <button
                        onClick={() => setPopUp({ message: "" })}
                        className="w-30 rounded-[5px] bg-red-600 p-2"
                      >
                        Não
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            ) : popUp.message === "modalEdit" ? (
              <Modal>
                <div className="popup-container fixed top-0 left-0 flex h-[100%] w-[100%] flex-col bg-black/70 backdrop-blur-lg">
                  <h1 className="p-5 text-4xl">Edição</h1>
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <Form.InputText
                      value={nomeMotivoSelecionado}
                      className="w-150"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setnomeMotivoSelecionado(e.target.value);
                      }}
                    />
                    <Form.InputText
                      value={urlMotivo}
                      className="w-150"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUrlMotivo(e.target.value);
                      }}
                    />
                    <div className="popup-buttons mt-5 flex gap-5 self-start pl-22">
                      <button
                        onClick={() =>
                          handleEditaMotivo(
                            nomeMotivoSelecionado,
                            motivoSelecionado,
                            urlMotivo,
                          )
                        }
                        className="w-30 rounded-[5px] bg-green-500 p-2"
                      >
                        Alterar
                      </button>
                      <button
                        onClick={() => setPopUp({ message: "" })}
                        className="w-30 rounded-[5px] bg-red-600 p-2"
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            ) : (
              ""
            )}
            {motivosKanbanEdit.length ? (
              motivosKanbanEdit.map((item) => (
                <div
                  key={item.id}
                  className="dark:border-primary-600/70 border-primary-300 hover:bg-primary-200/50 my-1 flex h-16 items-center rounded-md border p-2 transition-all"
                >
                  <li className="min-w-50 text-center">{item.descricao}</li>
                  <li className="flex min-w-50 justify-center text-center">
                    <div className="flex flex-row-reverse gap-4">
                      <div
                        className="cursor-pointer rounded-xl bg-red-500 p-2 text-white hover:bg-red-700 active:scale-95"
                        onClick={() => {
                          setPopUp({ message: "modalDelet" });
                          setIdMotivoSelecionado(item.id);
                            setnomeMotivoSelecionado(item.descricao);
                        }}
                      >
                        <Delete />
                      </div>
                      <div
                        className="bg-primary-300 hover:bg-primary-600/70 cursor-pointer rounded-xl p-2 text-white active:scale-95"
                        onClick={() => {
                          setPopUp({ message: "modalEdit" });
                          setIdMotivoSelecionado(item.id);
                          setnomeMotivoSelecionado(item.descricao);
                          setUrlMotivo(item.src_img);
                        }}
                      >
                        <Edit />
                      </div>
                    </div>
                  </li>
                </div>
              ))
            ) : (
              <p className="text-center">Nenhum motivo cadastrado.</p>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Tab3Content;
