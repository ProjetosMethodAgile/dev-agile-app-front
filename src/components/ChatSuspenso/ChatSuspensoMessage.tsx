import React from 'react'
import { ChatInputChatSuspenso } from './ChatInputChatSuspenso'
import { Message } from './Message'

export function ChatSuspensoMessage () {
  return (
    <div className='w-2xl flex flex-col justify-between'>
        <Message />
        <ChatInputChatSuspenso/>
    </div>
  )
}
