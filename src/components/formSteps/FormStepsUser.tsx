"use client";

import React, { useActionState, useEffect } from "react";
import { Form } from "../form";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import RegisterNavigation from "../nav/registersNavigation/RegisterNavigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  MailIcon,
  Phone,
  UserCircle,
} from "lucide-react";
import { RoleData, PermissaoCompletaData } from "@/types/api/apiTypes";
import PermissionsMenu from "./permissionsMenu/PermissionsMenu";
import { postUser } from "@/actions/postUser";
import { useGlobalContext } from "@/context/globalContext";

type FormStepsUser = {
  rolesData: RoleData[];
  permissoesData: PermissaoCompletaData[];
};

export default function FormStepsUser({
  rolesData,
  permissoesData,
}: FormStepsUser) {
  const [activeTab, setActiveTab] = React.useState("informacoes");
  const [currentRoles, setCurrentRoles] = React.useState<RoleData[] | []>(
    rolesData,
  );
  const { openGlobalModal, closeGlobalModal } = useGlobalContext();
  const [state, formAction] = useActionState(postUser, {
    errors: [],
    msg_success: "",
    success: false,
  });

  useEffect(() => {
    if (state?.errors.length) {
      state.errors.forEach((erro: string) => {
        toast.error(erro);
      });
    }
    if (state?.success) {
      toast.success(state.msg_success);
      closeGlobalModal();
      redirect("/devagile/protect/gerenciar-sistema/usuarios-do-sistema");
    }
  }, [state]);


  return (
    <div className="flex gap-5">
      <RegisterNavigation setActiveTab={setActiveTab} activeTab={activeTab} />
      <Form.Root action={formAction}>
      
          <div className={`${activeTab !== 'informacoes' ? 'hidden' : ''}`}>
            <Form.Section title="Dados do usuario">
              <Form.InputText
                icon={UserCircle}
                inputId="nome"
                name="nome"
                label="Nome"
              />
              <Form.InputText
                icon={Phone}
                inputId="contato"
                name="contato"
                label="Contato"
              />
            </Form.Section>
            <Form.Section title="Acesso ao sistema">
              <Form.InputText
                icon={MailIcon}
                inputId="email"
                type="mail"
                name="email"
                label="Email"
              />
              <Form.InputText
                icon={KeyRound}
                inputId="senha"
                type="password"
                name="senha"
                label="Senha"
              />
              <Form.InputText
                icon={KeyRound}
                inputId="confirmar_senha"
                type="password"
                name="senha"
                label="Confirmar Senha"
              />
            </Form.Section>
            <Form.ButtonNext
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("permissoes");
              }}
              direction="Continuar"
              icon={ChevronRight}
            />
          </div>
          <div className={`${activeTab !== 'permissoes' ? 'hidden' : ''}`}>
            <Form.Section title="Perfil">
              <Form.InputSelect
                options={currentRoles}
                label="Tipo de usuario"
                id="tipo_usuario"
              />
            </Form.Section>
            <Form.Section title="Permissões">
              <PermissionsMenu permissoesData={permissoesData} />
            </Form.Section>

            <div className="flex justify-between">
              <Form.ButtonBack
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("informacoes");
                }}
                direction="Voltar"
                icon={ChevronLeft}
              />
              <Form.ButtonNext
                type="submit"
                direction="Finalizar"
                icon={Check}
              />
            </div>
          </div>

      </Form.Root>
    </div>
  );
}
