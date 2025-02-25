import React, { ReactNode } from 'react'

type NavMenu = React.ComponentProps<"div"> & {
  children: ReactNode;
 
};

export default function NavBarMenuChat ({ children,...props}:NavMenu) {
  return (
    <div  {...props} >{children}</div>
  )
}
