import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
// import { schools } from '../schools';
import SchoolCard from '../components/cards/schoolCards';

const DrivingSchools = () => {
  const ITEMS_PER_PAGE = 6;
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: null,
    rating: null,
    price: [0, 2000]
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/users?role=SCHOOL`,
          { credentials: "include" }
        );
        
        if (!response.ok) throw new Error('Failed to fetch schools');
        
        const data = await response.json();
        
        if (data.success) {
          const formattedSchools = data.data.map(user => ({
            id: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            location: user.address?.city || 'Location not specified',
            rating: user.rating || '4.5',
            description: user.bio || 'Driving school description not available',
            img: user.avatar || '/images/fallback-logo.png',
            bgimg: user.coverImage || '/images/fallback-bg.jpg',
            price: user.price || '0dh'
          }));
          setSchools(formattedSchools);
        } else {
          throw new Error(data.message || 'Failed to fetch schools');
        }
      } catch (err) {
        console.error("Error fetching schools:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);




  // Filter
  const filteredSchools = schools.filter(school => {
    const priceStr = school.price || "0dh";
    const price = parseInt(priceStr.replace('dh', '')) || 0;
    
    const matchesPrice = price >= filters.price[0] && price <= filters.price[1];
    const matchesLocation = filters.location ? 
      school.location.includes(filters.location) : true;
    const matchesRating = filters.rating ? 
      parseInt(school.rating) >= parseInt(filters.rating) : true;
    
    return matchesPrice && matchesLocation && matchesRating;
  });

  // Paginate schools
  const totalPages = Math.ceil(filteredSchools.length / ITEMS_PER_PAGE);
  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Filter handlers
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      price: [0, value]
    }));
    setCurrentPage(1);
  };

  const addFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
    setOpenDropdown(null);
  };

  const clearFilter = (type) => {
    if (type === 'price') {
      setFilters(prev => ({
        ...prev,
        [type]: [0, 2000]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown_container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl w-full mx-auto pt-12 overflow-x-hidden px-4 relative">
      <div className='max-w-6xl mx-auto'>
      
      <img 
        src="/images/home-ellipse.png" 
        className="absolute top-0 right-0 w-auto h-auto -z-10" 
        alt="background circle" 
      />
      <img 
        src="/images/home-elli-b.png" 
        className="absolute right-[2%] top-1/2 w-auto h-auto -z-10" 
        alt="small decorative element" 
      /> 

     
      
      <h1 className="text-[2.5rem] text-center font-normal mb-12 z-10">
        <span className="font-semibold text-primary">Trusted</span> Driving Schools
      </h1>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-8 z-10">
        <h2 className="text-lg font-medium">Filter:</h2>
        <div className="flex flex-wrap gap-4">
         

          {/* Location Filter */}
          <div className="dropdown_container relative">
            <button 
              className="flex items-center gap-3 px-4 py-2 text-b200 font-medium border border-b75 rounded-[10px] hover:bg-cayan50 transition-colors"
              onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
            >
              {filters.location ? (
                <div className="flex items-center gap-2">
                  <span>{filters.location}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('location');
                    }}
                    className="text-b200/70 hover:text-b200 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              ) : (
                "Location"
              )}
              <FaChevronDown className={`transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'location' && (
              <div className="dropdown absolute top-full left-0 mt-2 bg-light shadow-[0_0.5rem_1rem_rgba(0,0,0,0.1)] rounded-[10px] p-2 w-48 z-50 border border-stroke">
                {["Casablanca", "Rabat", "Marrakech", "Agadir"].map(location => (
                  <div
                    key={location}
                    className="py-2 px-4 hover:bg-cayan50 cursor-pointer text-b200 rounded-md"
                    onClick={() => addFilter('location', location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="dropdown_container relative">
            <button 
              className="flex items-center gap-3 px-4 py-2 text-b200 font-medium border border-b75 rounded-[10px] hover:bg-cayan50 transition-colors"
              onClick={() => setOpenDropdown(openDropdown === 'rating' ? null : 'rating')}
            >
              {filters.rating ? (
                <div className="flex items-center gap-2">
                  <span>{filters.rating} Star</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('rating');
                    }}
                    className="text-b200/70 hover:text-b200 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              ) : (
                "Ratings"
              )}
              <FaChevronDown className={`transition-transform ${openDropdown === 'rating' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'rating' && (
              <div className="dropdown absolute top-full left-0 mt-2 bg-light shadow-[0_0.5rem_1rem_rgba(0,0,0,0.1)] rounded-[10px] p-2 w-48 z-50 border border-stroke">
                {["5", "4", "3", "2", "1"].map(rating => (
                  <div
                    key={rating}
                    className="py-2 px-4 hover:bg-cayan50 cursor-pointer text-b200 rounded-[10px]"
                    onClick={() => addFilter('rating', rating)}
                  >
                    {rating} Star
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-12 z-10 px-4 md:px-8">
        {paginatedSchools.length > 0 ? (
          paginatedSchools.map(school => (
            <SchoolCard key={school.id} school={school} />
          ))
        ) : (
          <div className="w-full text-center py-12 col-span-3">
            <p className="text-inputtext mb-4 text-[1.5rem]  font-medium">
              No schools match your filters
            </p>
            <button
              onClick={() => {
                setFilters({
                  location: null,
                  rating: null,
                  price: [0, 2000]
                });
              }}
              className="px-4 py-2 text-b200 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-4 flex items-center justify-center  rounded-full border-none outline-none text-primary cursor-pointer disabled:opacity-50"
          >
            <FaChevronLeft className="text-primary" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-none outline-none cursor-pointer text-[1rem] ${
                currentPage === i + 1 
                  ? 'bg-primary text-light' 
                  : 'bg-cayan50 text-primary'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-4 flex items-center justify-center  rounded-full border-none outline-none text-primary cursor-pointer disabled:opacity-50"
          >
            <FaChevronRight className="text-primary" />
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default DrivingSchools;