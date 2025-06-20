import React, { createContext, useContext, useRef } from 'react'
import { WebStructureContext } from './WebStructure'
import { EditNavContext } from './EditNav'
import { FaPlus, FaMinus } from 'react-icons/fa'
import EditNavStructuresHeader from './EditNavStructures/EditNavStructuresHeader'
import EditNavStructuresNav from './EditNavStructures/EditNavStructuresNav'

export const EditNavStructuresContext = createContext()
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
                      {structures.isOpen ?
                        <div className='options flex flex-col list-none'>
                          <EditNavStructuresContext.Provider value={{structures}}>
                            <EditNavStructuresHeader/>
                            <EditNavStructuresNav/>
                          </EditNavStructuresContext.Provider>
                        </div>
                      :
                        ""
                      }
        </div>
    </>
  )
}

export default EditNavStructures