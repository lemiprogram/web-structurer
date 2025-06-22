import React, { useContext, useEffect } from 'react'
import { EditNavStylesContext } from '../EditNavStyles'
import { RxCross2 } from 'react-icons/rx'
import { WebStructureContext } from '../WebStructure'
import { EditNavContext } from '../EditNav'
import { StructureContext } from '../../../../App'
import setColorPalette from '../../../../setColorPalette'


function EditNavStylesColors() {
    const {toggleSelectionBoxes,selectionBox} = useContext(EditNavContext)
    const {styles,colorsSection} = useContext(EditNavStylesContext)
    const {editNav,page} = useContext(WebStructureContext)
    const {currentStructure,setCurrentStructure} = useContext(StructureContext)
    useEffect(()=>setColorPalette(page.current,currentStructure.styles.colorScheme ),[currentStructure])
    const componentName = 'editStylesColors'
  
  return (
    <>
      <div
          className='capitalize option item indent-4'
          key={"colors" + "-" +styles.id}
          id={"colors" + "-" +styles.id}
      >
          <div
            className=" whitespace-nowrap text-sm"
            onClick={()=>toggleSelectionBoxes(componentName)}
          >Color</div>
          {selectionBox===componentName?
            <div 
                className=" flex flex-col selection-boxes"
                style={{
                    left:editNav.current.offsetWidth-.6+"px",
                    top:"25%"
                    
                }}
            >
                
                    <div 
                        className="text-[var(--accent-200)] absolute "
                        onClick={()=>toggleSelectionBoxes()}
                        style={{right:"-15px",top:"-15px"}}
                    ><RxCross2/></div>
                    <div className="color-boxes-container overflow-y-scroll">
                        {styles.content["colors"].map((colors,cSIndex)=>
                        <div
                            className="color-boxes"
                            key={"colors"+cSIndex+styles.id}
                            onClick={()=>{
                                if(!page.current){
                                    return
                                }
                                setCurrentStructure(cS=>{
                                    cS.styles.colorScheme = colors
                                    setColorPalette(page.current,cS.styles.colorScheme )
                                    localStorage.setItem("currentStructure",JSON.stringify(cS))

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
          :
            ""
          }
      </div>
    </>
  )
}

export default EditNavStylesColors