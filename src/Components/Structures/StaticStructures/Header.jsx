import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Nav from './Nav';

function Header({structure}) {
  if(!structure){
      return console.warn("No Structure")
    }
    return (
        <div style={{...structure["sty"],...structure["lay"]}}>
            {structure["txt"]? <div>{structure["txt"]}</div>:"" }
            {structure["str"]?<Header structure={structure["str"]}/>:""}
            {structure["nav"]? <Nav structure={structure["nav"]()}/>:"" }
            {structure["con"]?structure["con"].map((item,index)=><li key={index+uuidv4()}>{item}</li>):""}
        </div>
    )
}

export default Header