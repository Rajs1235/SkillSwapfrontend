import React,{ useState } from 'react'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Home from './Home'
function App() {
  return(<>
 <div>
<h1 className="site-title ml-0 text-left">SkillShare</h1>

    <BrowserRouter>


    <Routes>
 <Route path='/login'element={<Login/>}/>
  <Route path='/signup'element={<Signup/>}/>
   <Route path='/Dashboard'element={<Dashboard/>}/>
    <Route path='/Home'element={<Home/>}/>
       <Route path='/Profile'element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
   
 </div>
 </>  )


}

export default App;