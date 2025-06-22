import React, { useContext, useRef } from 'react'
import { StructureContext } from '../../../App'
import { v4 as uuidv4 } from 'uuid';
import { WebStructureContext } from './WebStructure';
import { EditNavContext } from './EditNav';
import { RxCross2 } from 'react-icons/rx';

function SemanticStructures() {
    const {currentStructure,setCurrentStructure} = useContext(StructureContext)
    const {selections,editNav} = useContext(WebStructureContext)
    const {selectionBox, toggleSelectionBoxes} = useContext(EditNavContext)
    const componentName = "SemanticStructures"
  return (
    <>

    <div
        className='capitalize indent-4'
    >
        <div
        className=" whitespace-nowrap text-sm capitalize content-option" 
        onClick={()=>toggleSelectionBoxes(componentName)}
        >Semantics</div>
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
                <div className="semanitic-boxes-container boxes-container overflow-y-scroll">
                    {Object.keys(selections["structures"]["content"]).map(item=>
                        <div
                            key={uuidv4()}
                            className='content-boxes'
                            onClick={()=>setCurrentStructure(cS=>{
                                cS["content"][item] = selections["structures"]["content"][item]
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

export default SemanticStructures