'use client'

import { Form } from "@/components/form";
import RegisterNavigation from "@/components/nav/registersNavigation/RegisterNavigation";
import ScreenTitle from "@/components/titles/ScreenTitle";
import SectionTitle from "@/components/titles/SectionTitle";
import { ArrowDownToDot, ChevronLeft, ChevronRight, Circle, KeyIcon, KeyRound, MailCheck, MailIcon, MailMinus, User, User2, UserCheck, UserCircle } from "lucide-react";
import React from "react";

const GerenciarUsuariosPage = () => {
  const [activeTab, setActiveTab] = React.useState("informacoes");

  return (
    <div className="container">
      <ScreenTitle title="Usuarios do sistema - Cadastro" icon={UserCheck} />
      <div className="flex gap-5">
      <RegisterNavigation setActiveTab={setActiveTab} activeTab={activeTab} />
       <Form.Root >
        {activeTab === 'informacoes' && <div>
          <Form.Section title="Dados do usuario" >
            <Form.InputText icon={UserCircle} id="nome"  name="nome" label="Nome do usuario" />
          </Form.Section>
          <Form.Section title="Acesso ao sistema" >
            <Form.InputText icon={MailIcon} id="email" type="mail"  name="email" label="Email" />
            <Form.InputText icon={KeyRound} id="senha" type="password"  name="senha" label="Senha" />
            <Form.InputText icon={KeyRound} id="senha"  type="password" name="senha" label="Confirmar Senha" />
          </Form.Section>
          <Form.ButtonNav direction="Continuar" icon={ChevronRight}/>
          </div>}
          {activeTab === 'permissoes' && <div>
            <Form.Section title="Permissoes do usuario" >
              <Form.InputText icon={User2} id="nome"  name="nome" label="Nome do usuario" />
            </Form.Section>
            <Form.ButtonNav direction="Continuar" icon={ChevronRight}/>
            </div>}
       </Form.Root>
      </div>
    </div>
  );
};

export default GerenciarUsuariosPage;
