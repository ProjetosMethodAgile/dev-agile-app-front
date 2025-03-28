import getPermissionsAll from "@/actions/getPermissionsAll";
import getRolesAll from "@/actions/getRolesAll";
import FormStepsUser from "@/components/formSteps/createUser/FormStepsUser";
// import FormStepsUser from "@/components/formSteps/FormStepsUser";
import ScreenTitle from "@/components/titles/ScreenTitle";
import { UserCheck } from "lucide-react";
import React from "react";


const CriarUsuarioPage = async () => {
  const roles = await getRolesAll();
  const permissoes = await getPermissionsAll();

  if (!roles.ok)
    throw new Error(roles.error || "Não foi possivel obter as Roles");
  if (!permissoes.ok)
    throw new Error(permissoes.error || "Não foi possivel obter as Permissoes");

  return (
    <div className="container">
      <ScreenTitle title="Usuarios do sistema - Cadastro" icon={UserCheck} />
       <FormStepsUser
        rolesData={roles.data || []}
        permissoesData={permissoes.data || []}
      /> 
    </div>
  );
};

export default CriarUsuarioPage;
