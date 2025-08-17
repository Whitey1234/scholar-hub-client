import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaUserShield, FaEnvelope, FaUser, FaCalendarAlt, FaEdit, FaClipboardList, FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const ModeratorProfile = () => {
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
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Profile Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
          <div className="relative inline-block">
            <img
              src={user?.photoURL || "https://i.ibb.co/SN8Ch7r/profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {user?.emailVerified && (
              <div className="absolute bottom-0 right-0 bg-blue-100 rounded-full p-1">
                <MdVerified className="text-blue-600 text-xl" />
              </div>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-white">
              {user?.displayName || "Moderator"}
            </h2>
            <div className="inline-flex items-center mt-2 px-4 py-1 bg-white bg-opacity-20 rounded-full">
              <FaUserShield className="mr-2" />
              <span className="font-medium text-white capitalize">{userRole}</span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Personal Information
              </h3>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaUser className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{user?.displayName || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaEnvelope className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">
                    {user?.email || "N/A"}
                    {user?.emailVerified && (
                      <span className="ml-2 text-xs text-green-600">(Verified)</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaCalendarAlt className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{joinDate}</p>
                </div>
              </div>
            </div>

            {/* Moderator Statistics */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Moderator Statistics
              </h3>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FaClipboardList className="text-blue-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Scholarships Managed</p>
                    <p className="text-2xl font-bold text-blue-600">42</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FaStar className="text-purple-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Reviews Processed</p>
                    <p className="text-2xl font-bold text-purple-600">128</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FaUserShield className="text-green-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Moderator Since</p>
                    <p className="text-lg font-bold text-green-600">6 months</p>
                  </div>
                </div>
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
              Update Moderator Settings
            </button>
          </div> */}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Moderator Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <FaClipboardList className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Approved new scholarship: "Computer Science Excellence Award"</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full mt-1">
              <FaStar className="text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Reviewed 5 user feedback submissions</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full mt-1">
              <FaUserShield className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">Updated scholarship application guidelines</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorProfile;