type LogoFormProps = React.ComponentProps<"div"> & {
  src: string;
  alt: string;
};

export default function FormLogo({ src, alt, ...props }: LogoFormProps) {
  return (
    <div {...props}>
      <img
        src={src}
        alt={alt}
        className=" justify-self-center items-center h-15 "
      />
    </div>
  );
}
