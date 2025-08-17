import { Menu, Home, User, FileText, Star, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { use } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';


const UserDashBoard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = use(AuthContext);
  const location = useLocation();

  // Check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mobile Header */}
      <header className="lg:hidden  border-b-2  border-blue-700 bg-blue-50 text-blue-700 shadow-md">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="btn btn-ghost btn-circle"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">My Dashboard</h1>
          <div className="w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
            <span className="font-bold rounded-full"> <img src={user?.
photoURL || 'U'} alt="" /></span>
          </div>
        </div>
      </header>

      <div className="drawer lg:drawer-open">
        <input 
          id="user-drawer" 
          type="checkbox" 
          className="drawer-toggle" 
          checked={showSidebar}
          onChange={() => setShowSidebar(!showSidebar)}
        />
        
        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Desktop Header */}
          <header className="hidden lg:flex items-center justify-between text-blue-700 bg-blue-50 shadow-sm p-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-700 ml-4">
                Welcome, {user?.displayName || 'User'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <span className="font-bold"> <img src={user.photoURL }></img></span>
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                  <li><NavLink to="/user-dashboard">Profile</NavLink></li>
                  <li><NavLink to="/logout" className="text-red-500"><LogOut className="mr-2" /> Logout</NavLink></li>
                </ul>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label 
            htmlFor="user-drawer" 
            aria-label="close sidebar" 
            className="drawer-overlay"
            onClick={() => setShowSidebar(false)}
          ></label>
          <aside className="w-64 min-h-full bg-blue-50 text-blue-700 shadow-lg">
            <div className="p-4 border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="font-bold">{user?.displayName?.charAt(0) || 'U'}</span>
                </div>
                My Dashboard
              </h2>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <NavLink 
                    to="/" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <Home className="text-blue-600" size={18} />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/user-dashboard" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/user-dashboard/profile') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <User className="text-blue-600" size={18} />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/user-dashboard/applications" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/user-dashboard/applications') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <FileText className="text-blue-600" size={18} />
                    My Applications
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/user-dashboard/reviews" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/user-dashboard/reviews') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <Star className="text-blue-600" size={18} />
                    My Reviews
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-blue-100">
              <NavLink 
                to="/logout" 
                className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50"
                onClick={() => setShowSidebar(false)}
              >
                <LogOut size={18} />
                Logout
              </NavLink>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;