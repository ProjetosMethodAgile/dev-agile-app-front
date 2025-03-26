'use client'
import { useGlobalContext } from '@/context/globalContext';
import React, { useEffect, useState } from 'react';
import { MessageCircleMore, X } from 'lucide-react';
import { Form } from '../form';
import { ChatSuspensoMessage } from './ChatSuspensoMessage';
import ChatSuspensoNav from './ChatSuspensoNav';
import getSetoresHelpDesk from '@/actions/getSetoresHelpDesk';
import { SetorHelpDesk } from '@/types/api/apiTypes';

export function ChatSuspenso () {
  const { openGlobalModal, closeGlobalModal } = useGlobalContext();
  const [setores, setSetores] = useState<SetorHelpDesk[]>([]);
  useEffect(() => {
    async function GET_SETOR() {
      const response = await getSetoresHelpDesk();
      if (response.ok && response.data) {
        setSetores(response.data);
      } 
    }
    GET_SETOR();
  }, []);
  

  function handleActiveModal() {
    openGlobalModal(
      <Form.Root className=''>
        <div className='bg-red-500 border-zinc-50 border rounded-full size-7 p-1 flex items-center justify-center justify-self-end'>
          <X className='cursor-pointer' onClick={closeGlobalModal} />
        </div>
        <div className='flex '>
          <ChatSuspensoNav className='overflow-y-auto h-[500px]' setores={setores}  />
          <ChatSuspensoMessage />
        </div>
      </Form.Root>
    );
  }
  
  return (
    <div onClick={handleActiveModal} className='teste'>
      <MessageCircleMore className="size-11 ease-in-out hover:scale-110 duration-300 hover:cursor-pointer" />
    </div>
  );
}
