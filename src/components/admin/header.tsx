import Link from 'next/link'
import React from 'react'

const AdminHeader = () => {
  return (
    <nav className='w-full h-16 bg-white border-b flex items-center px-4'>
        <ul className='flex gap-4 justify-center items-center w-full'>
            <li>
                <Link href={"/dashboard"}>Home</Link>
            </li>
            <li>
                <Link href={"/dashboard/products"}>Products</Link>
            </li>
            <li>
                <Link href={"/dashboard/orders"}>Orders</Link>
            </li>
            <li>
                <Link href={"/dashboard/contacts"}>Contacts</Link>
            </li>
        </ul>
    </nav>
  )
}

export default AdminHeader