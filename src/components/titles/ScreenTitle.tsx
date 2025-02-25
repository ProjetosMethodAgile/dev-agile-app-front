import { twMerge } from "tailwind-merge";

type ScreenTitleProps = React.ComponentProps<"h1"> & {
  title: string;
  icon: React.ElementType;
};

export default function ScreenTitle({
  title,
  icon: Icon,
  className,
  ...props
}: ScreenTitleProps) {
  return (
    <h1
      className={twMerge(
        "dark:text-general mb-6 flex items-center gap-2 text-4xl font-semibold",
        className,
      )}
      {...props}
    >
      <Icon className="size-8" />
      {title}
    </h1>
  );
}
