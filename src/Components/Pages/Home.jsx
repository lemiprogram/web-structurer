import React from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
  return (
        <>
            <div 
                className="page grid place-content-center"
                id='home-section'
            >
                <div className=" card flex flex-col bg-[var(--bg-200)] p-5 items-center rounded-lg">
                    <div className="heading text-[var(--primary-100)] text-3xl p-4">Welcome  to JustStructs</div>
                    <div className='text-xl'>... an online web structuring app</div>
                    <NavLink to="/create">
                                        <div className="nav-item  text-xl bg-[var(--primary-100)] rounded-full px-4 py-2 capitalize mt-4 
                                        ">
                                                get Started
                                        </div>
                                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Home