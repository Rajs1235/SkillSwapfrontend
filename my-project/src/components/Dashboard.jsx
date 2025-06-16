import React, { use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Dashboard() {
    const navigate=useNavigate()
    const navItems=[
        {
            name:'Home',
            slug:'/',
            active:true
        },
        {
            name:'Login',
            slug:'/login',
            active:true
        },
        {
            name:'Signup',
            slug:'/signup',
            active:true
        },
        {
            name:'Profile',
            slug:'/profile',
            active:true
        },
    ]
  return(
  <>
<Link to='/'></Link>
<nav>
<ul className="flex items-center justify-center space-x-6 text-white text-lg font-medium">

    {
        navItems.map((item)=>
        item.active?(<li key={item.name}>
            <button onClick={()=>navigate(item.slug)} 
                className='inline-bock px-6 py-2 duration-200 hover:bg-green-700 rounded-full'>{item.name}</button>
        </li>):null
    )
    }
</ul></nav>

  </>
)
}
export default Dashboard