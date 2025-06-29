import React, { useContext } from 'react'
import { StructureContext } from '../../../App'
import CreateEl from './CreateEl'
import { v4 as uuidv4 } from 'uuid';

function Display() {
    const {currentStructure} = useContext(StructureContext)
    
  return (
    
    <>
        {Object.keys(currentStructure["content"]).map(item=><CreateEl key={uuidv4()} structure={currentStructure["content"][item]}/>)}
        {currentStructure["flexibleContent"].map(str=><CreateEl key={uuidv4()} structure={str}/>)}
    </>

  )
}

export default Display