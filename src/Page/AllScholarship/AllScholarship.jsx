import React, { useEffect, useState } from 'react';
import axiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { FaUniversity, FaMoneyBillWave, FaCalendarAlt, FaStar, FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const AllScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure('/scholarships');
        setScholarships(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };
    fetchScholarships();
  }, []);

  const handleSearch = () => {
    const query = searchText.toLowerCase();
    const result = scholarships.filter((sch) =>
      sch.universityName.toLowerCase().includes(query) ||
      sch.scholarshipCategory.toLowerCase().includes(query) ||
      sch.subjectCategory.toLowerCase().includes(query)
    );
    setFiltered(result);
    setCurrentPage(1);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...filtered];
    
    switch(option) {
      case 'fees-asc':
        sorted.sort((a, b) => a.applicationFees - b.applicationFees);
        break;
      case 'fees-desc':
        sorted.sort((a, b) => b.applicationFees - a.applicationFees);
        break;
      case 'deadline-asc':
        sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 'deadline-desc':
        sorted.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        break;
      case 'rating-desc':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Default sorting (perhaps by most recent)
        sorted = [...scholarships].filter(sch => 
          filtered.some(f => f._id === sch._id)
        );
    }
    
    setFiltered(sorted);
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search scholarships..."
              className="input input-bordered w-full pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button 
            className="btn bg-gradient-to-r from-blue-500 to-blue-400"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="w-full md:w-auto">
          <select 
            className="select select-bordered w-full"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="fees-asc">Fees: Low to High</option>
            <option value="fees-desc">Fees: High to Low</option>
            <option value="deadline-asc">Deadline: Earliest</option>
            <option value="deadline-desc">Deadline: Latest</option>
            <option value="rating-desc">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Scholarship Cards */}
      {currentItems.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold ">No scholarships found</h3>
          <p className=" ">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((item) => (
            <div key={item._id} className="card   border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={item.universityLogo} 
                  alt={item.universityName}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=University';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{item.universityName}</h3>
                  <p className="text-white/90 text-sm">{item.location.city}, {item.location.country}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="badge badge-primary mb-2">{item.scholarshipCategory}</span>
                    <h4 className="font-bold text-lg">{item.subjectCategory}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${item.applicationFees}</p>
                    <p className="text-sm  ">Application Fee</p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span className="text-sm">
                      <strong>Deadline:</strong> {formatDate(item.deadline)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm">
                      <strong>Rating:</strong> {item.rating?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                </div>

                <Link to={`/scolarship-details/${item._id}`}>
                  <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            className={`btn btn-outline ${currentPage === 1 ? 'btn-disabled' : ''}`}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className={`btn btn-outline ${currentPage === totalPages ? 'btn-disabled' : ''}`}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllScholarship;