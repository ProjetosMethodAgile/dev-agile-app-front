import React from "react";
import { Form } from "@/components/form";

interface ModalGerenciarProps {
  children?: React.ReactNode;
  onClose: () => void;
}

export default function ModalGerenciar({
  children,
  onClose,
}: ModalGerenciarProps) 


{
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className="
          relative 
        
          box-border           
          rounded-lg 
          p-6 
          w-full 
          max-w-[37rem]       
          max-h-[90vh] 
          overflow-y-auto 
          overflow-x-hidden 
          flex 
          flex-col          
          gap-6              
        "
      >
        {/* Botão fechar */}
        <button
          type="button"
          aria-label="Fechar Modal"
          className="absolute top-4 right-4 z-20 text-white bg-red-500 size-7 rounded-full flex items-center justify-center hover:bg-red-500/90 hover:scale-102"
          onClick={onClose}
        >
          ×
        </button>

        {/* Conteúdo do Form */}
        <Form.Root className="w-full flex flex-col gap-4">
          <Form.InputText
            type="text"
            className="
              w-full           
              rounded 
              p-2 
              focus:outline-none 
              focus:ring 
              focus:ring-primary-200
            "
            placeholder="Digite aqui..."
          />

          {children}
        </Form.Root>
      </div>
    </div>
  );
}
