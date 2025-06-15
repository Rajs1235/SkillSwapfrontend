import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Login from './Login';
function Signup() {
  return (<>
    <div className=" flex items-center justify-center  px-4">
      <div className="bg-blue-900 rounded-xl p-8 w-full max-w-2xl flex flex-col items-center space-y-4 shadow-lg">

        <h2 className='text-3xl font-montserrat font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text'>SignUp</h2>
        <input type="text" placeholder='Enter your Username' className='bg-white rounded-xl  p-5 m-5 h-30 w-60  hover:ring-2 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500' />
        <br /><br />
        <input type="Email" placeholder='Email' className='bg-white rounded-xl  p-5 m-5  h-30 w-60  hover:ring-2 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500' />
        <br /><br />
        <input type="password" placeholder='Password' className='bg-white rounded-xl  p-5 m-5  h-30 w-60  hover:ring-2 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500' />
        <br /><br />
        <button type='submit' className='border white 1px solid bg-teal-500 p-3 m-3 rounded-3xl  hover:ring-2 hover:ring-green-500 focus:outline-none focus:ring-2 focus:ring-green-500'>Signup</button>
        <br /><br />
        <p className="text-white">
          Already a user? <Link to="/login" className="text-indigo-300 hover:underline">Login</Link>
        </p>
      </div>

    </div></>
  )
}

export default Signup;