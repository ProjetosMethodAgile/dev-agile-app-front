type FormErrorProps = React.ComponentProps<"p"> & {
  children: string;
};

export default function FormError({ children, ...props }: FormErrorProps) {
  return (
    <p className="text-red-500" {...props}>
      {children}
    </p>
  );
}
