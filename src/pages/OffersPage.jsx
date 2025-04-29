import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import OfferCard from '../components/cards/offerCards';
import { useOffers } from '../context/fetchOffers';
import LoadingSpinner from '../components/UI/loadingSpinner';

const OffersPage = () => {
  const { offers, loading, error } = useOffers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (loading) return <LoadingSpinner message="Loading offers..." />;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  // Paginate offers
  const totalPages = Math.ceil(offers.length / itemsPerPage);
  const paginatedOffers = offers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-6xl w-full mx-auto overflow-x-hidden px-4 pt-12">
      {/* Background elements */}
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

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center mb-12 gap-6 lg:px-14">
        {paginatedOffers.length > 0 ? (
          paginatedOffers.map(offer => (
            <div key={offer.id} className="w-full max-w-md">
              <OfferCard offer={offer} />
            </div>
          ))
        ) : (
          <div className="col-span-2 w-full text-center py-12">
            <p className="text-inputtext mb-4">No offers available</p>
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