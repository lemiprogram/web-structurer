import React from 'react'
import { FaFolder, FaHome, FaUser } from 'react-icons/fa'
import { GrTemplate } from 'react-icons/gr'
import { IoMdAddCircle } from 'react-icons/io'
import { IoSettings } from 'react-icons/io5'
import {NavLink} from "react-router-dom"
function NavBar() {
  return (
    <>
        <div 
            className="sideNav h-full py-4 px-2 bg-[var(--bg-200)] flex flex-col justify-between"
            id="main-nav"
        >
            
            
            <div className="nav-items">
                <NavLink to="/">
                    <div className="nav-item ">
                        <div className="icon">
                            <FaHome/>
                        </div>
                        <div className="title">Home</div>
                    </div>
                </NavLink>
                <NavLink to="/create">
                    <div className="nav-item 
                    ">
                            <IoMdAddCircle size='x'/>
                    </div>
                </NavLink>
                
            </div>
            
        </div>
    </>
  )
}

export default NavBar