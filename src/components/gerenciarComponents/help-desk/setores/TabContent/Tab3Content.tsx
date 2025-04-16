"use client";
import getMotivoSetor from "@/actions/getMotivoSetor";
import { deletaMotivoKanban } from "@/actions/HelpDesk/deleteMotivoKanbam";
import { postMotivoKanbanHelpdesk } from "@/actions/HelpDesk/postKanbanMotivos";
import { Form } from "@/components/form";
import { MotivoHelpDesk, SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Tab3Content({ setorProps }: { setorProps: SetorHelpDesk }) {
  const Delete = iconsMap["delete"];
  const Edit = iconsMap["editBtn"];
  const More = iconsMap["add"];
  const [motivos, setMotivos] = useState<MotivoHelpDesk[]>([]);
  const [activeMenu, setActiveMenu] = useState("edit");
  const [tituloMotivo, setTituloMotivo] = useState<string>("");
  const [urlMotivo, setUrlMotivo] = useState<string>("");
  const [alert, setAlert] = useState({
    status: true,
    message: "",
  });
  const [popUp,setPopUp] = useState(false)
  const [moticoSelecionado,setIdMotivoSelecionado] = useState<string>("")
  const [nomeMoticoSelecionado,setnomeMotivoSelecionado] = useState<string>("")
 

  useEffect(() => {
    async function pegaMotivoSetorID() {
      const response = await getMotivoSetor(setorProps.id);
      if (response.data) {
        setMotivos(response.data);
      }
    }
    pegaMotivoSetorID();
    
  }, [setorProps.id]);


  async function handleRegisterMotivo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const response = await postMotivoKanbanHelpdesk(
      setorProps.id,
      tituloMotivo,
      urlMotivo,
    );

    if (response.success) {
      setTimeout(() => {
        setAlert({
          status: false,
          message: "",
        });
      }, 3000);
      setAlert({
        status: true,
        message: "Erro ao cadastrar motivo",
      });
      toast.error("Erro ao cadastrar motivo");
    }
    setUrlMotivo("")
    setTituloMotivo("")
    setActiveMenu("edit")
    toast.success("Motivo cadastrado com sucesso")
    
    
  }
  


  async function handleConfirmDelete(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
   const response = deletaMotivoKanban(moticoSelecionado)
   setPopUp(false)
   console.log("aaaaaaaaaaaaaaaaaaaaaaa",response);
   

  }
  return (
    <div className="animate-move-left-to-right min-h-90 min-w-130 relative">
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
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTituloMotivo(e.target.value)}
            />
            <Form.InputText
              type="text"
              placeholder="URL da imagem"
              className="focus:outline-none"
              value={urlMotivo}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUrlMotivo(e.target.value)}
              />
            <Form.InputSubmit
              className={`hover:bg-primary-300 text-white ${tituloMotivo.length <= 0||urlMotivo.length <= 0?"active:bg-primary-200/50 bg-primary-200/50 cursor-no-drop hover:bg-primary-200/50":""}`}
              onClick={(e) => {
                e.preventDefault();
                handleRegisterMotivo(e);
              }}
              
              disabled={tituloMotivo.length <= 0||urlMotivo.length <= 0 }
            >
              Cadastar
            </Form.InputSubmit>
            {}
            {alert.status ? (
              <p className="text-red-500">{alert.message}</p>
            ) : (
              ""
            )}
          </Form.Root>
        </>
      ) : activeMenu === "edit" ? (
        <div className="h-80 overflow-y-auto pr-5">
            <div className="flex justify-between gap-3 ">
              <h1 className="p-1 text-2xl">Motivos cadastrado</h1>
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
          
          <p className="w-100 pb-2 text-[15px] text-gray-500">
            Aqui você pode editar ou excluir os motivos cadastrados. Eles são
            exibidos quando alguém abre um chamado
          </p>
          <ul className="dark:bg-primary-600 bg-primary-500 sticky top-0 flex rounded-md text-white">
            <li className="min-w-50 text-center">Descrição</li>
            <li className="min-w-50 text-center">Ações</li>
          </ul>
          <ul>

          {popUp && (
  <div className="popup-container bg-blue-950/75 backdrop-blur-3xl  h-[100%] fixed top-0 left-0 w-[100%] flex items-center flex-col justify-center">
    <div>
    <p className="text-2xl p-1 flex flex-col">Deseja realmente deletar o motivo {nomeMoticoSelecionado}? Esta ação <strong>não poderá ser desfeita.</strong></p>
    <div className="popup-buttons flex gap-5 mt-5 ">
      <button onClick={()=>handleConfirmDelete} className="bg-green-500 w-30 p-2 rounded-[5px]">Sim</button>
      <button onClick={()=> setPopUp(false)} className="bg-red-600 w-30 p-2 rounded-[5px] ">Não</button>
    </div>
    </div>
  </div>
)}
            {motivos.length ? (
              motivos.map((item) => (
                <div
                  key={item.id}
                  className="dark:border-primary-600/70 border-primary-300 hover:bg-primary-200/50 my-1 flex h-16 items-center rounded-md border p-2 transition-all"
                >
                  <li className="min-w-50 text-center">{item.descricao}</li>
                  <li className="flex min-w-50 justify-center text-center">
                    <div className="flex flex-row-reverse gap-4">
                      <div className="cursor-pointer rounded-xl bg-red-500 p-2 text-white hover:bg-red-700 active:scale-95" onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{setPopUp(!popUp); setIdMotivoSelecionado(item.id), setnomeMotivoSelecionado(item.descricao)}}>
                        <Delete />
                      </div>
                      <div className="bg-primary-300 hover:bg-primary-600/70 cursor-pointer rounded-xl p-2 text-white active:scale-95">
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
