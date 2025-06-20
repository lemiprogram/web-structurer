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

export const StructureContext = createContext() 
!localStorage.getItem("currentStructure")?localStorage.setItem("currentStructure",JSON.stringify({
      id: uuidv4(),
      name,
      content:{str:{
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
})):""
  
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
