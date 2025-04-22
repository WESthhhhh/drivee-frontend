'use client'
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LoadingSpinner from '../UI/loadingSpinner';

export default function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 10;
    
    useEffect(() => {
        fetchReservations();
    }, [currentPage]);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/reservations/all-reservations?page=${currentPage}&limit=${limit}`, 
                {
                    credentials: 'include'
                }
            );
          
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
          
            const data = await response.json();
            
            // Handle both paginated and non-paginated responses
            if (data.data) {
                // Paginated response
                setReservations(data.data);
                setTotalPages(data.totalPages);
                setTotalItems(data.total);
            } else {
                // Non-paginated response
                setReservations(data);
                setTotalPages(Math.ceil(data.length / limit));
                setTotalItems(data.length);
            }
        } catch (err) {
            console.error('Error fetching reservations:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch(status.toLowerCase()) {
            case 'pending':
                return {
                    bg: 'bg-[#F2FAF4]',
                    text: 'text-[#4F7E59]',
                    border: 'border-[#4F7E59]'
                };
            case 'confirmed':
                return {
                    bg: 'bg-[#EFF8FF]',
                    text: 'text-[#3B82F6]',
                    border: 'border-[#3B82F6]'
                };
            case 'cancelled':
                return {
                    bg: 'bg-[#FEF0F0]',
                    text: 'text-[#EF4444]',
                    border: 'border-[#EF4444]'
                };
            default:
                return {
                    bg: 'bg-b50',
                    text: 'text-gray-800',
                    border: 'border-gray-800'
                };
        }
    };

    const getPaymentStatusStyle = (status) => {
        switch(status.toLowerCase()) {
            case 'paid':
                return {
                    bg: 'bg-[#F2FAF4]',
                    text: 'text-[#4F7E59]',
                    border: 'border-[#4F7E59]'
                };
            case 'unpaid':
                return {
                    bg: 'bg-[#FEF0F0]',
                    text: 'text-[#93403E]',
                    border: 'border-[#93403E]'
                };
            case 'partial':
                return {
                    bg: 'bg-[#FFF7ED]',
                    text: 'text-[#F97316]',
                    border: 'border-[#F97316]'
                };
            default:
                return {
                    bg: 'bg-b50',
                    text: 'text-gray-800',
                    border: 'border-gray-800'
                };
        }
    };

    if (loading) {
        return (
          <div className="-space-y-4">
            <div className="text-b200 text-[25px] font-bold">Reservations</div>
            <div className="flex justify-center items-center h-[100px]">
              <LoadingSpinner /> 
            </div>
          </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-12 px-5 mt-9 font-poppins">
                <div className="text-b200 text-[25px] font-bold">Reservations</div>
                <div className="text-error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="px-5 mt-9 font-poppins">
            <div className="space-y-6">
                <h1 className="text-b200 text-2xl font-bold">All Reservations</h1>

                <div className="light rounded-large-md overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F5FBFB] font-semibold text-primary">
                        <div className="col-span-2">Student</div>
                        <div className="col-span-2">School</div>
                        <div className="col-span-2">Offer</div>
                        <div className="col-span-2">Reservation Date</div>
                        <div className="col-span-2">Start Date</div>
                        <div className="col-span-2">Payment</div>
                    </div>
                    
                    {reservations.length === 0 ? (
                        <div className="py-12 text-center text-inputtext">
                            No reservations found
                        </div>
                    ) : (
                        reservations.map((reservation) => (
                            <div 
                                key={reservation.id} 
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-b50 hover:bg-gray-50 transition-colors"
                            >
                                <div className="col-span-2 truncate max-w-[180px]">
                                    {reservation.student?.firstName || 'N/A'}
                                </div>
                                <div className="col-span-2 truncate max-w-[180px]">
                                    {reservation.school?.firstName || 'N/A'}
                                </div>
                                <div className="col-span-2 truncate max-w-[180px]">
                                    {reservation.offre?.title || 'N/A'}
                                </div>
                                <div className="col-span-2 max-w-[180px]">
                                    {new Date(reservation.reservationDate).toLocaleDateString()}
                                </div>
                                <div className="col-span-2 max-w-[180px]">
                                    {new Date(reservation.startDate).toLocaleDateString()}
                                </div>
                                
                                <div className=" pl-6">
                                    <div className={`${getPaymentStatusStyle(reservation.paymentStatus).bg} p-2 flex items-center gap-2 ${getPaymentStatusStyle(reservation.paymentStatus).text} w-fit rounded-lg`}>
                                        <div className={`w-2 h-2 rounded-full border ${getPaymentStatusStyle(reservation.paymentStatus).border}`}></div>
                                        <span className="capitalize text-sm">{reservation.paymentStatus}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination with item count */}
                {totalPages > 1 && (
                    <div className="flex flex-col items-center gap-4 mb-16 mt-6">
                        <div className="text-sm text-gray-600">
                            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalItems)} of {totalItems} reservations
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-full disabled:opacity-50 hover:bg-cayan50 transition-colors"
                            >
                                <FaChevronLeft className="text-b200" />
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
                    </div>
                )}
            </div>
        </div>
    );
}