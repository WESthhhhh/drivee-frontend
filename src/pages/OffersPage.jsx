import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaTimes} from 'react-icons/fa';
import OfferCard from '../components/cards/offerCards';
import { useOffers } from '../context/fetchOffers';
import LoadingSpinner from '../components/UI/loadingSpinner';

const OffersPage = () => {
  // First call all hooks unconditionally at the top
  const { offers, users, loading, error, refreshData } = useOffers();
  const [filters, setFilters] = useState({
    location: null,
    rating: null,
    price: [0, 1000]
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown_container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

 
  if (loading) return <LoadingSpinner message="Loading offers..." />;

  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  // Filter offers with safe price handling
  const filteredOffers = offers.filter(offer => {
    let priceValue;
    
    try {
      priceValue = typeof offer.price === 'string' 
        ? parseInt(offer.price.replace(/[^0-9]/g, '')) 
        : offer.price;
    } catch (e) {
      priceValue = 0;
    }
    
    const matchesPrice = !isNaN(priceValue) && 
      priceValue >= filters.price[0] && 
      priceValue <= filters.price[1];
    const matchesLocation = filters.location ? offer.location === filters.location : true;
    const matchesRating = filters.rating ? offer.rating >= parseInt(filters.rating) : true;
    
    return matchesPrice && matchesLocation && matchesRating;
  });

  // Paginate offers
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
        [type]: [0, 1000]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto overflow-x-hidden px-4 pt-12">
      {/* Header */}
      <h1 className="text-[2.5rem] text-center font-normal mb-12 z-[999999999999999]">
        Limited-Time <span className="font-semibold text-primary">Offers</span> on Driving Packages!
      </h1>
      <img 
        src="/images/home-ellipse.png" 
        className="absolute top-0 right-0 w-auto h-auto" 
        alt="background circle" 
      />
      <img 
        src="/images/home-elli-b.png" 
        className="absolute right-[2%] top-1/2 w-auto h-auto" 
        alt="small decorative element" 
      />

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-8 z-[999999999999999]">
        <h2 className="text-lg font-medium">Filter:</h2>
        <div className="flex flex-wrap gap-4">
          {/* Price Filter */}
          <div className="dropdown_container relative">
            <button 
              className="flex items-center gap-3 px-4 py-2 text-b200 font-medium border border-b75 rounded-small-md hover:bg-cayan50 transition-colors"
              onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
            >
              {filters.price[1] === 1000 ? (
                "Price Range"
              ) : (
                <div className="flex items-center gap-2">
                  <span>0-{filters.price[1]}dh</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('price');
                    }}
                    className="text-b200/70 hover:text-b200 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              )}
              <FaChevronDown className={`transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'price' && (
              <div className="dropdown absolute top-full left-0 mt-2 bg-light shadow-primary-4 rounded-small-md p-4 w-64 z-50 border border-stroke">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.price[1]}
                  onChange={handlePriceChange}
                  className="w-full mb-2 accent-accent"
                />
                <div className="flex justify-between text-sm text-b200">
                  <span>0dh</span>
                  <span>{filters.price[1]}dh</span>
                </div>
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="dropdown_container relative">
            <button 
              className="flex items-center gap-3 px-4 py-2 text-b200 font-medium border border-b75 rounded-small-md hover:bg-cayan50 transition-colors"
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
              <div className="dropdown absolute top-full left-0 mt-2 bg-light shadow-primary-4 rounded-small-md p-2 w-48 z-50 border border-stroke">
                {["Casablanca", "Rabat", "Marrakech"].map(location => (
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
              className="flex items-center gap-3 px-4 py-2 text-b200 font-medium border border-b75 rounded-small-md hover:bg-cayan50 transition-colors"
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
              <div className="dropdown absolute top-full left-0 mt-2 bg-light shadow-primary-4 rounded-small-md p-2 w-48 z-50 border border-stroke">
                {["5", "4", "3"].map(rating => (
                  <div
                    key={rating}
                    className="py-2 px-4 hover:bg-cayan50 cursor-pointer text-b200 rounded-small-md"
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

      {/* <button 
        onClick={refreshData}
        className="flex items-center gap-2 px-4 py-2 bg-b50 text-primary rounded hover:bg-b100 transition-colors mb-4"
      >
        <FaSync /> Refresh
      </button> */}

      {/* Offers Grid */}
      <div className="grid md:grid-cols-2 justify-center gap-8 mb-12 z-[999999999999999]">
        {paginatedOffers.length > 0 ? (
          paginatedOffers.map(offer => (
            <div key={offer.id} className="w-full md:w-1/2 lg:w-1/3 ">
              <OfferCard 
                offer={offer}
                // school={offer.school}
                className="z-[999999999999999]"
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-inputtext mb-4">No offers match your filters</p>
            <button
              onClick={() => {
                setFilters({
                  location: null,
                  rating: null,
                  price: [0, 1000]
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
        <div className="flex justify-center gap-2 mb-16">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full disabled:opacity-50 hover:bg-cayan50 transition-colors"
          >
            <FaChevronLeft className="text-b200" />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === pageNum 
                    ? 'bg-primary text-light' 
                    : 'hover:bg-cayan50 text-b200'
                } transition-colors`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full disabled:opacity-50 hover:bg-cayan50 transition-colors"
          >
            <FaChevronRight className="text-b200" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OffersPage;