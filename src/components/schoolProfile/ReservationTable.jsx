'use client'
import { useState, useEffect } from "react";

export default function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchReservations = async () => {
            try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reservations/school`, {
    credentials: 'include'
});
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Received mock data:', data);
                setReservations(data);
            } catch (err) {
                console.error('Full error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchReservations();
    }, []);
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
                    bg: 'bg-gray-100',
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
                    bg: 'bg-gray-100',
                    text: 'text-gray-800',
                    border: 'border-gray-800'
                };
        }
    };

    if (loading) {
        return (
            <div className="space-y-12 px-5 mt-9 font-poppins">
                <div className="text-[#0F34AE] text-[25px] font-bold">Reservations</div>
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-12 px-5 mt-9 font-poppins">
                <div className="text-[#0F34AE] text-[25px] font-bold">Reservations</div>
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-12 px-5 mt-9 font-poppins">
            <div className="space-y-10">
                <div className="text-[#0F34AE] text-[25px] font-bold">School Reservations</div>
                <div className="">
                    <div className="mt-4">
                        <div className="bg-[#F5FBFB] flex gap-4 px-2 py-4 font-semibold text-[#0B247A]">
                            <div className="basis-2/12">Student</div>
                            <div className="basis-2/12">Offer</div>
                            <div className="basis-2/12">Reservation date</div>
                            <div className="basis-2/12">Start Date</div>
                            <div className="basis-2/12">Status</div>
                            <div className="basis-2/12">Payment Status</div>
                        </div>
                        
                        {reservations.length === 0 ? (
                            <div className="py-8 text-center text-gray-500">
                                No reservations found for your school yet
                            </div>
                        ) : (
                            reservations.map((reservation) => (
                                <div key={reservation.id} className="flex gap-4 px-2 py-4 border-b border-b50">
                                    <div className="basis-2/12">
                                        <div>{reservation.student?.name || 'N/A'}</div>
                                        <div className="text-sm text-gray-500">{reservation.student?.email || ''}</div>
                                    </div>
                                    <div className="basis-2/12">
                                        <div>{reservation.offre?.title || 'N/A'}</div>
                                        <div className="text-sm text-gray-500">${reservation.offre?.price || '0'}</div>
                                    </div>
                                    <div className="basis-2/12">{new Date(reservation.reservationDate).toLocaleDateString()}</div>
                                    <div className="basis-2/12">{new Date(reservation.startDate).toLocaleDateString()}</div>
                                    <div className="basis-2/12">
                                        <div className={`${getStatusStyle(reservation.status).bg} p-2 flex items-center gap-3 ${getStatusStyle(reservation.status).text} w-fit rounded-lg`}>
                                            <div className={`w-3 h-3 rounded-full border ${getStatusStyle(reservation.status).border}`}></div>
                                            <div className="capitalize">{reservation.status.toLowerCase()}</div>
                                        </div>
                                    </div>
                                    <div className="basis-2/12">
                                        <div className={`${getPaymentStatusStyle(reservation.paymentStatus).bg} p-2 flex items-center gap-3 ${getPaymentStatusStyle(reservation.paymentStatus).text} w-fit rounded-lg`}>
                                            <div className={`w-3 h-3 rounded-full border ${getPaymentStatusStyle(reservation.paymentStatus).border}`}></div>
                                            <div className="capitalize">{reservation.paymentStatus.toLowerCase()}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}