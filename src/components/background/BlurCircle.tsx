"use client";

import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type BlurCircleProps = React.ComponentProps<"div">;

export default function BlurCircle({ ...props }: BlurCircleProps) {
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") || "light";
    window.document.documentElement.classList.add(localTheme);
  }, []);

  return (
    <div
      className={twMerge(
        `dark:bg-primary-500/50 bg-primary-300/40 animate-move-low-move fixed -z-10 size-[65vh] rounded-full blur-3xl`,
        props.className,
      )}
    ></div>
  );
}
