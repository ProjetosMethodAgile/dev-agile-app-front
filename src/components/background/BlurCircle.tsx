import React from "react";

type BlurCircleProps = React.ComponentProps<"div"> & {
  positionX: string;
  positionY: string;
};

export default function BlurCircle({ positionX, positionY }: BlurCircleProps) {
  return (
    <div
      className={`bg-primary-500/50 -z-10 rounded-full size-[65vh] fixed blur-3xl -bottom-[${positionY}] -left-[${positionX}]`}
    ></div>
  );
}
