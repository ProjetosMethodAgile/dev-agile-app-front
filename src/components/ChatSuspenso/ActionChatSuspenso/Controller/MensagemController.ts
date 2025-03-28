type MessageType = "user" | "bot";

export type IMessage = {
  text: string;
  time: string;
  type: MessageType;
  loading: boolean;
};

export class MensagemController {
  private messages: IMessage[] = [];

  constructor(private setMessages: (messages: IMessage[]) => void) {}

  private getFormattedTime(): string {
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  // Adiciona uma nova mensagem
  public sendMessage(newMessage: string, type: MessageType, loading = false): void {
    const message: IMessage = {
      text: newMessage,
      time: this.getFormattedTime(),
      type,
      loading,
    };

    this.messages.push(message);
    this.setMessages([...this.messages]);
  }

  // Atualiza a primeira mensagem que estiver com loading
  public updateFirstLoadingMessage(newText: string): void {
    const indexLoading = this.messages.findIndex((msg) => msg.loading);
    if (indexLoading !== -1) {
      this.messages[indexLoading] = {
        ...this.messages[indexLoading],
        text: newText,
        loading: false,
        time: this.getFormattedTime(),
      };
      this.setMessages([...this.messages]);
    }
  }
}
