import React from 'react';
import { NavLink,  Outlet, useLocation } from 'react-router';
import { FaHome, FaUserCog, FaPlusCircle, FaTasks, FaFileAlt, FaUsers, FaStar, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import { use } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import '../../../src/app.css'

const AdminDashboard = () => {
  const {user}=use(AuthContext)
  //console.log(user)
  const location = useLocation();

  // Check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mobile Header */}
      <header className="lg:hidden text-blue-700 shadow-md bg-blue-50">
        <div className="flex items-center justify-between p-4">
          <label htmlFor="admin-drawer" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <div className="drawer lg:drawer-open">
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
        
        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Desktop Header */}
          <header className="hidden lg:flex items-center text-blue-700 justify-between bg-blue-50 shadow-sm p-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-700 ml-4">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <span className="font-bold"><img src= {user.
photoURL}></img></span>
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                  <li><NavLink to="/admin-dashboard/profile">Profile</NavLink></li>
                  <li><NavLink to="/logout" className="text-red-500"><FaSignOutAlt className="mr-2" /> Logout</NavLink></li>
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
          <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <aside className="w-64 min-h-full bg-blue-50 text-blue-700 shadow-lg">
            <div className="p-4  border-b-1 border-blue-700">
              <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="font-bold">A</span>
                </div>
                Admin Panel
              </h2>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <NavLink 
                    to="/" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                  >
                    <FaHome className="text-blue-600" />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/admin-dashboard/profile" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/admin-dashboard/profile') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                  >
                    <FaUserCog className="text-blue-600" />
                    Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/admin-dashboard/aaddsclorship" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/admin-dashboard/add-scholarship') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                  >
                    <FaPlusCircle className="text-blue-600" />
                    Add Scholarship
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/admin-dashboard/manage-scholarship" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/admin-dashboard/manage-scholarship') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                  >
                    <FaTasks className="text-blue-600" />
                    Manage Scholarship
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/admin-dashboard/manage-applied-application" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/admin-dashboard/manage-applied-application') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                  >
                    <FaFileAlt className="text-blue-600" />
                    Manage Applications
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/admin-dashboard/manage-users" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/admin-dashboard/manage-users') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                  >
                    <FaUsers className="text-blue-600" />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/admin-dashboard/manage-review" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/admin-dashboard/manage-review') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                  >
                    <FaStar className="text-blue-600" />
                    Manage Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/admin-dashboard/analytics" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/admin-dashboard/analytics') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                  >
                    <FaChartLine className="text-blue-600" />
                    Analytics
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-blue-100">
              <NavLink 
                to="/logout" 
                className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50"
              >
                <FaSignOutAlt />
                Logout
              </NavLink>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;