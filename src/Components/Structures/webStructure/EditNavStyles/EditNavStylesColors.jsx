import React from 'react'

function EditNavStylesColors() {
  return (
    <>
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
                                  className="hidden bg-[var(--bg-200)] p-2 z-10 absolute flex flex-col h-[50vh] overflow-y-scroll rounded-lg"
                                  style={{
                                      left:"132px",
                                      top:"25%"
                                      
                                  }}
                                  ref={colorsSection}
                              >{styles.content["colors"].map((colors,cSIndex)=>
                                      <div 
                                          className="color-boxes "
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
    </>
  )
}

export default EditNavStylesColors