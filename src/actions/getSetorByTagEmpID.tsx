import { GET_SETORES } from "@/functions/api";
import getEmpresaByTag from "./getEmpresaByTag";

export const getSetorByTagEmpID = async (empresaTag: string) => {
  const empresaResult = await getEmpresaByTag(empresaTag);

  if (!empresaResult) {
    throw new Error("Erro ao obter dados da empresa");
  }

  const empresaId = empresaResult.data?.id;
  if (empresaId) {
    const { url } = await GET_SETORES(empresaId);
    const response = await fetch(url, {
      method: "GET",
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Detalhes do erro:", errorDetails);
      throw new Error("Erro ao pegar o setor.");
    }

    const data = await response.json();
    return data; // Retorna os dados obtidos
  } else {
    throw new Error("ID da empresa não encontrado.");
  }
};
