type FormSubmit = React.ComponentProps<"button">;

export default function FormSubmit({ ...props }: FormSubmit) {
  return (
    <button
      className="bg-primary-300 active:bg-primary-500 h-10 w-full 
      text-xl cursor-pointer rounded-[12px] font-semibold focus-within:border-primary-600 hover:border-primary-600 transition-all outline-none hover:bg-primary-300/90 focus:bg-primary-300/90
      hover:shadow-[0px_0px_2px_2px] focus-within:shadow-[0px_0px_2px_2px] shadow-primary-300/40 text-white"
      type="submit"
      {...props}
    >
      Entrar
    </button>
  );
}
