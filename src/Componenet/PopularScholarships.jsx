import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave, FaStar, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import axiosSecure from '../Hooks/useAxiosSecure';

const PopularScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get('/scholarships')
      .then(res => {
        const sorted = res.data.sort((a, b) => {
          const avgA = average(a.ratings);
          const avgB = average(b.ratings);
          return avgB - avgA;
        });
        setScholarships(sorted.slice(0, 4));
      });
  }, []);

  const average = (arr = []) => {
    if (!arr.length) return 0;
    return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center mb-16">
        <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
          TOP RATED
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Most Popular <span className="text-blue-600">Scholarships</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the most sought-after scholarships based on student ratings and applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {scholarships.map((item, index) => (
          <div 
            key={item._id} 
            className="relative group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            {/* Award badge for top scholarship */}
            {index === 0 && (
              <div className="absolute top-1 right-1 bg-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 flex items-center">
                <FaStar className="mr-1" /> #1 Popular
              </div>
            )}

            <div className="p-6 flex flex-col h-full">
              <div className="flex items-start gap-5 mb-5">
                <div className="relative flex-shrink-0">
                  <img 
                    src={item.universityLogo} 
                    alt="logo" 
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md" 
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">
                    {average(item.ratings)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.universityName}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                      {item.scholarshipCategory}
                    </span>
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      {item.subjectCategory}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 text-gray-600 mb-3">
                  <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm">
                    {item.location.city}, {item.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 mb-3">
                  <FaMoneyBillWave className="text-green-500 flex-shrink-0" />
                  <span className="text-sm">
                    Application Fee: <span className="font-medium">${item.applicationFees}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="flex items-center text-yellow-400 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(average(item.ratings)) ? "text-yellow-400" : "text-gray-300"} 
                        size={14}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {average(item.ratings)}/5 ({item.ratings?.length || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-5 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">
                    <span className="text-red-500">⏳ </span>
                    <span className="text-gray-700">
                      {format(new Date(item.deadline), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/scolarship-details/${item._id}`)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    View Details
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button
          onClick={() => navigate('/all-scholarship')}
          className="relative inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <span className="relative z-10">Explore All Scholarships</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
        </button>
      </div>
    </div>
  );
};

export default PopularScholarships;