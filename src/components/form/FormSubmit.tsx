type FormSubmit = React.ComponentProps<"button">;

export default function FormSubmit({ ...props }: FormSubmit) {
  return (
    <button
      className="bg-primary-300 rounded-[10px] h-10 w-full font-bold "
      type="submit"
      {...props}
    >
      Entrar
    </button>
  );
}
