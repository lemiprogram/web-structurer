import React from 'react'
import { FaHome, FaUser } from 'react-icons/fa'
import { FaSpaghettiMonsterFlying } from 'react-icons/fa6'
import {NavLink} from "react-router-dom"
function NavBar() {
  return (
    <>
        <div className="sideNav h-full py-4 px-2 bg-[var(--bg-200)] flex flex-col justify-between">
            <div className="nav-items flex flex-col">
                <NavLink to="/profile">
                    <div className="nav-item ">
                         <FaUser/> 
                     </div>
                </NavLink>
            </div>
            <div className="nav-items flex flex-col">
                <NavLink to="/">
                    <div className="nav-item ">
                         <FaHome/> 
                     </div>
                </NavLink>
                
            </div>
            <div className="nav-items">
                <NavLink to="/profile">
                    <div className="nav-item ">
                         <FaSpaghettiMonsterFlying/> 
                     </div>
                </NavLink>
            </div>
        </div>
    </>
  )
}

export default NavBar