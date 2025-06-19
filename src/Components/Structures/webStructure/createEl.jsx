import React from 'react'

const createEl = ({structure})=>{
    const {txt,str,sty,lay} = structure
    return (
        <div style={{...sty,...lay}}>
            {txt? <div>{txt}</div>:"" }
            {str?createEl(str):""}
        </div>
    )
}

export default createEl