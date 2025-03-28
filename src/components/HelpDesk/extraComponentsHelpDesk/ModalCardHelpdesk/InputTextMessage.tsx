"use client";

import iconsMap from "@/utils/iconsMap";

export type InputTextMessageProps = React.ComponentProps<"input"> & {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function InputTextMessage({
  message,
  setMessage,
  ...props
}: InputTextMessageProps) {
  const Send = iconsMap["sendMessage"];

  async function handleSendMessage() {}

  return (
    <div
      className="bg-primary-200 m-1 flex items-center rounded-2xl p-1"
      {...props}
    >
      <input
        className="placeholder:text-primary-150 flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl dark:text-gray-100 dark:placeholder:text-gray-100"
        type="text"
        value={message}
        placeholder="Digite sua mensagem"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />

      <Send
        className="bg-primary-100 active:bg-primary-150 h-[40px] w-[60px] cursor-pointer rounded-2xl p-1 active:scale-95"
        onClick={() => handleSendMessage()}
      />
    </div>
  );
}
