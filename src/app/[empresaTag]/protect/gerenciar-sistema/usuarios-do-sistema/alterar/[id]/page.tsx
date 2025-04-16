import getRolesAll from "@/actions/getRolesAll";
import getUserById from "@/actions/getUserById";
import FormStepsUser from "@/components/formSteps/createUser/FormStepsUser";
import ScreenTitle from "@/components/titles/ScreenTitle";
import { UserCheck } from "lucide-react";
import React from "react";

type AtualizarUsuariosProps = {
  params: Promise<{ id: string }>;
};

const AtualizarUsuarioPage = async ({ params }: AtualizarUsuariosProps) => {
  const roles = await getRolesAll();
  const { data } = await getUserById((await params).id);
  if (!data) throw new Error("Usuário não encontrado");
  const userData = data.usuario;

  if (!roles.ok)
    throw new Error(roles.error || "Não foi possivel obter as Roles");

  return (
    <div className="container">
      <ScreenTitle
        title={`Usuarios do sistema - Atualizar - ${userData.nome}`}
        icon={UserCheck}
      />

      <FormStepsUser
        rolesData={roles.data || []}
        isEditMode
        defaultValues={{
          ...userData,
          role: userData.usuario_roles[0].id,
          permissoes: userData.permissoes,
        }}
      />
    </div>
  );
};

export default AtualizarUsuarioPage;
