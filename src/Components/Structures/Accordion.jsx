import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaGreaterThan, FaMinus, FaPlus } from 'react-icons/fa'

function Accordion({selections}) {
  const [accordionIsOpen, setAccordionIsOpen] = useState(null)
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
  return (
    <>
        {
            Object.keys(selections).map(selection=>
           {
            return ( <div 
              className="selection flex flex-col justify-center"
              key={selection + "-" +selections[selection].id}
              id={selection + "-" +selections[selection].id}
            >
              <div 
                className="flex items-center gap-3 justify-between option font-semibold capitalize"
                onMouseDown={()=>accordionFunc(selection)}

              >{selection}{selections[selection].isOpen?<FaMinus/>:<FaPlus/>} </div>
              {selections[selection].isOpen ?<div className='options flex flex-col list-none'>
                {selections[selection].content.map(option=>
                <li
                  className='capitalize option indent-6'
                  key={option + "-" +selections[selection].id}
                  id={option + "-" +selections[selection].id}
                >{option}</li>)}
              </div>:""}
            </div>)
            })
        }
    </>
)
}

export default Accordion