"use client";

import { pegaTodosAtendente } from "@/actions/HelpDesk/AcoesColuna/getAllAtendente";
import { ativaAtendenteHelpdesk } from "@/actions/HelpDesk/ativaAtendenteHelpDesk";
import { inativaAtendenteHelpdesk } from "@/actions/HelpDesk/deleteAtendenteHelpdesk";
import {
  HelpDeskSetoresPorAtendenteAtivos,
} from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type AtendenteEditProps = {
  atendentes: HelpDeskSetoresPorAtendenteAtivos[];
  setModalAtendenteEdit: (open: boolean) => void;
};



export default function AtendenteEdit({
  atendentes,
  setModalAtendenteEdit,
}: AtendenteEditProps) {
  const Voltar = iconsMap.voltar;



async function handleResetList() {
 await pegaTodosAtendente()
}


async function  ativaAtendente(id:string,){
  const response = await ativaAtendenteHelpdesk(id)
  toast.success("Usuario Ativado")
  handleResetList()
  
}

async function  DesativaAtendente(id:string){
  const response = await inativaAtendenteHelpdesk(id)
  toast.success("Usuario desativado")
  handleResetList()
}

function toggleStatus(id:string, status:boolean) {
  if (!id) return;
  if(!status) { ativaAtendente(id)}
  if(status) { DesativaAtendente(id)}
}


  return (
    <div className="min-w-[37rem]">
      {/* fechar modal */}
      <button
        aria-label="Fechar Modal"
        className="flex size-10 cursor-pointer items-center justify-center active:scale-95"
        onClick={() => setModalAtendenteEdit(false)}
      >
        <Voltar className="size-8 text-3xl" />
      </button>
      {atendentes.map((item)=>(
        
        <ul key={item.id} className="flex  items-center dark:mirroe dark:bg-primary-900/50 border-1 border-primary-100/20   hover:bg-primary-200/50 my-1 rounded-md p-2 transition-all "
        >
          <div className="flex flex-col w-full">

          <div className="flex justify-between ">
          <li>{item.UsuarioAtendente.nome}</li>
          </div>

          <div className="mt-1 text-sm text-gray-500">
            <p className="font-medium">Status: {item.status?"Ativo":"Inativo"}</p>
        
          </div>
          <li>{item.UsuarioAtendente.email}</li>
          </div>
          <div 
             onClick={() => toggleStatus(item.id,item.status)}
             className={`relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 ${
                item.status ? "bg-green-500" : "bg-red-500"
              } transition-colors duration-200`}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow duration-200 ${
                  !item.status ? "translate-x-0" : "translate-x-8"
                }`}
                />
            </div>
        </ul>
      ))}

  </div>
 
  );
}
