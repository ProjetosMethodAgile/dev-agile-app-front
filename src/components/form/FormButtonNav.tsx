
type FormButtonNavProps = React.ComponentProps<"button"> & {
  direction: 'Continuar' | 'Voltar';
  icon: React.ElementType;
};

export default function FormButtonNav({direction,icon:Icon,...props}: FormButtonNavProps){

    return <button
    className="bg-primary-300 px-4 py-3 col-start-3 active:bg-primary-500 flex justify-between
    text-md cursor-pointer rounded-[12px] font-semibold focus-within:border-primary-600 hover:border-primary-600 
    transition-all outline-none hover:bg-primary-300/90 focus:bg-primary-300/90 self-end
    hover:shadow-[0px_0px_2px_2px] focus-within:shadow-[0px_0px_2px_2px] shadow-primary-300/40 text-primary-50"
    type="submit"
    {...props}
  >
    {direction}
    {Icon && <Icon className="text-gray-600 dark:text-gray-400" />}
  </button>
}