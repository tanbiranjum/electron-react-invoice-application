import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoCreateOutline } from 'react-icons/io5'
import { IoSettingsOutline, IoExitOutline } from 'react-icons/io5'
import { signOut, getAuth } from 'firebase/auth'

const routerList = [
  {
    text: 'Invoices',
    icon: <IoCreateOutline className='mr-1'/>,
    path: '/',
  },
  {
    text: 'Form',
    icon: <IoCreateOutline className='mr-1'/>,
    path: '/create',
  },
  {
    text: 'Settings',
    icon: <IoSettingsOutline className='mr-1'/>,
    path: '/settings',
  },
]

export const Menu = () => {
  const auth = getAuth()
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <ul className="menu w-64 p-3 border h-screen bg-slate-700 text-white">
      <li className="menu-title">
        <span>
          <p className="text-white">Menu</p>
        </span>
      </li>
      {routerList.map((item, index) => (
        <li key={index} className="mb-2">
          <NavLink to={item.path}>
            {item.icon}
            {item.text}
          </NavLink>
        </li>
      ))}
      <li className="mb-2 mt-auto bg-red-600 rounded" onClick={handleLogout}>
        <a>
          <IoExitOutline className='mr-1'/>
          Logout
        </a>
      </li>
    </ul>
  )
}
