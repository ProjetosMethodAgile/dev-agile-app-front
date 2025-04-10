import Image from "next/image";

type LogoFormProps = React.ComponentProps<"div"> & {
  src: string;
  alt: string;
};

export default function FormLogo({ src, alt, ...props }: LogoFormProps) {
  return (
    <div {...props}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={600}
        quality={100}
        sizes="100vw"
        className="h-20 w-auto items-center justify-self-center"
      />
    </div>
  );
}
