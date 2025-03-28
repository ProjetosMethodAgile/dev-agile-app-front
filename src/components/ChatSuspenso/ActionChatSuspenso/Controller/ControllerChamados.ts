
import getUser from "@/actions/getUser";
import { postCardHelpdesk } from "@/actions/HelpDesk/postCardHelpdesk";

export class ControllerChamados{
    public async enviarChamado( setorID: string,
        srcImgCapa: string,
        titulo: string,
        descricao: string,
        status: string
    ): Promise<void> {

       const response = await postCardHelpdesk(
          setorID,
         srcImgCapa,
         titulo,
         status,
         descricao
        );
        console.log( setorID,
            srcImgCapa,
            titulo,
            status,
            descricao);
        
        return response;
    }
    public async pegaUsuarioLogado(){
        const response = await getUser()
        return response.data?.usuario.nome;
        
    }

    
    
      
}