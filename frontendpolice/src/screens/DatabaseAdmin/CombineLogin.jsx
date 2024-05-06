import React from 'react'
import DatabaseAdminLogin from './DatabaseAdminLogin'
import { Outlet } from 'react-router-dom'

export default function CombineLogin() {
  return (
    <div>

        <Outlet/>

    </div>
  )
}
