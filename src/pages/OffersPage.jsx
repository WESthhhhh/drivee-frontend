import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { offers } from '../offers';
import OfferCard from '../components/cards/offerCards';


const OffersPage = () => {
  // State management
  const [filters, setFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter offers
  const filteredOffers = offers.filter(offer => {
    const price = parseInt(offer.price.replace('dh', ''));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    const matchesLocation = filters.includes(offer.location);
    const matchesRating = filters.some(f => f.includes('Star') && offer.rating >= parseInt(f));
    
    return matchesPrice && (filters.length === 0 || matchesLocation || matchesRating);
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
    setPriceRange([0, value]);
    setFilters(prev => [...prev.filter(f => !f.startsWith('Price')), `Price: 0-${value}dh`]);
    setCurrentPage(1);
  };

  const addFilter = (filter) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
      setCurrentPage(1);
    }
    setOpenDropdown(null);
  };

  const removeFilter = (filter) => {
    if (filter.startsWith('Price')) setPriceRange([0, 1000]);
    setFilters(filters.filter(f => f !== filter));
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
    <div className="max-w-[1200px] w-full mx-auto pt-[15rem] min-h-[200vh] overflow-x-hidden px-4">
      {/* Header */}
      <h1 className="text-[2.5rem] text-center font-normal mb-12">
        Limited-Time <span className="font-semibold text-primary">Offers</span> on Driving Packages!
      </h1>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-8">
        <h2 className="text-lg font-medium">Filter:</h2>
        <div className="flex flex-wrap gap-4">
          {/* Price Filter */}
          <div className="dropdown_container relative">
            <button 
              className="flex items-center gap-3 px-4 py-2 text-primary font-medium border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
              onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
            >
              Price Range <FaChevronDown className={`transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'price' && (
              <div className="dropdown absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-64 z-50 border border-gray-100">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full mb-2 accent-primary"
                />
                <div className="flex justify-between text-sm text-primary">
                  <span>0dh</span>
                  <span>{priceRange[1]}dh</span>
                </div>
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="dropdown_container relative">
            <button 
              className="flex items-center gap-3 px-4 py-2 text-primary font-medium border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
              onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
            >
              Location <FaChevronDown className={`transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'location' && (
              <div className="dropdown absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48 z-50 border border-gray-100">
                {["Casablanca", "Rabat", "Marrakech"].map(location => (
                  <div
                    key={location}
                    className="py-2 px-4 hover:bg-primary/5 cursor-pointer text-primary rounded-md"
                    onClick={() => addFilter(location)}
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
              className="flex items-center gap-3 px-4 py-2 text-primary font-medium border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
              onClick={() => setOpenDropdown(openDropdown === 'rating' ? null : 'rating')}
            >
              Ratings <FaChevronDown className={`transition-transform ${openDropdown === 'rating' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'rating' && (
              <div className="dropdown absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48 z-50 border border-gray-100">
                {["5 Star", "4 Star", "3 Star"].map(rating => (
                  <div
                    key={rating}
                    className="py-2 px-4 hover:bg-primary/5 cursor-pointer text-primary rounded-md"
                    onClick={() => addFilter(rating)}
                  >
                    {rating}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map(filter => (
            <span 
              key={filter} 
              className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm text-primary"
            >
              {filter}
              <button 
                onClick={() => removeFilter(filter)}
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Offers Grid - Responsive with centered layout */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {paginatedOffers.length > 0 ? (
          paginatedOffers.map(offer => (
            <div 
              key={offer.id}
              className=""
            >
              <OfferCard offer={offer} />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-gray-500 mb-4">No offers match your filters</p>
            <button
              onClick={() => {
                setFilters([]);
                setPriceRange([0, 1000]);
              }}
              className="px-4 py-2 text-primary hover:underline"
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
            className="p-2 rounded-full disabled:opacity-50 hover:bg-primary/10 transition-colors"
          >
            <FaChevronLeft className="text-primary" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === i + 1 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-primary/10 text-primary'
              } transition-colors`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full disabled:opacity-50 hover:bg-primary/10 transition-colors"
          >
            <FaChevronRight className="text-primary" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OffersPage;