import getUser from "@/actions/getUser";
import { postCardAuthHelpdesk } from "@/actions/HelpDesk/postCardAuthHelpdesk";
import { postCardHelpdesk } from "@/actions/HelpDesk/postCardHelpdesk";

export class ControllerChamados {
  public async enviarChamado(
    setorID: string,
    srcImgCapa: string,
    titulo: string,
    descricao: string,
    status: string,
  ): Promise<void> {
    const response = await postCardHelpdesk(
      setorID,
      srcImgCapa,
      titulo,
      status,
      descricao,
    );
    return response;
  }

  public async enviarChamadoAuth(
    setorID: string,
    srcImgCapa: string,
    titulo: string,
    descricao: string,
    status: string,
    motivo_id: string,
  ): Promise<void> {
    const response = await postCardAuthHelpdesk(
      setorID,
      srcImgCapa,
      titulo,
      status,
      descricao,
      motivo_id,
    );
    return response;
  }

  public async pegaUsuarioLogado() {
    const response = await getUser();
    return response.data?.usuario.nome;
  }
}
