import React, { useContext, useEffect, useRef, useState } from 'react'
import './WebStructure.css'
import { v4 as uuidv4 } from 'uuid';
import { FaBars, FaGreaterThan } from 'react-icons/fa'
import { StructureContext } from '../../App'
import Accordion from './StaticStructures/Accordion'
import EditNav from './EditNav';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

function WebStructure() {
  const [isEditing,setIsEditing] = useState(true)
  const [showEditNav, setShowEditNav] = useState(true)
  const [showFullScreen, setShowFullScreen] = useState(true)
  const {currentStructure ,setCurrentStructure} = useContext(StructureContext)
  const editNav = useRef(null)
  
  const showFullScreenFunc = (fS)=>{
    if(!editNav.current){
      return
    }
    const mainNav = document.querySelector("#main-nav")
    if(fS){

      editNav.current.style.transition = "1s"
      editNav.current.style.width = "auto"
      editNav.current.style.opacity = "100%"
      mainNav.style.transition = "1s"
      mainNav.style.display = "flex"
      mainNav.style.opacity = "100%"
      return 
    }
    mainNav.style.display = "none"
    mainNav.style.transition = ".3s"
    mainNav.style.opacity = "0%"
    editNav.current.style.transition = ".3s"
    editNav.current.style.opacity = "0%"
    
    setTimeout(()=>editNav.current.style.width = "0px",50)    
    
  }
  const showEditNavFunc = (sE)=>{
    if(!editNav.current){
      return
    }
    if(sE){

      editNav.current.style.transition = "1s"
      editNav.current.style.width = "auto"
      editNav.current.style.opacity = "100%"
      return 
    }
    editNav.current.style.transition = ".3s"
    editNav.current.style.opacity = "0%"
    
    setTimeout(()=>editNav.current.style.width = "0px",50)    
    
  }
  return (
    <>
        <div className="flex page">
          <div 
            className="sideNav h-full py-4  bg-[var(--bg-300)] flex flex-col justify-center editNav "
            ref={editNav}
          >
            <EditNav selections={{
              structures:{
                id:uuidv4(),
                content:["Nav","Main","SidNav"],
                isOpen:false
              },
              styles:{
                id:uuidv4(),
                content:["Nav","Main","SidNav"],
                isOpen:false
              }
            }} />
          </div>
          <div className="page grid  relative">
              <div className="btns flex absolute top-0 right-0 items-center">
                <div
                  className="btn edit-menu-btn "
                  onClick={()=>setShowEditNav(sE=>{
                    showEditNavFunc(!sE)
                    return !sE
                  })}
                ><FaBars size="23px"/></div>
                <div
                  className="btn edit-menu-btn"
                  onClick={()=>setShowFullScreen(fS=>{
                    showFullScreenFunc(!fS)
                    return !fS
                  })}
                >{showFullScreen?<MdFullscreen size="30px" />:<MdFullscreenExit size="30px"/>}</div>
              </div>
              <div>cat</div>

          </div>
        </div>
    </>
  )
}

export default WebStructure