import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-20 bg-blue-900/80 backdrop-blur-md p-14 rounded-xl shadow-2xl text-white">
      <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
        Login
      </h2>

      <div className="space-y-8 min-h-[400px] flex flex-col justify-between">
        <div className="space-y-8">
          <input
            type="text"
            placeholder="Enter your Username"
            className="w-full px-6 py-4 bg-white text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-6 py-4 bg-white text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-teal-500 text-white px-6 py-4 rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg"
          >
            Login
          </button>

          <p className="text-center text-white mt-8">
            Not a user?{' '}
            <Link to="/signup" className="text-indigo-300 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;