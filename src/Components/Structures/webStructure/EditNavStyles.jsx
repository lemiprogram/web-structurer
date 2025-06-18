import React, { createContext, useContext, useRef } from 'react'
import { FaPlus, FaMinus, FaCross } from 'react-icons/fa'
import { EditNavContext } from './EditNav'
import { WebStructureContext } from './WebStructure'
import setColorPalette from '../../../setColorPalette'
import EditNavStylesColors from './EditNavStyles/EditNavStylesColors'
import { RxCross2 } from 'react-icons/rx'

export const EditNavStylesContext = createContext
function EditNavStyles() {
    const {selections,editNav,page} = useContext(WebStructureContext)
    const {accordionFunc} = useContext(EditNavContext)
    const colorsSection = useRef(null)
    const {styles}  = selections
    
  return (
    <>
        <div 
            className="selection flex flex-col justify-center"
            key={"styles" + "-" +styles.id}
            id={"styles" + "-" +styles.id}
        >
            <div 
            className="flex items-center gap-3 justify-between option font-semibold capitalize"
            onMouseDown={()=>accordionFunc("styles")}

            >{"styles"}{styles.isOpen?<FaMinus/>:<FaPlus/>} </div>
            {
            styles.isOpen ?
                <div className='options flex flex-col list-none'>
                    <div
                        className='capitalize option indent-6'
                        key={"colors" + "-" +styles.id}
                        id={"colors" + "-" +styles.id}
                    >
                        <div 
                        className="item"
                        onClick={e=>{
                            colorsSection.current.classList.toggle("hidden")
                        }}
                        >Colors</div>
                        <div 
                            className="hidden bg-[var(--bg-200)]  z-10 absolute h-[50vh] flex flex-col  rounded-lg"
                            style={{
                                left:"132px",
                                top:"25%"
                                
                            }}
                            ref={colorsSection}
                        >
                            
                                <div 
                                    className="text-[var(--accent-200)] absolute "
                                    onClick={()=>colorsSection.current.classList.add("hidden")}
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
                                                console.log(editNav.current.style.width)
                                            setColorPalette(page.current,colors)
                                        }}
                                    >
                                        {
                                        Object.values(colors).map((color,cIndex)=>cIndex<5?<div
                                            className="color-box"
                                            style={{backgroundColor:color}}
                                            key={color+cSIndex+cIndex+styles.id}
                                        ></div>:"")
                                        }
                                    </div>
                                    )
                                    }
                                </div>
                        </div>
                    </div>
                    
                </div>
            :
                ""
            }
        </div>
    </>
  )
}

export default EditNavStyles