import { twMerge } from "tailwind-merge";

export type ModalProps = React.ComponentProps<"div"> & {};

export default function Modal({ children, className, ...props }: ModalProps) {
  return (
    <div className={twMerge("", className)} {...props}>
      {children}
    </div>
  );
}
