import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const CreateEl = ({structure})=>{
    const {txt,str,sty,lay,con} = structure
    return (
        <div style={{...sty,...lay}}>
            {txt? <div>{txt}</div>:"" }
            {str?CreateEl(str):""}
            {con?con.map((item,index)=><li key={index+uuidv4()}>item</li>):""}
        </div>
    )
}

export default CreateEl;