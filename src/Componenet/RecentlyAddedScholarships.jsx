import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave, FaStar, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import axiosSecure from '../Hooks/useAxiosSecure';

const RecentlyAddedScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get('/scholarships')
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        setScholarships(sorted.slice(0, 4));
      });
  }, []);

  const average = (arr = []) => {
    if (!arr.length) return 0;
    return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-700 mb-3">Recently Added Scholarships</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fresh opportunities just added to our platform - apply before they're gone!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {scholarships.map(item => (
          <div 
            key={item._id} 
            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Ribbon for "New" tag */}
            <div className="absolute -right-8 -top-0 w-32 bg-blue-500 text-white text-xs font-bold py-1 px-5 transform rotate-45 text-center z-10">
              NEW
            </div>
            
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-start gap-5 mb-4">
                <div className="relative">
                  <img 
                    src={item.universityLogo} 
                    alt="logo" 
                    className="w-16 h-16 rounded-full border-2 border-blue-400 object-cover" 
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {average(item.ratings)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-800">{item.universityName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {item.scholarshipCategory}
                    </span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      {item.subjectCategory}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span className="text-sm">
                    {item.location.city}, {item.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaMoneyBillWave className="text-green-500" />
                  <span className="text-sm">${item.applicationFees} fee</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-red-600 font-medium">
                    ⏳ Closes {format(new Date(item.deadline), 'MMM dd, yyyy')}
                  </div>
                  <button
                    onClick={() => navigate(`/scolarship-details/${item._id}`)}
                    className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    View Details <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate('/all-scholarship')}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Browse All Scholarships
        </button>
      </div>
    </div>
  );
};

export default RecentlyAddedScholarships;