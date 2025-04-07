import { twMerge } from "tailwind-merge";
import SectionTitle from "../titles/SectionTitle";

type FormSectionProps = React.ComponentProps<"div"> & {
  title?: string;
  children?: React.ReactNode;
};

export default function FormSection({
  title,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <div
      className={twMerge(
        "border-primary-300/20 grid grid-cols-4  gap-3 border-b-1 pb-7 mb-7",
        className,
      )}
      {...props}
    >
      {title && <SectionTitle title={title} />}
      {children}
    </div>
  );
}
