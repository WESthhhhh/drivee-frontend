import React, { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaDollarSign, FaRegClock } from 'react-icons/fa6';
import OfferDetailModal from '../modals/offerDetail';
import Button from '../UI/button';
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
      <div className="bg-light rounded-large-md shadow-primary-4 p-6 max-w-md w-full ">
      <div className="flex items-center gap-4 mb-6">
          <img 
            src={offer.img} 
            alt={offer.school} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="text-left">
            <h2 className="text-lg font-bold text-primary">{offer.school}</h2>
            <span className="inline-block px-2 py-1 bg-b50  text-primary text-xs font-medium rounded">
              {offer.title}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-text mb-3 text-left">{offer.name}</h3>
        <p className="text-inputtext text-left mb-6">{offer.description}</p>

        <div className="flex justify-center gap-[70px] mb-6 text-primary">
          <div className="flex flex-col justify-center items-center gap-2 text-primary">
            <IoLocationOutline className="" />
            <span className="text-sm ">{offer.location}</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <FaDollarSign className="" />
            <span className="text-sm ">{offer.price}</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <FaRegClock className="" />
            <span className="text-sm ">{offer.hour}</span>
          </div>
        </div>

        <div className="flex  justify-center gap-4">
          
            <Button
            type='secondary'
            onClick={openModal}
            
            >View Details</Button>

          <Button
            type='primary'
            onClick={() => navigate('/book')}
            
            >Book Offer</Button>
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