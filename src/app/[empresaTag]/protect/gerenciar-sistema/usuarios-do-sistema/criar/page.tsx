import getRolesAll from "@/actions/getRolesAll";
import FormStepsUser from "@/components/formSteps/createUser/FormStepsUser";
// import FormStepsUser from "@/components/formSteps/FormStepsUser";
import ScreenTitle from "@/components/titles/ScreenTitle";
import { UserCheck } from "lucide-react";
import React from "react";

const CriarUsuarioPage = async () => {
  const roles = await getRolesAll();

  if (!roles.ok)
    throw new Error(roles.error || "Não foi possivel obter as Roles");




  return (
    <div className="container">
      <ScreenTitle title="Usuarios do sistema - Cadastro" icon={UserCheck} />
      <FormStepsUser
        rolesData={roles.data || []}
      /> 
    </div>
  );
};

export default CriarUsuarioPage;
