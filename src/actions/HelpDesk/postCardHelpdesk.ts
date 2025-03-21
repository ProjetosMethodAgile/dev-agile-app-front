'use server'
import { PUT_ORDEM_KANBAN_COLUNA } from "@/functions/api";
import { PostHelpdesk } from "@/types/api/apiTypes";

export async function postCardHelpdesk({
    setor_id,
    src_img_capa,
    titulo_chamado,
    status,descricao
}:PostHelpdesk) {
    const url = PUT_ORDEM_KANBAN_COLUNA(setor_id)
    console.log(url);
    
}