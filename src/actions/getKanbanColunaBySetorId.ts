"use server";
import { GET_KANBAN_COLUNA } from "@/functions/api";
import { GetKanbanColunaResponse } from "@/types/api/apiTypes";

export default async function GET_KANBAN_COLUNA_POR_SETOR_ID(
  setor_id: string,
): Promise<GetKanbanColunaResponse> {
  // Verifica se o setor_id está definido
  if (!setor_id) {
    console.error("setor_id não definido");
    return { columns: [] };
  }

  try {
    // Obtém a URL da API
    const { url } = await GET_KANBAN_COLUNA(setor_id);

    const response = await fetch(url, {
      method: "GET",
      next: {
        revalidate: 60,
      },
    });

    // Caso a resposta não seja bem-sucedida, lê o erro e lança uma exceção
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    // Converte a resposta para JSON
    const data = (await response.json()) as GetKanbanColunaResponse;
    console.log(data);

    // Validação para garantir que os dados estão no formato esperado
    if (!data || !Array.isArray(data.columns)) {
      throw new Error(
        "Resposta da API inválida: propriedade 'columns' não encontrada",
      );
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar a coluna do Kanban:", error);
    // Retorna um objeto padrão para evitar erros posteriores na aplicação
    return { columns: [] };
  }
}
