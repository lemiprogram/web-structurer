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
                {structure["txt"] ? <div className="flex flex-col" >{structure["txt"].map( item=> <li key={uuidv4()}> {item} </li> )}</div> : "" }
                {structure["str"] ? structure["str"].map(item=><CreateEl key={uuidv4()} structure={structure["str"]}/>) : "" }
                {structure["con"] ? <div className="flex flex-row" >{structure["con"].map( item=> <li key={uuidv4()}> {item} </li> )}</div> : "" }
            </div>
            <EditModal structure={isSelected} type={structure["type"]}/>
        </>
    )
}

export default CreateEl;