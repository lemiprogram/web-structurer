import Layout from "./Components/Pages/Layout"

const MAX_WIDTH = 10
const MAX_HEIGHT= 10

const curentStructure = {
    str:{
        headers:null,
        navs:null,
        sideNavs:null,
        blocks:null,
        inputs:null,
        buttons:null,
        Modals:null,
    },
    styles:{
        colorScheme:null,
        fontFamily:null,
        fontSize:null,
    },
    layouts:{},
}


const createEle = (structure)=>{
    const {txt,str,sty,lay} = structure
    return (
        <div style={{...sty,...lay}}>
            {txt? <div>{txt}</div>:"" }
            {str?createEle(str):""}
        </div>
    )
}