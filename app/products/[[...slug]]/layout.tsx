import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const ProductPageLayout = ({ children }: Props) => {
  return (
    <div className='flex'>
        <aside className='bg-slate-200 p-5 mr-5'>Product Page</aside>
        <div>{children}</div>
    </div>
  )
}

export default ProductPageLayout