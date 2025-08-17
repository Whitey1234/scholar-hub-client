import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import {
  FaUniversity,
  FaMoneyBillWave,
  FaRegClock,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import axiosSecure from "../Hooks/useAxiosSecure";

const TopScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure.get("/scholarships");
        const sorted = res.data
          .sort((a, b) => {
            const feeDiff =
              parseFloat(a.applicationFee) - parseFloat(b.applicationFee);
            if (feeDiff !== 0) return feeDiff;
            return new Date(b.postDate) - new Date(a.postDate);
          })
          .slice(0, 8); // Changed to 8 to fit 4-column layout
        setScholarships(sorted);
      } catch (error) {
        console.error("Failed to fetch scholarships", error);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-600 mb-3">Top Scholarships</h2>
        <p className="max-w-2xl mx-auto">
          Discover the best scholarship opportunities with low application fees
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="group bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={scholarship.universityLogo}
                alt={scholarship.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-700/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <button 
                  onClick={() => navigate(`/scholarship/${scholarship._id}`)}
                  className="text-white text-sm font-medium flex items-center gap-1"
                >
                  View Details <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-blue-700 line-clamp-2">
                  {scholarship.name}
                </h3>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                  ${scholarship.applicationFees}
                </span>
              </div>
              
              <p className="text-sm  flex items-center gap-2 mb-3">
                <FaUniversity className="text-blue-500" />
                <span className="line-clamp-1">{scholarship.universityName}</span>
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FaRegClock className="text-blue-500" />
                  <span className="">
                    Deadline: {format(new Date(scholarship.deadline), "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm ">
                  <FaCalendarAlt className="text-blue-500" />
                  <span>
                    Posted: {format(new Date(scholarship.createdAt), "dd MMM yyyy")}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => navigate(`/scolarship-details/${scholarship._id}`)}
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                Apply Now <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/all-scholarship")}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View All Scholarships
        </button>
      </div>
    </div>
  );
};

export default TopScholarship;