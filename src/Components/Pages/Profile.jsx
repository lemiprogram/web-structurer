import React, { useContext } from 'react'
import { StructureContext } from '../../App'

function Profile() {
  const greeting = useContext(StructureContext)
  return (
        <>
            <div 
                className="page"
                id='home-section'
            ></div>
        </>
  )
}

export default Profile