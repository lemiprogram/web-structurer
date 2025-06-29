import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaGreaterThan, FaMinus, FaPlus } from 'react-icons/fa'
import setColorPalette from '../../../setColorPalette';
import { WebStructureContext } from './WebStructure';
import EditNavStyles from './EditNavStyles';
import EditNavStructures from './EditNavStructures';
import { StructureContext, structureTemplate } from '../../../App';

export const EditNavContext = createContext()

function EditNav() {
 const [accordionIsOpen, setAccordionIsOpen] = useState(null)
 const {setCurrentStructure, structureTemplate} = useContext(StructureContext)
 const {selections,page,editNav,renderCurrentStructure}  = useContext(WebStructureContext)
 const [selectionBox, setSelectionBox] = useState(null)

  const accordionFunc = (selection)=>{
    setAccordionIsOpen(aO=>{
      if(aO === selection){
        closeOptions()
        return null
      }
      closeOptions(selection)
      return selection
    })
  } 
  const closeOptions = (aO = null)=>{
    Object.keys(selections).forEach(selection=>{
      if(aO && aO === selection){
        selections[selection].isOpen = true
        return
      }
      selections[selection].isOpen = false
    })
  }
  const toggleSelectionBoxes = (componentName=null)=>{
    if(!componentName||selectionBox === componentName){
      setSelectionBox(()=>null)
      return
    }
      setSelectionBox((()=>componentName))
  }
  
  return (
    <>
      <EditNavContext.Provider value={{accordionFunc,toggleSelectionBoxes,selectionBox,setSelectionBox}}>
        <div 
            className="sideNav h-full py-4  bg-[var(--bg-300)] flex flex-col justify-between editNav relative "
            ref={editNav}
        >
          <div className="flex flex-col">
            <EditNavStructures/>
            <EditNavStyles/>
          </div>
          <button 
            className=""
            onClick={()=>{
              setCurrentStructure(cS=>{
                cS = structureTemplate
                return {...cS}
              })
            }}
          >
            Reset
          </button>
        </div>
      </EditNavContext.Provider>
      
    </>
  )
}


export default EditNav