import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Home from './Home';

function App() {
  return (
    <>
      <div className="app-container"> {/* Added a container div for better layout control */}
        {/*
          Option 1: Keep SkillShare as a separate element before the router.
          This is generally better if SkillShare is a static title for the whole app.
          You might need to add some top padding/margin to the router content
          or ensure the overall layout manages space correctly.
        */}
        <h1 className="site-title ml-0 text-left">SkillShare</h1>

        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/*
        Option 2 (Alternative for a more structured header):
        If you want a common header that appears on all pages,
        you could create a Header component and place it here.

        Example of a simple Header component (create a new file like Header.jsx):
        // Header.jsx
        // import React from 'react';
        // function Header() {
        //   return (
        //     <header>
        //       <h1 className="site-title ml-0 text-left">SkillShare</h1>
        //       {/* Add navigation or other header elements here }
        //     </header>
        //   );
        // }
        // export default Header;

        // Then in App.jsx you would do:
        // import Header from './components/Header'; // Assuming Header.jsx is in components folder
        // ...
        // <Header />
        // <BrowserRouter>...</BrowserRouter>
      */}
    </>
  );
}

export default App;