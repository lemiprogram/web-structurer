import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
        <>
            <div className="flex h-[100vh] w-[100vw]">
                <NavBar/>
                <Outlet/>
            </div>
        </>

    )
}

export default Layout