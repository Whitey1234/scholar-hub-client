import { NavLink,  Outlet, useLocation } from "react-router";
import { FaUser, FaClipboardList, FaStar, FaPlus, FaThList, FaHome, FaSignOutAlt, FaChartLine, FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const ModeratorDashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  // Check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mobile Header */}
      <header className="lg:hidden bg-blue-50 text-blue-700 shadow-md">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="btn btn-ghost btn-circle"
          >
            {showSidebar ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
          <h1 className="text-lg font-semibold">Moderator Panel</h1>
          <div className="w-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
            <span className="font-bold">{user?.displayName?.charAt(0) || 'M'}</span>
          </div>
        </div>
      </header>

      <div className="drawer lg:drawer-open">
        <input 
          id="moderator-drawer" 
          type="checkbox" 
          className="drawer-toggle" 
          checked={showSidebar}
          onChange={() => setShowSidebar(!showSidebar)}
        />
        
        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Desktop Header */}
          <header className="hidden lg:flex items-center justify-between bg-blue-50 text-blue-700 shadow-sm p-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-700 ml-4">
                Moderator Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <span className="font-bold">{user?.displayName?.charAt(0) || 'M'}</span>
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                  <li><NavLink to="profile">Profile</NavLink></li>
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
          <label 
            htmlFor="moderator-drawer" 
            aria-label="close sidebar" 
            className="drawer-overlay"
            onClick={() => setShowSidebar(false)}
          ></label>
          <aside className="w-64 min-h-full bg-blue-50 text-blue-700 shadow-lg">
            <div className="p-4 border-b border-blue-100">
              <h2 className="text-xl font-bold  text-blue-700 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="font-bold"> <img src={user?.photoURL}></img></span>
                </div>
                Moderator Panel
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
                    <FaHome className="text-blue-600" />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="profile" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/moderator-dashboard') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <FaUser className="text-blue-600" />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="manage-scholarshipsmod" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/moderator-dashboard/manage-scholarshipsmod') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <FaThList className="text-blue-600" />
                    Manage Scholarships
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="allreview" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/moderator-dashboard/allreview') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <FaStar className="text-blue-600" />
                    All Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="applied-scholarships" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/moderator-dashboard/applied-scholarships') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <FaClipboardList className="text-blue-600" />
                    Applied Scholarships
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="addscholarship" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/moderator-dashboard/addscholarship') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <FaPlus className="text-blue-600" />
                    Add Scholarship
                  </NavLink>
                </li>
                <li>
                  {/* <NavLink 
                    to="analytics" 
                    className={`flex items-center gap-3 p-3 rounded-lg ${isActive('/moderator-dashboard/analytics') ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-blue-50'}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <FaChartLine className="text-blue-600" />
                    Analytics
                  </NavLink> */}
                </li>
              </ul>
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-blue-100">
              <NavLink 
                to="/logout" 
                className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50"
                onClick={() => setShowSidebar(false)}
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

export default ModeratorDashboardLayout;