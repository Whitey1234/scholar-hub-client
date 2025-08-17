import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaUserShield, FaEnvelope, FaIdCard, FaCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const AdminProfile = () => {
  const { user, userRole } = useContext(AuthContext);

  // Format join date (example implementation)
  const joinDate = user?.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Unknown';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl p-6 text-white text-center">
          <div className="relative inline-block">
            <img
              src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.jpg'}
              alt="Admin"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto"
              onError={(e) => {
                e.target.src = 'https://i.ibb.co/4pDNDk1/avatar.jpg';
              }}
            />
            {user?.emailVerified && (
              <div className="absolute bottom-0 right-0 bg-blue-100 rounded-full p-1">
                <MdVerified className="text-blue-600 text-xl" />
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold mt-4">{user?.displayName || 'Admin'}</h1>
          <div className="inline-flex items-center mt-2 px-4 py-1 text-blue-700 bg-white bg-opacity-20 rounded-full">
            <FaUserShield className="mr-2" />
            <span className="font-medium">{userRole}</span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-b-xl shadow-lg divide-y divide-gray-100">
          {/* Admin Information */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Information</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaEnvelope className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">
                    {user?.email}
                    {user?.emailVerified && (
                      <span className="ml-2 text-xs text-green-600">(Verified)</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaIdCard className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-mono text-sm text-gray-700 break-all">
                    {user?.uid}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaCalendarAlt className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Admin Since</p>
                  <p className="font-medium">{joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Statistics */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Scholarships Managed</p>
                <p className="text-2xl font-bold text-blue-600">42</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Users Managed</p>
                <p className="text-2xl font-bold text-green-600">128</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Reviews Processed</p>
                <p className="text-2xl font-bold text-purple-600">256</p>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          {/* <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Actions</h2>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary gap-2">
                <FaCog />
                Admin Settings
              </button>
              <button className="btn btn-outline">
                View System Logs
              </button>
              <button className="btn btn-error text-white ml-auto">
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;