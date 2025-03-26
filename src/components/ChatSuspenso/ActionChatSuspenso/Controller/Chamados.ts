

export class Chamado {
  private setorID: string;
  private srcImgCapa: string;
  private titulo: string;
  private descricao: string;
  private status: string;

  constructor(
    setorID: string,
    srcImgCapa: string,
    titulo: string,
    descricao: string,
    status: string
  ) {
    this.setorID = setorID;
    this.srcImgCapa = srcImgCapa;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
  }

 
  public getSetorID(): string {
    return this.setorID;
  }

  public getSrcImgCapa(): string {
    return this.srcImgCapa;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public getStatus(): string {
    return this.status;
  }


  public setSetorID(value: string): void {
    this.setorID = value;
  }
  public setSrcImgCapa(value: string): void {
    this.srcImgCapa = value;
  }

  public setTitulo(value: string): void {
    this.titulo = value;
  }

  public setDescricao(value: string): void {
    this.descricao = value;
  }

  public setStatus(value: string): void {
    this.status = value;
  }

  
}
