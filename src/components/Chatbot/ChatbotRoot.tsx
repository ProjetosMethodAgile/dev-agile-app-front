
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ChatbootRootProps = React.ComponentProps<"div"> & {
  children: ReactNode;
};


export default function ChatRoot({ children,className, ...props }: ChatbootRootProps) {
  
  return (
    <div
      className={twMerge(` animate-move-left-to-right dark:border-primary-600/70 border-primary-300 bg-trnasparent   gap-6 rounded-3xl border-2 p-5 backdrop-blur-2xl  dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl`,className)}
      {...props}
    >
      {children}
    

    </div>
  );
}
