import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Using react-icons for the hamburger menu

export function Navbar({ isLoggedIn, userData, logoutHandler }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allNavItems = [
    { name: 'Home', slug: '/Dashboard', show: true },
    { name: 'Profile', slug: '/profile', show: isLoggedIn },
    { name: 'Browse', slug: '/browse', show: isLoggedIn },
        { name: 'Matches', slug: '/matches', show: isLoggedIn },
    {
      name: 'Dashboard',
      slug: userData?.role === 'Learner' ? '/learner-dashboard' : '/tutor-dashboard',
      show: isLoggedIn,
    },
    { name: 'Login', slug: '/login', show: !isLoggedIn },
    { name: 'Signup', slug: '/signup', show: !isLoggedIn },
    { name: 'Logout', slug: '/logout', show: isLoggedIn, isLogout: true },
  ];

  const handleNavClick = (item) => {
    if (item.isLogout) {
      logoutHandler();
    } else if (item.slug.includes('-dashboard')) {
      navigate(item.slug, { state: { userData } });
    } else {
      navigate(item.slug);
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-md">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              SkillShare
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              {allNavItems.map((item) =>
                item.show ? (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item)}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {allNavItems.map((item) =>
              item.show ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;