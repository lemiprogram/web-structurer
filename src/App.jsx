import { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Home from './Components/Pages/Home'
import Layout from './Components/Pages/Layout'
import Profile from './Components/Pages/Profile'
import NotFound from './Components/Pages/NotFound'
import Create from './Components/Pages/Create'
import Templates from './Components/Pages/Templates'
import Login from './Components/Pages/Login'
import WebStructure from './Components/Structures/webStructure/WebStructure';
import Projects from './Components/Pages/Projects';
import allMyColors from './allMyColors';

export const StructureContext = createContext() 
export const structureTemplate = {
      id: uuidv4(),
      content:{
        
          headers:{
                    id:"headers-"+uuidv4(),
                    type:"headers",
                    str:[/* {
                      id:"dor-"+uuidv4(),
                      type:"doors",
                      str:[],
                      sty:{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"2em", backgroundColor:"var(--bg-200)",color:"red",},
                      lay:{},
                      func:{
                        onClick:null,
                        onMouseOver:null,
                        onMouseOut:null,
                      },
                      txt:["Door"],
                      con:null,
                    }
                    ,{
                    id:"chair-"+uuidv4(),
                    type:"chair",
                    str:[],
                    sty:{display:"flex",justifyContent:"spaceBetween",alignItems:"center",fontSize:"2em", backgroundColor:"var(--bg-200)",color:"red",},
                    lay:{},
                    func:{
                      onClick:null,
                      onMouseOver:null,
                      onMouseOut:null,
                    },
                    txt:["Chair"],
                    con:null,
                    
                    } */
                  ],
                      sty:{fontSize:"2em", backgroundColor:"var(--bg-200)",color:"red"},
                    lay:{display:"flex",justifyContent:"center",alignItems:"center",},
                    func:{
                      onClick:null,
                      onMouseOver:null,
                      onMouseOut:null,
                    },
                    txt:["Header"],
                    con:null,
                    
                  },
          navs:null,
          sideNavs:null,
          footers:null,
          
        },
      flexibleContent:{
          blocks:[],
          inputs:[],
          buttons:[],
          Modals:[],
      },
    styles:{
        colorScheme:allMyColors()[0],
        fontFamily:null,
        fontSize:null,
    },
    layouts:{},
}
!localStorage.getItem("currentStructure")?localStorage.setItem("currentStructure",JSON.stringify(structureTemplate)):""
  
function App() {
  const [currentStructure, setCurrentStructure] = useState(JSON.parse(localStorage.getItem("currentStructure")))
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StructureContext.Provider value={{currentStructure, setCurrentStructure}}><Layout/></StructureContext.Provider>}>
              
                <Route index element={<Home/>}/>
                <Route path='profile' element={<Profile/>}/>
                <Route path='projects' element={<Projects/>}/>
                <Route path={"create"}  element={currentStructure?<WebStructure/>:<Create/>}/>
                <Route path='templates' element={<Templates/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='*' element={<NotFound/>}/>
              
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
