
import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export function Navbar({ isLoggedIn, userData, logoutHandler }) {
  const navigate = useNavigate();

  const allNavItems = [
    { name: 'Home', slug: '/', icon: '🏠', show: true },
    { name: 'Profile', slug: '/profile', icon: '🙍‍♂️', show: isLoggedIn },
    { name: 'Browse', slug: '/browse', icon: '🗂', show: isLoggedIn },
    { name: 'Dashboard', slug: userData?.role === 'Learner' ? '/learner-dashboard' : '/tutor-dashboard', icon: '📊', show: isLoggedIn },
    { name: 'Login', slug: '/login', icon: '🔐', show: !isLoggedIn },
    { name: 'Signup', slug: '/signup', icon: '✍️', show: !isLoggedIn },
    { name: 'Logout', slug: '/logout', icon: '🚪', show: isLoggedIn, isLogout: true },
  ];

  const handleNavClick = (item) => {
    if (item.isLogout) {
      logoutHandler();
    } else if (item.slug.includes('-dashboard')) {
      navigate(item.slug, { state: { userData } });
    } else {
      navigate(item.slug);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-md">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              SkillShare
            </NavLink>
          </div>
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
