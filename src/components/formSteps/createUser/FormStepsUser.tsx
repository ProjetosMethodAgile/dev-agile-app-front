"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Form } from "../../form";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import RegisterNavigation from "../../nav/registersNavigation/RegisterNavigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  MailIcon,
  Phone,
  UserCircle,
} from "lucide-react";
import { RoleData, PermissoesRole } from "@/types/api/apiTypes";
import PermissionsMenu from "./permissionsForm/permissionsMenu/PermissionsMenu";
import { postUser } from "@/actions/postUser";
import { useGlobalContext } from "@/context/globalContext";
import getPermissionsByRoleId from "@/actions/getPermissionsByRoleId";

type FormStepsUser = {
  rolesData: RoleData[];
};

export default function FormStepsUser({ rolesData }: FormStepsUser) {
  const [activeTab, setActiveTab] = React.useState("informacoes");
  const [currentRoles, setCurrentRoles] = React.useState<RoleData[] | []>(
    rolesData,
  );
  const { closeGlobalModal } = useGlobalContext();
  const [usersData, setUsersData] = React.useState({
    nome: "",
    contato: "",
    email: "",
    senha: "",
    confirmar_senha: "",
  });
  const [permissoesData, setPermissoesData] = useState<PermissoesRole[] | []>(
    [],
  );

  function handleRoleChange(role_id: string) {
    async function getPermissions() {
      const { data } = await getPermissionsByRoleId(role_id);
      if (data) {
        setPermissoesData(data);
      }
    }
    getPermissions();
  }

  function inputsValidate(
    e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    if (!usersData.nome || !usersData.email || !usersData.senha) {
      if (!usersData.nome) toast.error("Nome é obrigatório.");
      if (!usersData.email) toast.error("Email é obrigatório.");
      if (!usersData.senha) toast.error("Senha é obrigatório.");
      if (usersData.senha !== usersData.confirmar_senha)
        toast.error("As senhas não coincidem");
      return false;
    } else if (usersData.senha !== usersData.confirmar_senha) {
      toast.error("As senhas não coincidem");
      return false;
    } else {
      setActiveTab("permissoes");
      return true;
    }
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="flex gap-5">
      <RegisterNavigation
        inputsValidate={inputsValidate}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <Form.Root className="w-full" action={formAction}>
        <div className={` ${activeTab !== "informacoes" ? "hidden" : ""}`}>
          <Form.Section title="Dados do usuario">
            <Form.InputText
              icon={UserCircle}
              inputId="nome"
              name="nome"
              label="Nome"
              className="col-span-2"
              value={usersData.nome}
              onChange={(e) =>
                setUsersData({
                  ...usersData,
                  nome: (e.target as HTMLInputElement).value,
                })
              }
            />
            <Form.InputText
              icon={Phone}
              inputId="contato"
              name="contato"
              label="Contato"
              className="col-span-1"
              value={usersData.contato}
              onChange={(e) =>
                setUsersData({
                  ...usersData,
                  contato: (e.target as HTMLInputElement).value,
                })
              }
            />
          </Form.Section>
          <Form.Section title="Acesso ao sistema">
            {/* <Form.InputSelect
              options={[
                { id: "ativo", nome: "Ativo" },
                { id: "inativo", nome: "Inativo" },
              ]}
              label="Status"
              id="status"
              name="status"
              defaultOptionText="Ativo"
            /> */}
            <Form.InputText
              icon={MailIcon}
              inputId="email"
              type="mail"
              name="email"
              label="Email"
              className="col-span-2"
              value={usersData.email}
              onChange={(e) =>
                setUsersData({
                  ...usersData,
                  email: (e.target as HTMLInputElement).value,
                })
              }
            />
            <Form.InputText
              icon={KeyRound}
              inputId="senha"
              type="password"
              name="senha"
              label="Senha"
              value={usersData.senha}
              onChange={(e) =>
                setUsersData({
                  ...usersData,
                  senha: (e.target as HTMLInputElement).value,
                })
              }
            />
            <Form.InputText
              icon={KeyRound}
              inputId="confirmar_senha"
              type="password"
              name="senha"
              label="Confirmar Senha"
              value={usersData.confirmar_senha}
              onChange={(e) =>
                setUsersData({
                  ...usersData,
                  confirmar_senha: (e.target as HTMLInputElement).value,
                })
              }
            />
          </Form.Section>
          <Form.ButtonNext
            type="submit"
            onClick={inputsValidate}
            direction="Continuar"
            icon={ChevronRight}
          />
        </div>
        <div className={`${activeTab !== "permissoes" ? "hidden" : ""}`}>
          <Form.Section title="Perfil">
            <Form.InputSelect
              options={currentRoles}
              setOptions={setCurrentRoles}
              label="Tipo de usuario"
              id="tipo_usuario"
              name="tipo_usuario"
              defaultOptionText="Selecione"
              onChange={(id) => {
                handleRoleChange(id);
              }}
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
            <Form.ButtonNext type="submit" direction="Finalizar" icon={Check} />
          </div>
        </div>
      </Form.Root>
    </div>
  );
}
