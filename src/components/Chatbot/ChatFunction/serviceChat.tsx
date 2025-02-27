"use server"
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import { GET_SETORES } from "@/functions/api";
import { useParams } from "next/navigation";
export const get_setor_emp = async () => {
    const { empresaTag } = useParams();
    const tag = empresaTag;
  
    const empresaResult = await getEmpresaByTag(tag);
  
    if (!empresaResult.ok || !empresaResult.data) {
      throw new Error(empresaResult.error || "Erro ao obter dados da empresa");
    }
  
    // Supondo que o objeto EmpresaData tenha uma propriedade "id" do tipo string
    const empresaId = empresaResult.data.id;
    
    const url = await GET_SETORES(empresaId);
    return url;
  };
  