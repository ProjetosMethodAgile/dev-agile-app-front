import { twMerge } from "tailwind-merge";
type SectionTitle = React.ComponentProps<"h1"> & {
  title: string;
};

export default function SectionTitle({ className, title }: SectionTitle) {
  return (
    <h1
      className={twMerge(
        "dark:text-primary-200 col-span-full flex items-center gap-2 text-2xl",
        className,
      )}
    >
      {title}
    </h1>
  );
}
