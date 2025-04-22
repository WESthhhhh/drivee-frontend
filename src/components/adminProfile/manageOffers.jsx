'use client'
import { Trash } from "../UI/icons";
import { useState, useEffect, useMemo } from "react";
import LoadingSpinner from '../UI/loadingSpinner';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io';
import Button from '../UI/button';

const DeleteConfirmationModal = ({ 
  isOpen, 
  closeModal, 
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col relative overflow-hidden">
        <div className="sticky top-0 bg-white z-10 pt-5 px-5 pb-4 border-b border-gray-200">
          <div className="relative flex justify-center items-center">
            <h1 className="text-[#0F34AE] font-bold text-xl text-center mt-4">{title}</h1>
            <button 
              onClick={closeModal}
              className="absolute right-0 w-8 h-8 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-sm text-gray-700 font-bold text-xl transition-colors"
              disabled={isLoading}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
  
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="space-y-5">
            <p className="text-gray-700">{message}</p>
          </div>
        </div>
        
        <div className="p-5 pt-2 border-t border-gray-200 flex gap-3">
          <Button
            type="secondary"
            onClick={closeModal}
            className="w-full py-2 text-sm"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="danger"
            onClick={onConfirm}
            className="w-full py-2 text-sm"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function AdminOffers() {
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const limit = 10;

  // Calculate pagination
  const { offers, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      offers: allOffers.slice(startIndex, endIndex),
      totalPages: Math.ceil(allOffers.length / limit)
    };
  }, [allOffers, currentPage]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAllOffers();
      } catch (error) {
        setError(error.message);
      }
    };
    loadData();
  }, []);

  const fetchAllOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/offres`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to load offers: ${response.status}`);
      }

      const data = await response.json();
      setAllOffers(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async () => {
    try {
      setIsDeleting(true);
      const deleteUrl = `${import.meta.env.VITE_API_BASE_URL}/offres/${selectedOffer.id}`;
      
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete offer');
      }
  
      await fetchAllOffers();
      setIsDeleteModalOpen(false);
      setSuccessMessage(`"${selectedOffer.title}" was deleted successfully`);
      
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete offer");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="-space-y-4">
        <div className="text-[#0F34AE] text-[25px] font-bold">Manage Offers</div>
        <div className="flex justify-center items-center h-[100px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 mt-9 font-poppins">
      <div className="space-y-6">
        <h1 className="text-[#0F34AE] text-2xl font-bold">
          All Offers ({allOffers.length})
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div className="p-4 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
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

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F5FBFB] font-semibold text-[#0B247A]">
                <div className="col-span-2">School Name</div>
                <div className="col-span-2">Offer Title</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-1">Duration</div>
                <div className="col-span-2">Start Date</div>
                <div className="col-span-2">End Date</div>
                <div className="col-span-1">Action</div>
              </div>
              
              {offers.length === 0 ? (
                <div className="py-12 text-center text-gray-500 col-span-12">
                  No offers found
                </div>
              ) : (
                offers.map((offer) => (
                  <div 
                    key={offer.id} 
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-2 font-medium">{offer.schoolName || 'N/A'}</div>
                    <div className="col-span-2 truncate pr-4">{offer.title || 'N/A'}</div>
                    <div className="col-span-1">${offer.price || '0'}</div>
                    <div className="col-span-1">{offer.durationHours || 'N/A'} hrs</div>
                    <div className="col-span-2 whitespace-nowrap">{formatDate(offer.startDate)}</div>
                    <div className="col-span-2 whitespace-nowrap">{formatDate(offer.endDate)}</div>
                    <div className="col-span-1 flex justify-center">
                      <button 
                        onClick={() => {
                          setSelectedOffer(offer);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors group relative"
                        aria-label="Delete offer"
                        disabled={loading}
                      >
                        <Trash className="w-5 h-5" />
                        <span className="sr-only">Delete offer</span>
                        <span className="absolute invisible group-hover:visible text-xs bg-gray-800 text-white px-2 py-1 rounded -mt-8 -ml-2 whitespace-nowrap">
                          Delete Offer
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
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
                className="p-2 rounded-full disabled:opacity-50 hover:bg-gray-100 transition-colors"
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
                        ? 'bg-[#0F34AE] text-white' 
                        : 'hover:bg-gray-100 text-[#0B247A]'
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
                className="p-2 rounded-full disabled:opacity-50 hover:bg-gray-100 transition-colors"
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