import React, { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaDollarSign, FaRegClock } from 'react-icons/fa6';
import OfferDetailModal from '../modals/offerDetail';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom';

const OfferCard = ({ offer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Safely access nested properties
  const schoolName = offer.school?.name || 'Unknown School';
  const schoolImage = offer.school?.image || 'default-school-image.jpg';
  const location = offer.location?.city || 'Location not specified';
  const price = offer.price ? `${offer.price} dh` : 'Price not specified';
  const duration = offer.durationHours ? `${offer.durationHours} hours` : 'Duration not specified';

  return (
    <>
      <div className="bg-light rounded-large-md border border-b50 shadow-primary-4 p-6 w-[350px] max-w-md md:w-[470px] flex flex-col justify-center h-[402px]">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={schoolImage} 
            alt={schoolName} 
            className="w-16 h-16 rounded-full object-cover"
            loading='lazy'
          />
          <div className="text-left">
            <h2 className="text-lg font-bold text-b200">{schoolName}</h2>
            <span className="inline-block px-2 py-1 bg-b50 text-primary text-xs font-medium rounded">
              Pro
            </span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-text mb-3 text-left">{offer.title || 'No title'}</h3>
        <p className="text-inputtext text-left mb-6">
          {offer.description || 'No description available'}
        </p>

        <div className="flex justify-center gap-[40px] mb-6 text-primary">
          <div className="flex flex-col justify-center rounded-small-md items-center gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <IoLocationOutline />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex flex-col justify-center items-center rounded-small-md gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <FaDollarSign />
            <span className="text-sm">{price}</span>
          </div>
          <div className="flex flex-col justify-center items-center rounded-small-md gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <FaRegClock />
            <span className="text-sm">{duration}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button type='secondary' onClick={() => setIsModalOpen(true)}>
            View Details
          </Button>
          <Button type='primary' onClick={() => navigate('/reservation')}>
            Book Offer
          </Button>
        </div>
      </div>

      <OfferDetailModal 
        isOpen={isModalOpen} 
        closeModal={() => setIsModalOpen(false)} 
        offer={offer} 
      />
    </>
  );
};

export default OfferCard;