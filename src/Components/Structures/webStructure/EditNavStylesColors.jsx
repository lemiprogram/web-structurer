import React, { useContext, useEffect } from 'react'
import { EditNavStylesContext } from './EditNavStyles'
import setColorPalette from '../../../setColorPalette'
import { RxCross2 } from 'react-icons/rx'
import { WebStructureContext } from './WebStructure'
import { EditNavContext } from './EditNav'
import { StructureContext } from '../../../App'


function EditNavStylesColors() {
    const {toggleSelectionBoxes} = useContext(EditNavContext)
    const {styles,colorsSection} = useContext(EditNavStylesContext)
    const {editNav,page} = useContext(WebStructureContext)
    const {currentStructure ,setCurrentStructure} = useContext(StructureContext)
    
  
  return (
    <>
      <li
          className='capitalize option indent-4'
          key={"colors" + "-" +styles.id}
          id={"colors" + "-" +styles.id}
      >
          <p 
            className="item"
            onClick={()=>toggleSelectionBoxes(colorsSection.current)}
          >Colors</p>
          <div 
              className="hidden selection-boxes bg-[var(--bg-200)]  z-10 absolute h-[50vh] flex flex-col  rounded-e-xl"
              style={{
                  left:editNav.current.offsetWidth-.6+"px",
                  top:"25%"
                  
              }}
              ref={colorsSection}
          >
              
                  <div 
                      className="text-[var(--accent-200)] absolute "
                      onClick={()=>toggleSelectionBoxes()}
                      style={{right:"-15px",top:"-15px"}}
                  ><RxCross2/></div>
                  <div className="color-boses-container overflow-y-scroll">
                      {styles.content["colors"].map((colors,cSIndex)=>
                      <div
                          className="color-boxes  "
                          key={"colors"+cSIndex+styles.id}
                          onClick={()=>{
                              if(!page.current){
                                  console.log(page.current)
                                  return
                              }
                                  setCurrentStructure(cS=>{
                                    cS.content.styles.colorScheme = colors
                                    return {...cS}
                                  })
                          }}
                      >
                          {
                          Object.values(colors).map((color,cIndex)=>cIndex<5?<div
                              className="color-box"
                              style={{backgroundColor:color,}}
                              key={color+cSIndex+cIndex+styles.id}
                          ></div>:"")
                          }
                      </div>
                      )
                      }
                  </div>
          </div>
      </li>
    </>
  )
}

export default EditNavStylesColors