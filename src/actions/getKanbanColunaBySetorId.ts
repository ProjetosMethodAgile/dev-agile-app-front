import { GET_KANBAN_COLUNA as getKanbanColunaAPI } from "@/functions/api";
import { GetKanbanColunaResponse } from "@/types/api/apiTypes";



export default async function GET_KANBAN_COLUNA(
  id: string
): Promise<GetKanbanColunaResponse> {
  try {
  
    const { url } = await getKanbanColunaAPI(id);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = (await response.json()) as GetKanbanColunaResponse;
    return data;
  } catch (error) {
    console.error("Erro ao validar a empresa:", error);
  
    return { columns: [] };
  }
}
