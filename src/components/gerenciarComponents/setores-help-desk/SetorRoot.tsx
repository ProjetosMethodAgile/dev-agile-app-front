"use client";

import { ReactNode } from "react";

export type SetorRootProps = React.ComponentProps<"div"> & {
  children: ReactNode;
};

export default function SetorRoot({ children, ...props }: SetorRootProps) {
  return <div {...props}>{children}</div>;
}
