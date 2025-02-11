type InputProps = React.ComponentProps<"label"> & {
  children: React.ReactNode;
  text?: string;
};

export default function InputLabelRoot({
  children,
  text,
  ...props
}: InputProps) {
  return (
    <label {...props}>
      {text}
      {children}
    </label>
  );
}
