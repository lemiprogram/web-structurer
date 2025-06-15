import { createContext } from 'react'
import './App.css'
import WebStructure from './Components/WebStructure'
import NavBar from './Components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Layout from './Components/Layout'
import Profile from './Components/Profile'
import NotFound from './Components/NotFound'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='profile' element={<Profile/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
