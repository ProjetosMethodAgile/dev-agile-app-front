import { GET_KANBAN_COLUNA } from "@/functions/api";
import { GetKanbanColunaResponse } from "@/types/api/apiTypes";

export default async function GET_KANBAN_COLUNA_POR_SETOR_ID(
  id: string
): Promise<GetKanbanColunaResponse> {
  try {
    const { url } = await GET_KANBAN_COLUNA();
    const response = await fetch(`${url}?setor_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["setor-helpdesk"],
      },
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = (await response.json()) as GetKanbanColunaResponse;
    return data;
  } catch (error: any) {
    console.error("Erro ao buscar a coluna do Kanban:", error);
    return { columns: [] };
  }
}
