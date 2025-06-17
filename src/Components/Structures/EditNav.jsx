import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaGreaterThan, FaMinus, FaPlus } from 'react-icons/fa'

function EditNav({selections}) {
 const [accordionIsOpen, setAccordionIsOpen] = useState(null)
 const {structures, styles} = selections
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
      <div 
              className="selection flex flex-col justify-center"
              key={"structures" + "-" +structures.id}
              id={"structures" + "-" +structures.id}
            >
              <div 
                className="flex items-center gap-3 justify-between option font-semibold capitalize"
                onMouseDown={()=>accordionFunc("structures")}

              >{"structures"}{structures.isOpen?<FaMinus/>:<FaPlus/>} </div>
              {structures.isOpen ?<div className='options flex flex-col list-none'>
                {structures.content.map(option=>
                <li
                  className='capitalize option indent-6'
                  key={option + "-" +structures.id}
                  id={option + "-" +structures.id}
                >{option}</li>)}
              </div>:""}
      </div>
      <div 
              className="selection flex flex-col justify-center"
              key={"styles" + "-" +styles.id}
              id={"styles" + "-" +styles.id}
            >
              <div 
                className="flex items-center gap-3 justify-between option font-semibold capitalize"
                onMouseDown={()=>accordionFunc("styles")}

              >{"styles"}{styles.isOpen?<FaMinus/>:<FaPlus/>} </div>
              {
                styles.isOpen ?
                  <div className='options flex flex-col list-none'>
                    <div
                      className='relative capitalize option indent-6'
                      key={"colors" + "-" +styles.id}
                      id={"colors" + "-" +styles.id}
                    >
                      {"colors"}
                      <div className="absolute top-0 right-0 max-h-full overflow-y-scroll">{styles["colors"].map()}</div>
                    </div>
                  </div>
                :
                  ""
              }
      </div>
    </>
  )
}


export default EditNav