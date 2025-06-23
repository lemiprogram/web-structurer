import React, { useContext, useRef } from 'react'
import { StructureContext } from '../../../App'
import { v4 as uuidv4 } from 'uuid';
import { WebStructureContext } from './WebStructure';
import { EditNavContext } from './EditNav';
import { RxCross2 } from 'react-icons/rx';

function BasicStructures() {
    const {currentStructure,setCurrentStructure} = useContext(StructureContext)
    const {selections,editNav} = useContext(WebStructureContext)
    const {selectionBox, toggleSelectionBoxes} = useContext(EditNavContext)
    const componentName = "BasicStructures"
  return (
    <>

    <div
        className='capitalize  indent-4'
    >
        <div
        className=" whitespace-nowrap text-sm capitalize content-option"
        onClick={()=>toggleSelectionBoxes(componentName)}
        >Basics</div>
            {selectionBox===componentName?
                <div 
                    className=" flex flex-col selection-boxes"
                    style={{
                        left:editNav.current.offsetWidth-.6+"px",
                        top:"25%"
                        
                    }}
                >
                    
                <div 
                    className="text-[var(--accent-200)] absolute "
                    onClick={()=>toggleSelectionBoxes()}
                    style={{right:"-15px",top:"-15px"}}
                ><RxCross2/></div>
                <div className="boxes-container overflow-y-scroll">
                    {Object.keys(selections["structures"]["flexibleContent"]).map(item=>
                        <div
                            key={uuidv4()}
                            className='content-boxes'
                            onClick={()=>setCurrentStructure(cS=>{
                                cS["flexibleContent"].push(selections["structures"]["flexibleContent"][item])
                                return {...cS}
                            })}

                        >
                            {item}
                        </div>
                    )}
                    </div>
                </div>
            :
                ""
            }
        </div>

    </>
)
}

export default BasicStructures