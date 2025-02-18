import React from "react";
import { twMerge } from "tailwind-merge";

type BlurCircleProps = React.ComponentProps<"div">;

export default function BlurCircle({ ...props }: BlurCircleProps) {
  return (
    <div
      className={twMerge(
        `bg-primary-500/50 animate-move-low-move fixed -z-10 size-[65dvh] rounded-full blur-3xl`,
        props.className,
      )}
    ></div>
  );
}
