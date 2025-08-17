import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaEnvelope, FaIdCard, FaUserShield, FaCalendarAlt, FaEdit, FaClipboardList } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const UserProfile = () => {
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
    <div className="max-w-2xl mx-auto my-8">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
          <div className="relative inline-block">
            <img
              src={user?.photoURL || 'https://i.ibb.co/5vJ8YxP/user.png'}
              alt="User"
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
            />
            {user?.emailVerified && (
              <div className="absolute bottom-0 right-0 bg-blue-100 rounded-full p-1">
                <MdVerified className="text-blue-600 text-xl" />
              </div>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-white">
              {user?.displayName || 'Unknown User'}
            </h2>
            {userRole !== 'user' && (
              <div className="inline-flex items-center mt-2 px-4 py-1 bg-white bg-opacity-20 rounded-full">
                <FaUserShield className="mr-2" />
                <span className="font-medium text-white">{userRole}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Personal Information
              </h3>
              
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">
                    {user?.email || 'Not provided'}
                    {user?.emailVerified && (
                      <span className="ml-2 text-xs text-green-600">(Verified)</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaIdCard className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-mono text-sm font-medium text-gray-700 break-all">
                    {user?.uid || 'Unavailable'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaCalendarAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{joinDate}</p>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Account Statistics
              </h3>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Scholarships Applied</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Applications Approved</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Pending Reviews</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
            <button className="btn btn-primary gap-2">
              <FaEdit />
              Edit Profile
            </button>
            <button className="btn btn-outline">
              Change Password
            </button>
            <button className="btn btn-ghost text-red-500 ml-auto">
              Delete Account
            </button>
          </div> */}
        </div>
      </div>

      {/* Additional Sections (example) */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaClipboardList className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Applied for Computer Science Scholarship</p>
              <p className="text-sm text-gray-500">2 days ago</p>
            </div>
          </div>
          {/* More activity items... */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;