"use server";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import { GET_SETORES } from "@/functions/api";
import { SetorHelpDesk } from "@/types/api/apiTypes";

export const getSetorByTagEmpID = async (empresaTag:string) => {


    const empresaResult = await getEmpresaByTag(empresaTag);

    if (!empresaResult) {
      throw new Error("Erro ao obter dados da empresa");
    }

    const empresaId = empresaResult.data?.id;
    if (empresaId) {
      const {url} = await GET_SETORES(empresaId);
        console.log(url);


      const response = await fetch(url, {
        method: "GET",
        next: {
          revalidate: 60,
        },
      });
      if (!response.ok) throw new Error("Erro ao pegar o setor.");
      const data = (await response.json()) as SetorHelpDesk;
      return data
    }
  
};
