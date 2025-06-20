import React, { createContext, useContext, useRef } from 'react'
import { FaPlus, FaMinus} from 'react-icons/fa'
import { EditNavContext } from './EditNav'
import { WebStructureContext } from './WebStructure'
import EditNavStylesColors from './EditNavStyles/EditNavStylesColors'

export const EditNavStylesContext = createContext()
function EditNavStyles() {
    const {selections,editNav,page} = useContext(WebStructureContext)
    const {accordionFunc} = useContext(EditNavContext)
    const colorsSection = useRef(null)
    const {styles}  = selections
    
  return (
    <>
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
                        <EditNavStylesContext.Provider value={{styles,colorsSection}}>
                            <EditNavStylesColors/>
                        </EditNavStylesContext.Provider>
                        
                    </div>
            :
                ""
            }
        </div>
    </>
  )
}

export default EditNavStyles