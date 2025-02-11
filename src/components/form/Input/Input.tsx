type InputProps = React.ComponentProps<"input"> & {};

export default function Input({ ...props }: InputProps) {
  return <input {...props} />;
}
