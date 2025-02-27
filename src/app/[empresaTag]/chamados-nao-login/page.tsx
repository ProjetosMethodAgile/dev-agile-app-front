import getMotivoSetor from "@/actions/getMotivoSetor";
import { getSetorByTagEmpID } from "@/actions/getSetorByTagEmpID";
import { Chat } from "@/components/Chatbot";
import { GlobalContextProvider } from "@/context/globalContext";

export default async function chamadosSemLogin({
  params,
}: {
  params: Promise<{ empresaTag: string }>;
}) {
  try {
    const { empresaTag } = await params;
    const setores = await getSetorByTagEmpID(empresaTag);

    return (
      <GlobalContextProvider>
        <div className="flex items-center justify-center h-dvh flex-col">
          <Chat.Root className="w-1/2 flex-col min-h-115">
            <div className="flex max-h-[500px]">
              <Chat.NavBar className="w-1/3" setores={setores} />
              <Chat.Menssagem />
            </div>
            <Chat.InputChat className="flex items-center" />
          </Chat.Root>
        </div>
      </GlobalContextProvider>
    );
  } catch (error) {
    console.error("Erro ao carregar chamadosSemLogin:", error);
    return <div>Erro ao carregar a página.</div>;
  }
}
