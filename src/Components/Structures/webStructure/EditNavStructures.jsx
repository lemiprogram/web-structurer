import React, { useContext } from 'react'
import { WebStructureContext } from './WebStructure'
import { EditNavContext } from './EditNav'
import { FaPlus, FaMinus } from 'react-icons/fa'

function  EditNavStructures() {
    const {accordionFunc} = useContext(EditNavContext)
    const {selections} = useContext(WebStructureContext)
    const {structures}  = selections
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
    </>
  )
}

export default EditNavStructures