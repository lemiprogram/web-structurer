import React, { useContext, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { WebStructureContext } from './WebStructure';
import EditModal from './EditModal/EditModal';

const CreateEl = ({structure})=>{
    const str = useRef(null)
    const {isEditing,isSelected, setIsSelected} = useContext(WebStructureContext)
    if(!structure){
        return
     }
    return (
        <>
            <div
                style={{...structure["sty"],...structure["lay"]}}
                ref={str}
                onClick={e=>{
                    if(isEditing){
                        setIsSelected(iS=>iS !== structure ? structure : null)
                        return
                    }
                    if(structure["func"]["onclick"]){
                        structure["func"]["onclick"]()
                        return
                    }
                }}
                id={structure.id}
            >
                {structure["str"] ? structure["str"].map(item=><CreateEl key={uuidv4()} structure={structure["str"]}/>) : "" }
            </div>
            {isSelected===structure?
                <EditModal structure={isSelected} type={structure["type"]}/>
            :
                ""
            }
        </>
    )
}

export default CreateEl;