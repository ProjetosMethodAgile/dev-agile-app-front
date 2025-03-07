import { GET_KANBAN_COLUNA } from "@/functions/api";
import { GetKanbanColunaResponse } from "@/types/api/apiTypes";

export default async function GET_KANBAN_COLUNA_POR_SETOR_ID(
  id: string,
): Promise<GetKanbanColunaResponse> {
  try {
    const { url } = await GET_KANBAN_COLUNA();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      // Enviando o setor_id no body, conforme a API espera
      body: JSON.stringify({ setor_id: id }),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = (await response.json()) as GetKanbanColunaResponse;
    console.log(data);
    
    return data;
  } catch (error) {
    console.error("Erro ao buscar a coluna do Kanban:", error);
    return { columns: [] };
  }
}
