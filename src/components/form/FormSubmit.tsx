type FormSubmit = React.ComponentProps<"button">;

export default function FormSubmit({ ...props }: FormSubmit) {
  return (
    <button
      className="bg-primary-300 active:bg-primary-500 h-10 w-full cursor-pointer rounded-[10px] font-bold"
      type="submit"
      {...props}
    >
      Entrar
    </button>
  );
}
