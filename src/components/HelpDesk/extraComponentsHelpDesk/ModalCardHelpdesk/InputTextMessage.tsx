"use client";

import { CardHelpDeskSessao } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { postReplyCardHelpdesk } from "@/actions/HelpDesk/postReplyCardHelpdesk";
import { toast } from "react-toastify";
export type InputTextMessageProps = React.ComponentProps<"input"> & {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  cardData?: CardHelpDeskSessao | null;
  att: () => void;
};

export default function InputTextMessage({
  message,
  setMessage,
  cardData,
  att,
  ...props
}: InputTextMessageProps) {
  const Send = iconsMap["sendMessage"];

  async function handleSendMessage() {
    const message_id = cardData?.CardSessao.MessageSessao.at(-1)?.message_id;
    const to_email =
      cardData?.CardSessao.MessageSessao.at(-1)?.ClienteSessao.email;
    if (!message.length) {
      toast.error("Escreva sua resposta antes de enviar a mensagem");
    }

    if (message_id && to_email) {
      try {
        await postReplyCardHelpdesk(message_id, message, to_email, message_id);
        // Atualize o estado local, se necessário:
        setMessage("");
        // Força a atualização da rota
        att();
      } catch (e) {
        console.log(e);

        toast.error("Erro ao enviar mensagem");
      }
    } else {
      toast.error("Não é possível responder esse chamado no momento");
    }
  }

  return (
    <div
      className="bg-primary-200 m-1 flex items-center rounded-2xl p-1"
      {...props}
    >
      <input
        className="placeholder:text-primary-150 flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl dark:text-gray-100 dark:placeholder:text-gray-100"
        type="text"
        value={message}
        placeholder="Digite sua mensagem"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />

      <Send
        className="bg-primary-100 active:bg-primary-150 h-[40px] w-[60px] cursor-pointer rounded-2xl p-1 active:scale-95"
        onClick={() => handleSendMessage()}
      />
    </div>
  );
}
