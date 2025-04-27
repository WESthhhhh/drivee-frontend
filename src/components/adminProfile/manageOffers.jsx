'use client'
import { Trash } from "../UI/icons";
import { useState, useEffect, useMemo } from "react";
import LoadingSpinner from '../UI/loadingSpinner';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DeleteConfirmationModal from '../modals/deleteConfirmation'; 
import { fetchAllOffers, deleteOffer } from "../../services/offersApi";
import { format } from 'date-fns';
/**
 * @typedef {Object} Offer
 * @property {string} id
 * @property {string} title
 * @property {string} schoolName
 * @property {number} price
 * @property {number} durationHours
 * @property {string} startDate
 * @property {string} endDate
 * @property {Object} location
 * @property {string} location.address
 * @property {string} location.city
 */

export default function AdminOffers() {
  /** @type {[Offer[], React.Dispatch<React.SetStateAction<Offer[]>>]} */
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  /** @type {[Offer|null, React.Dispatch<React.SetStateAction<Offer|null>>]} */
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const limit = 10;

  const { offers, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      offers: allOffers.slice(startIndex, endIndex),
      totalPages: Math.ceil(allOffers.length / limit)
    };
  }, [allOffers, currentPage]);

  const fetchOffersData = async () => {  
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllOffers(); 
      setAllOffers(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error instanceof Error ? error.message : 'Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffersData();
  }, []);

  const handleDeleteOffer = async () => {
    if (!selectedOffer) return;
    
    try {
      setIsDeleting(true);
      await deleteOffer(selectedOffer.id);
      await fetchOffersData();
      setSuccessMessage(`"${selectedOffer.title}" was deleted successfully`);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete offer");
    } finally {
      setIsDeleting(false);
    }
  };

 
  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };

  if (loading) {
    return (
      <div className="-space-y-4">
        <div className="text-b200 text-[25px] font-bold">Manage Offers</div>
        <div className="flex justify-center items-center h-[100px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 mt-9 font-poppins">
      <div className="space-y-6">
        <h1 className="text-b200 text-2xl font-bold">Manage Offers</h1>

        {successMessage && (
          <div className="p-4 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          closeModal={() => !isDeleting && setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteOffer}
          title="Delete Offer"
          message={`Are you sure you want to delete "${selectedOffer?.title}"?`}
          isLoading={isDeleting}
        />

<div className="rounded-large-md overflow-hidden ">
  {/* Table Header */}
  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#F5FBFB] font-semibold text-primary text-sm">
    <div className="col-span-2">School</div>
    <div className="col-span-3">Offer Title</div>
    <div className="col-span-1 text-right">Price</div>
    <div className="col-span-2">Location</div>
    <div className="col-span-1 text-center">Duration</div>
    <div className="col-span-2">Start Date</div>
    <div className="col-span-1 text-center">Actions</div>
  </div>
  
  {/* Table Body */}
  {offers.length === 0 ? (
    <div className="py-12 text-center text-gray-500 text-sm">
      No offers found
    </div>
  ) : (
    <div className="divide-y divide-gray-100">
      {offers.map((offer) => (
        <div 
          key={offer.id} 
          className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-sm items-center"
        >
          {/* School Name */}
          <div className="col-span-2 truncate font-medium text-gray-800">
            {offer.schoolName || 'N/A'}
          </div>
          
          {/* Offer Title */}
          <div className="col-span-3 truncate text-gray-700">
            {offer.title || 'N/A'}
          </div>
          
          {/* Price */}
          <div className="col-span-1 text-right font-medium text-gray-800">
            ${offer.price ? offer.price.toLocaleString() : '0'}
          </div>
          
          {/* Location */}
          <div className="col-span-2 truncate text-gray-600">
            {offer.location?.city || 'N/A'}
          </div>
          
          {/* Duration */}
          <div className="col-span-1 text-center text-gray-600">
            {offer.durationHours || 'N/A'}h
          </div>
          
          {/* Start Date */}
          <div className="col-span-2 text-gray-600">
            {offer.startDate ? format(new Date(offer.startDate), 'MMM dd, yyyy') : 'N/A'}
          </div>
          
          {/* Actions */}
          <div className="col-span-1 flex justify-center">
            <button 
              onClick={() => {
                setSelectedOffer(offer);
                setIsDeleteModalOpen(true);
              }}
              className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors group relative"
              aria-label="Delete offer"
            >
              <Trash className="w-4 h-4" />
              <span className="sr-only">Delete offer</span>
              <span className="absolute invisible group-hover:visible text-xs bg-gray-800 text-white px-2 py-1 rounded -mt-8 -ml-2 whitespace-nowrap">
                Delete Offer
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mb-16 mt-6">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, allOffers.length)} of {allOffers.length} offers
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full disabled:opacity-50 hover:bg-b50 transition-colors"
                aria-label="Previous page"
              >
                <FaChevronLeft className="text-[#0B247A]" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
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
                        ? 'bg-b200 text-white' 
                        : 'hover:bg-b50 text-[#0B247A]'
                    } transition-colors`}
                    aria-label={`Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full disabled:opacity-50 hover:bg-b50 transition-colors"
                aria-label="Next page"
              >
                <FaChevronRight className="text-[#0B247A]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}