import React from 'react'
type FormParagrafo = React.ComponentProps<"p">;
export default function FormsParagrafo({ children,...props }: FormParagrafo)  {
  return (
  <p {...props}>{children}</p>
  )
}
