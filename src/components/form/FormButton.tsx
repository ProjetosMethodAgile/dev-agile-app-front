type FormButtonProps = React.ComponentProps<"button"> & {
  children: string;
};

export default function FormButton({ children, ...props }: FormButtonProps) {
  return (
    <button className="bg-teal-500 p-2 w-full" {...props}>
      {children}
    </button>
  );
}
