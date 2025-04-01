import React, { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaDollarSign, FaRegClock } from 'react-icons/fa6';
import OfferDetailModal from '../modals/offerDetail';

const OfferCard = ({ offer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={offer.img} 
            alt={offer.school} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="text-left">
            <h2 className="text-lg font-semibold text-primary">{offer.school}</h2>
            <span className="inline-block px-2 py-1 bg-blue-50 text-primary text-xs font-medium rounded">
              {offer.title}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-text mb-3 text-left">{offer.name}</h3>
        <p className="text-gray-600 text-left mb-6">{offer.description}</p>

        <div className="flex justify-between mb-6">
          <div className="flex items-center gap-2">
            <IoLocationOutline className="text-primary" />
            <span className="text-sm text-gray-700">{offer.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-primary" />
            <span className="text-sm text-gray-700">{offer.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegClock className="text-primary" />
            <span className="text-sm text-gray-700">{offer.hour}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={openModal}
            className="flex-1 py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 transition"
          >
            View Details
          </button>
          <button className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition">
            Book Offer
          </button>
        </div>
      </div>

      <OfferDetailModal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        offer={offer} 
      />
    </>
  );
};

export default OfferCard;