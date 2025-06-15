import React,{ useState } from 'react'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
function App() {
  return(<>
 
    <h1 className="site-title">SkillShare</h1>

    <BrowserRouter>


    <Routes>
 <Route path='/login'element={<Login/>}/>
  <Route path='/signup'element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
   
 
 </>  )


}

export default App;