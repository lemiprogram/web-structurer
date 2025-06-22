import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import './WebStructure.css'
import { v4 as uuidv4 } from 'uuid';
import { FaBars, FaEdit, FaGreaterThan } from 'react-icons/fa'
import { StructureContext } from '../../../App'
import Accordion from '../StaticStructures/Accordion'
import EditNav from './EditNav';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import allMyColors from '../../../allMyColors';
import setColorPalette from '../../../setColorPalette';
import CreateEl from './CreateEl';
import Header from '../StaticStructures/Header';

export const WebStructureContext = createContext()
const MAX_WIDTH = 20
const MAX_HEIGHT = 20

function WebStructure() {
  const [isEditing,setIsEditing] = useState(false)
  const [showEditNav, setShowEditNav] = useState(true)
  const [showFullScreen, setShowFullScreen] = useState(true)
  const [isSelected, setIsSelected] = useState(null)
  const {currentStructure } = useContext(StructureContext)
  
  const editNav = useRef(null)
  const page = useRef(null)
  const headersSection = useRef(null)



const selections={
                          structures:{
                            id:uuidv4(),
                            content:{
                              headers:
                                {
                                  id:"headers-"+uuidv4(),
                                  type:"headers",
                                  str:[],
                                  sty:{display:"flex",justifyContent:"spaceBetween",alignItems:"center",fontSize:"2em", backgroundColor:"var(--bg-200)",color:"red",},
                                  lay:{},
                                  txt:"Header",
                                  con:null,
                                  
                                },
                              navs:
                                {
                                  id:"navs"+uuidv4(),
                                  str:[],
                                  sty:{display:"grid",justifyContent:"center",fontSize:"2em", backgroundColor:"var(--bg-200)",color:"red",alignItems:"center"},
                                  lay:{gridColumn:`1/${MAX_WIDTH+1}`, gridRow:`1/3`},
                                  txt:"nav",
                                  con:["Home","About","Contact me","Login"],
                                  hasInput:false,
                              },
                              inputs:{

                              },
                              buttons:{

                              },
                              modals:{

                              },
                              accordions:{

                              }
                            },
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
      <WebStructureContext.Provider value={{selections, page,editNav,headersSection,isEditing,isSelected,setIsSelected}}>
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
              <div className="edit-btns  flex absolute bottom-0 right-0 items-center bg-[var(--text-100)] w-[400px] px-5 justify-evenly rounded-full">
                <div
                  className="edit-btn "
                  onClick={()=>setShowEditNav(sE=>{
                    showEditNavFunc(!sE)
                    return !sE
                  })}
                ><FaBars size="23px"/></div>
                <div
                  className="edit-btn "
                    
                  onClick={()=>setIsEditing(iE=>{
                    if(!iE){
                      setIsSelected(()=>null)
                    }
                    return !iE
                  })
                  }
                ><FaEdit size="23px"/></div>
                <div
                  className="edit-btn"
                  onClick={()=>setShowFullScreen(fS=>{
                    showFullScreenFunc(!fS)
                    
                    return !fS
                  })}
                >{showFullScreen?<MdFullscreen size="30px" />:<MdFullscreenExit size="30px"/>}</div>

              </div>
              {isEditing?<div className="absolute top-2 right-2 bg-[var(--text-100)] text-[var(--bg-100)] px-4 cursor-default py-2 rounded-full opacity-20">Edit Mode</div>:""}
             {Object.keys(currentStructure["content"]).map(item=><CreateEl key={uuidv4()} structure={currentStructure["content"][item]}/>)}
          </div>
        </div>
      </WebStructureContext.Provider>
    </>
  )
}

export default WebStructure