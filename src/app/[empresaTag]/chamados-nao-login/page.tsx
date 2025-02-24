import ToggleTheme from "@/components/button/ToggleTheme";
import Chatbot from "@/components/Chatbot/Chatbot";

export default function chamadosSemLogin(){
    return(
        <div className="m-auto flex h-screen items-center justify-center gap-10 max-lg:mx-6 max-lg:flex-col max-lg:items-center max-lg:gap-0 max-lg:px-2 max-sm:mx-2 max-sm:h-full max-sm:p-0 dark:text-white" >
            <ToggleTheme/>
            <Chatbot />
        </div>
    )
}