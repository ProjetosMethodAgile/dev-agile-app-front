import getCardHelpDeskId from "@/actions/HelpDesk/getCardHelpDeskId";
import { Form } from "@/components/form";
import { CardHelpDeskSessao } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { useEffect, useState } from "react";
import formatDateSimple from "@/utils/formatDateSimple";
import Image from "next/image";
export type ModalCardHelpdeskProps = React.ComponentProps<"form"> & {
  cardId: string;
  closeModal: () => void;
};

export default function ModalCardHelpdesk({
  cardId,
  closeModal,
  ...props
}: ModalCardHelpdeskProps) {
  const Voltar = iconsMap["voltar"];
  const Paperclip = iconsMap["Paperclip"];
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState<CardHelpDeskSessao | null>();
  useEffect(() => {
    async function getCardData() {
      setLoading(true);
      const card = await getCardHelpDeskId(cardId);
      if (card.data && card.ok) {
        setCard(card.data);
      }
      setLoading(false);
    }
    getCardData();
  }, [cardId]);

  return (
    <Form.Root onSubmit={(e) => e.preventDefault()} {...props}>
      <div className="flex gap-5">
        <Voltar
          className="mb-4 h-10 w-10 cursor-pointer self-start active:scale-95"
          aria-label="Fechar Modal"
          onClick={closeModal}
        />
        <div>
          {loading ? (
            <div className="h-8 w-48 animate-pulse rounded bg-gray-300"></div>
          ) : (
            <h1 className="text-2xl font-bold">{card?.titulo_chamado}</h1>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 sm:w-[800px] sm:flex-row">
        {/* column-1 */}
        <div className="w-full sm:w-3/5">
          {loading ? (
            <div className="h-60 w-full animate-pulse rounded-xl bg-gray-300" />
          ) : (
            <Image
              src={
                card
                  ? card.src_img_capa
                  : "https://diskmadeiras.com.br/wp-content/uploads/2024/06/MDF-CINZA-URBANO-MATT-SOFT-06MM-1-FACE-EUCATEX.jpg"
              }
              width={1200}
              height={600}
              alt="Imagem do Card"
              quality={80}
              sizes="100vw"
              className="h-20 w-full rounded-xl object-cover"
            />
          )}
        </div>
        {/* column-2 */}
        <div className="flex w-full flex-col gap-2 sm:w-2/5">
          {loading ? (
            <div className="space-y-2">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300"></div>
              <div className="h-6 w-1/2 animate-pulse rounded bg-gray-300"></div>
              <div className="h-6 w-2/3 animate-pulse rounded bg-gray-300"></div>
            </div>
          ) : (
            <div className="bg-primary-150 rounded-2xl p-3">
              <span className="flex flex-wrap gap-1">
                <span>Solicitante: </span>
                {card?.CardSessao.MessageSessao[0].ClienteSessao?.nome ||
                  "solicitante externo"}
              </span>
              <span className="flex flex-wrap gap-1">
                <span>Data Criação: </span>
                {card && formatDateSimple(card.createdAt)}
              </span>
              <span className="flex flex-wrap gap-1">
                <span>Última interação: </span>
                {card && formatDateSimple(card.updatedAt)}
              </span>
            </div>
          )}
          {loading ? (
            <div className="h-11 w-full animate-pulse rounded-xl bg-gray-300" />
          ) : (
            <button className="flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-green-500 p-2 text-2xl font-bold text-white hover:bg-green-600 active:scale-95">
              Mover Card
            </button>
          )}
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            {loading ? (
              <>
                <div className="h-11 w-full animate-pulse rounded-xl bg-gray-300 sm:w-1/3" />
                <div className="h-11 w-full animate-pulse rounded-xl bg-gray-300 sm:w-2/3" />
              </>
            ) : (
              <>
                <div className="text-1xl flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-gray-500 p-2 font-bold text-white hover:bg-green-600 active:scale-95 sm:w-1/3">
                  <Paperclip />
                  Anexos
                </div>
                <div className="text-1xl flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-gray-500 p-2 font-bold text-white hover:bg-green-600 active:scale-95 sm:w-2/3">
                  <Paperclip />
                  Anexos
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Form.Root>
  );
}
