import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Form } from "@/components/form";
import { HelpDeskSetoresPorAtendenteAtivos } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { desativandoAtendentedoSetorHelpdesk } from "@/actions/HelpDesk/Atendente/desativandoAtendenteDosetor";
import { habilitandotivaSetorAtendente } from "@/actions/HelpDesk/Atendente/habilitandotivaSetorAtendente";
import { toast } from "react-toastify";

type GerenciarAtendenteSetorProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
  dataAtendente: HelpDeskSetoresPorAtendenteAtivos | null;
};

type Setor = {
  id: string;
  nome: string;
  empresa_id: string;
  status: boolean;
};

export default function GerenciarAtendenteSetor({
  onClose,
  dataAtendente,
}: GerenciarAtendenteSetorProps) {
  const VoltarIcon = iconsMap.voltar;

  // Estados locais
  const [originalSetores, setOriginalSetores] = useState<Setor[]>([]);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingSetores, setIsLoadingSetores] = useState(true);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  // Carrega setores iniciais quando dataAtendente muda
  useEffect(() => {
    if (!dataAtendente) return;
    const initial: Setor[] = (dataAtendente.Setores as any[]).map((s: any) => ({
      id: s.id,
      nome: s.nome,
      empresa_id: s.empresa_id,
      status: Boolean(s.kanban_atendente_setores.status),
    }));
    setOriginalSetores(initial);
    setSetores(initial);
    setIsLoadingSetores(false);
  }, [dataAtendente]);

  // Filtra setores quando searchTerm ou lista original muda
  useEffect(() => {
    const filtered = originalSetores.filter((s) =>
      s.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSetores(filtered);
  }, [searchTerm, originalSetores]);

  const handleToggleSetor = async (
    setorId: string,
    currentStatus: boolean
  ) => {
    if (!dataAtendente) return;
    setLoadingIds((prev) => new Set(prev).add(setorId));
    try {
      if (currentStatus) {
       const res =  await desativandoAtendentedoSetorHelpdesk(dataAtendente.id, setorId);
       console.log(res);
       if (res.success){
         toast.success("Usuário ativado");
        }else{
          
          toast.error("Usuário ativado");
        }
      } else {
        const res =   await habilitandotivaSetorAtendente(dataAtendente.id, setorId);
         if (res.success){
         toast.success("Usuário desativado");
        }
      }
      setOriginalSetores((prev) =>
        prev.map((s) => (s.id === setorId ? { ...s, status: !currentStatus } : s))
      );
      // O effect de filtro vai atualizar `setores`
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(setorId);
        return next;
      });
    }
  };

  return (
    <Form.Root className="w-full h-full">
      <div onClick={() => onClose(false)} className="cursor-pointer p-2">
        <VoltarIcon className="h-6 w-6 text-gray-700 active:scale-95 duration-75" />
      </div>
      <Form.InputText
        placeholder="Pesquise o setor"
        className="mb-4"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />

      <div className="space-y-2 max-h-60 overflow-auto">
        {isLoadingSetores ? (
          <p className="p-5 text-center">Carregando setores...</p>
        ) : setores.length > 0 ? (
          setores.map((item) => {
            const isLoading = loadingIds.has(item.id);
            return (
              <div
                key={item.id}
                className="border-primary-100/35 hover:bg-primary-200/50 flex items-center justify-between rounded-md border p-3 transition"
              >
                <span>{item.nome}</span>
                <div
                  onClick={() =>
                    !isLoading && handleToggleSetor(item.id, item.status)
                  }
                  className={
                    `relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ` +
                    (item.status ? "bg-green-500" : "bg-red-500") +
                    (isLoading ? " opacity-50 cursor-not-allowed" : "")
                  }
                >
                  <span
                    className={
                      `inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ` +
                      (item.status ? "translate-x-8" : "translate-x-0")
                    }
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="p-5 text-center">Nenhum setor disponível.</p>
        )}
      </div>
    </Form.Root>
  );
}
