import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoCreateOutline } from 'react-icons/io5'
import { IoSettingsOutline } from 'react-icons/io5'

const routerList = [
  {
    text: 'Invoices',
    icon: <IoCreateOutline />,
    path: '/',
  },
  {
    text: 'Form',
    icon: <IoCreateOutline />,
    path: '/create',
  },
  {
    text: 'Settings',
    icon: <IoSettingsOutline />,
    path: '/settings',
  },
]

export const Menu = () => {
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
    </ul>
  )
}
