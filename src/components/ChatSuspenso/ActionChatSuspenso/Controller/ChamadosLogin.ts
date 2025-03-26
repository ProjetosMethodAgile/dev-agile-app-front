import { Chamado } from "./Chamados";

export class ChamadoLogin extends Chamado {
  private nome: string;

  constructor(
    nome: string,
    setorID: string,
    srcImgCapa: string,
    titulo: string,
    descricao: string,
    status: string
  ) {
    super(setorID, srcImgCapa, titulo, descricao, status);
    this.nome = nome;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
    // Atualiza a descrição com o nome atualizado
    const novaDescricao = `Chamado alterado pelo usuário ${nome}`;

    
    this.setDescricao(novaDescricao);
  }
}
