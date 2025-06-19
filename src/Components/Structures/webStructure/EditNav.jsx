import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaGreaterThan, FaMinus, FaPlus } from 'react-icons/fa'
import setColorPalette from '../../../setColorPalette';
import { WebStructureContext } from './WebStructure';
import EditNavStyles from './EditNavStyles';
import EditNavStructures from './EditNavStructures';

export const EditNavContext = createContext()

function EditNav() {
 const [accordionIsOpen, setAccordionIsOpen] = useState(null)
 const {selections,page,editNav}  = useContext(WebStructureContext)
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
  const toggleSelectionBoxes = (selected=null)=>{
    document.querySelectorAll(".selection-boxes").forEach(sB=>{
      if(sB===selected){
        sB.classList.remove("hidden")
        return
      }
      sB.classList.add("hidden")
    })
  }
  
  return (
    <>
      <EditNavContext.Provider value={{accordionFunc,toggleSelectionBoxes}}>
        <div 
            className="sideNav h-full py-4  bg-[var(--bg-300)] flex flex-col justify-center editNav relative "
            ref={editNav}
        >
          <EditNavStructures/>
          <EditNavStyles/> 
        </div>
      </EditNavContext.Provider>
      
    </>
  )
}


export default EditNav