import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import './WebStructure.css'
import { v4 as uuidv4 } from 'uuid';
import { FaBars, FaGreaterThan } from 'react-icons/fa'
import { StructureContext } from '../../../App'
import Accordion from '../StaticStructures/Accordion'
import EditNav from './EditNav';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import allMyColors from '../../../allMyColors';
import setColorPalette from '../../../setColorPalette';

export const WebStructureContext = createContext()

function WebStructure() {
  const [isEditing,setIsEditing] = useState(true)
  const [showEditNav, setShowEditNav] = useState(true)
  const [showFullScreen, setShowFullScreen] = useState(true)

  const {currentStructure } = useContext(StructureContext)
  
  const editNav = useRef(null)
  const page = useRef(null)

  useEffect(()=>renderCurrentStructure(),[currentStructure.content.styles.colorScheme])
  function renderCurrentStructure(){
    localStorage.setItem("currentStructure",JSON.stringify(currentStructure))
    setColorPalette(page.current,currentStructure.content.styles.colorScheme )
  }
const MAX_WIDTH = 20
const MAX_HEIGHT = 20
const selections={
                        structures:{
                          id:uuidv4(),
                          content:["navs","sideNavs","blocks", "inputs","buttons","Modals"],
                          isOpen:false
                        },
                        styles:{
                          id:uuidv4(),
                          content:{
                            colors:allMyColors(),
                          },
                          isOpen:false
                        }
                      }
                      
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
      console.log(page.current.style.width)

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
      <WebStructureContext.Provider value={{selections, page,editNav}}>
        <div className="flex page">
          
            <EditNav />
          
          <div 
            className="page grid relative"
            ref={page}
            style={{
                    gridTemplateColumns:` repeat(${MAX_WIDTH},auto)`,
                    gridTemplateRows:` repeat(${MAX_HEIGHT},1fr)`,
                  }}
          >
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

          </div>
        </div>
      </WebStructureContext.Provider>
    </>
  )
}

export default WebStructure