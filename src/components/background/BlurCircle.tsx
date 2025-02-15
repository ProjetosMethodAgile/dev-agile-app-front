import React from "react";
import { twMerge } from "tailwind-merge";

type BlurCircleProps = React.ComponentProps<"div">;

export default function BlurCircle({ ...props }: BlurCircleProps) {
  return (
    <div
      className={twMerge(
        `bg-primary-500/50 -z-10 rounded-full size-[65vh] fixed blur-3xl`,
        props.className
      )}
    ></div>
  );
}
