import React, { useContext, useEffect, useRef} from 'react'
import { RxCross2 } from 'react-icons/rx'
import { WebStructureContext } from '../WebStructure'
import { EditNavContext } from '../EditNav'
import { StructureContext } from '../../../../App'
import { EditNavStructuresContext } from '../EditNavStructures'
function EditNavStructuresHeader() {
    const {toggleSelectionBoxes} = useContext(EditNavContext)
    const {structures} = useContext(EditNavStructuresContext)
    const {editNav,page,headersSection} = useContext(WebStructureContext)
    const {setCurrentStructure} = useContext(StructureContext)
    const {headers} = structures.content
    return (
        <>
        <div
            className='capitalize option item indent-4 '
            key={"headers" + "-" +structures.id}
            id={"headers" + "-" +structures.id}
            ref={headersSection}
            onMouseDown={()=>
                setCurrentStructure(cS=>{
                    console.log(headers.id)
                    if( cS.content.str.headers && cS.content.str.headers.id === headers.id){
                        cS.content.str.headers = null;
                        headersSection.current.style.backgroundColor="var(--bg-300)"
                    }
                    
                    else{
                        cS.content.str.headers = headers;
                        headersSection.current.style.backgroundColor="var(--accent-100)"
                    }
                    localStorage.setItem("currentStructure",JSON.stringify(cS))
                    return {...cS}
                })
            }

        >
              header
              
          </div>
    </>
)
}

export default EditNavStructuresHeader 

/* <div 
                  className="hidden flex flex-col selection-boxes"
                  style={{
                      left:editNav.current.offsetWidth-.6+"px",
                      top:"25%"
                      
                  }}
                  ref={headersSection}
              >
                  
                      <div 
                          className="text-[var(--accent-200)] absolute "
                          onClick={()=>toggleSelectionBoxes()}
                          style={{right:"-15px",top:"-15px"}}
                      ><RxCross2/></div>
                      <div className="header-boxes-container structure-boxes-container overflow-y-scroll grid grid-template">
                          {headers.map((header,cSIndex)=>
                          <div
                              className="header-boxes indent-0"
                              key={"header"+cSIndex+structures.id}
                              onClick={()=>{
                                if(!page.current){
                                    return
                                }
                                setCurrentStructure(cS=>{
                                    
                                    
                                    if( cS.content.str.headers === header.id){
                                        cS.content.str.headers = null;
                                        return {...cS}
                                    }
                                    
                                    cS.content.str.headers = header;
                                    return {...cS}
                                }
                                )
                              }}
                          >
                            Header1
                          </div>
                          )
                          }
                      </div>
              </div> */