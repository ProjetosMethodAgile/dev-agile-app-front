import getRolesAll from "@/actions/getRolesAll";
import getUser from "@/actions/getUser";
import getUserById from "@/actions/getUserById";
import FormStepsUser from "@/components/formSteps/createUser/FormStepsUser";
import ScreenTitle from "@/components/titles/ScreenTitle";
import { UserCheck } from "lucide-react";
import React from "react";

type AtualizarUsuariosProps = {
  params: { id: string };
};

const AtualizarUsuarioPage = async ({ params }: AtualizarUsuariosProps) => {
  const roles = await getRolesAll();
  const { data } = await getUserById(params.id);
  if (!data) throw new Error("Usuário não encontrado");
  const userData = data.usuario;

  if (!roles.ok)
    throw new Error(roles.error || "Não foi possivel obter as Roles");

  return (
    <div className="container">
      <ScreenTitle title="Usuarios do sistema - Atualizar" icon={UserCheck} />

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
