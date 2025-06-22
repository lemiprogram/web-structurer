import React, { useContext, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { WebStructureContext } from '../WebStructure'
import { EditNavContext } from '../EditNav'
import { StructureContext } from '../../../../App'
import { EditNavStructuresContext } from '../EditNavStructures'
function EditNavStructuresNav() {
    const {toggleSelectionBoxes} = useContext(EditNavContext)
    const {structures,navsSection} = useContext(EditNavStructuresContext)
    const {editNav,page} = useContext(WebStructureContext)
    const {setCurrentStructure} = useContext(StructureContext)
    const {navs} = structures.content
    return (
        <>
        <div
            className='capitalize option item indent-4 structure-selection '
            key={"navs" + "-" +structures.id}
            id={"navs" + "-" +structures.id}
            onMouseDown={()=>
                setCurrentStructure(cS=>{
                    console.log(navs.id)
                    if( cS.content.str.navs && cS.content.str.navs.id === navs.id){
                        cS.content.str.navs = null;
                    }
                    
                    else{
                        cS.content.str.navs = navs;
                    }
                    localStorage.setItem("currentStructure",JSON.stringify(cS))

                    return {...cS}
                })
            }

        >
              nav
              
          </div>
    </>
)
}

export default EditNavStructuresNav

