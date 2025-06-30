import React, { useContext } from 'react'
import { StructureContext } from '../../../App'
import CreateEl from './CreateEl'
import { v4 as uuidv4 } from 'uuid';

function Display() {
    const {currentStructure} = useContext(StructureContext)
    
  return (
    
    <>
        <div className="flex flex-col justify-between">
          {Object.keys(currentStructure["content"]).map(item=>item!== "footer"?<CreateEl key={uuidv4()} structure={currentStructure["content"][item]}/>:"")}
          {Object.keys(currentStructure["flexibleContent"]).map(item=><CreateEl key={uuidv4()} structure={currentStructure["flexibleContent"][item]}/>)}
          {Object.keys(currentStructure["content"]).map(item=>item=== "footer"?<CreateEl key={uuidv4()} structure={currentStructure["content"][item]}/>:"")}
        </div>
    </>

  )
}

export default Display