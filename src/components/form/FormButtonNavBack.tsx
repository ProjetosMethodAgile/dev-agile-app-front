type FormButtonNavBackProps = React.ComponentProps<"button"> & {
  direction: "Continuar" | "Voltar";
  icon: React.ElementType;
};

export default function FormButtonNavBack({
  direction,
  icon: Icon,
  ...props
}: FormButtonNavBackProps) {
  return (
    <button
      className=" text-primary-300 border-1 active:bg-primary-500 text-md focus-within:border-primary-600
       hover:border-primary-600 hover:bg-primary-300/90 hover:text-primary-50 focus:bg-primary-300/90 shadow-primary-300/40
        col-start-3 flex cursor-pointer justify-between self-start rounded-[12px] px-4 py-3 
        font-semibold  transition-all outline-none focus-within:shadow-[0px_0px_2px_2px] hover:shadow-[0px_0px_2px_2px] group"
      type="submit"
      {...props}
    >
      {Icon && <Icon className=" text-primary-300 group-hover:text-primary-50" />}
      {direction}
    </button>
  );
}
