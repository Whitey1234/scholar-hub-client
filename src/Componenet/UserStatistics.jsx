import React, { useEffect, useState } from 'react';

import { FaUsers, FaUserShield, FaUserCog, FaChartPie } from 'react-icons/fa';
import axiosSecure from '../Hooks/useAxiosSecure';
import CountUp from 'react-countup';

const UserStatistics = () => {
  const [stats, setStats] = useState({
    total: 0,
    users: 0,
    admins: 0,
    moderators: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get('/users');
        setStats({
          total: res.data.length,
          users: res.data.filter((e)=>e. role == 'user').length,  
          admins: res.data.filter((e)=>e. role == "admin").length,  
          moderators: res.data.filter((e)=>e. role == "moderator").length,  
          
         
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user statistics', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);


  const userPercentage = (stats.users / stats.total) * 100;
  const adminPercentage = (stats.admins / stats.total) * 100;
  const moderatorPercentage = (stats.moderators / stats.total) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold  mb-3">
          <span className="text-blue-600">User</span> Statistics
        </h2>
        <p className=" max-w-2xl mx-auto">
          Overview of our community members and their roles
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
          <div className="grid grid-cols-2 gap-6">
           <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
  <div className="flex items-center justify-between">
    
  
    <div className="flex-1 flex flex-col items-center justify-center">
      <p className=" text-sm font-medium">Total Users</p>
      <h3 className="text-3xl font-bold  mt-15">
        <CountUp end={stats.total} duration={2} />
      </h3>
    </div>

   
    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
      <FaUsers size={24} />
    </div>
  </div>
</div>

           <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
  <div className="flex items-center justify-between">
    
   
    <div className="flex-1 flex flex-col items-center justify-center">
      <p className=" text-sm font-medium">Regular Users</p>
      <h3 className="text-3xl font-bold  mt-15">
        <CountUp end={stats.users} duration={2} />
      </h3>
    </div>

   
    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
      <FaUsers size={24} />
    </div>
  </div>
</div>

           <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
  <div className="flex items-center justify-between">
    
 
    <div className="flex-1 flex flex-col items-center justify-center">
      <p className=" text-sm font-medium">Admins</p>
      <h3 className="text-3xl font-bold  mt-15">
        <CountUp end={stats.admins} duration={2} />
      </h3>
    </div>

    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
      <FaUsers size={24} />
    </div>
  </div>
</div>

          <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
  <div className="flex items-center justify-between">
    
   
    <div className="flex-1 flex flex-col items-center justify-center">
      <p className=" text-sm font-medium">Moderators</p>
      <h3 className="text-3xl font-bold  mt-15">
        <CountUp end={stats.moderators} duration={2} 
         
        />
      </h3>
    </div>

    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
      <FaUsers size={24} />
    </div>
  </div>
</div>
          </div>

         
          <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold ">User Distribution</h3>
              <FaChartPie className="text-blue-500" size={20} />
            </div>
            <div className="relative h-64 w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="rounded-full border-8 border-gray-200"
                  style={{
                    width: '200px',
                    height: '200px',
                    background: `conic-gradient(
                      #10B981 ${userPercentage}%,
                      #8B5CF6 ${userPercentage}% ${userPercentage + adminPercentage}%,
                      #F59E0B ${userPercentage + adminPercentage}% ${userPercentage + adminPercentage + moderatorPercentage}%
                    )`
                  }}
                ></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-base" style={{ width: '120px', height: '120px' }}></div>
              </div>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm t">Users ({userPercentage.toFixed(1)}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm ">Admins ({adminPercentage.toFixed(1)}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm ">Moderators ({moderatorPercentage.toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStatistics;