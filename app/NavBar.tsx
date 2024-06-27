import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className='flex bg-slate-200 p-5'>
        <Link href="/" className='mr-5'>Home</Link>
        <Link href="/users" className='mr-5'>Users</Link>
        <Link href="/products" className='mr-5'>Products</Link>
        <Link href="/admin" className='mr-5'>Admin</Link>
    </div>
  )
}

export default NavBar