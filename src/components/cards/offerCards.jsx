import React, { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaDollarSign, FaRegClock } from 'react-icons/fa6';
import OfferDetailModal from '../modals/offerDetail';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom'; 
import { useOffers } from '../../context/fetchOffers';
const OfferCard = ({ offer }) => {
  const { users } = useOffers();
  const school = users[offer.schoolId] || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-light rounded-large-md border border-b50 shadow-primary-4 p-6 max-w-md md:w-[470px] flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-6">
          <img 
            src={offer.img} 
            alt={school.firstName || 'School'} 
            className="w-16 h-16 rounded-full object-cover"
            loading='lazy'
          />
          <div className="text-left">
            <h2 className="text-lg font-bold text-b200">{school.firstName || 'Unknown'} {school.lastName || ''}</h2>
            <span className="inline-block px-2 py-1 bg-b50  text-primary text-xs font-medium rounded">
              Pro
            </span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-text mb-3 text-left">{offer.title}</h3>
        <p className="text-inputtext text-left mb-6">{offer.description}</p>

        <div className="flex justify-center gap-[40px] mb-6 text-primary">
          <div className="flex flex-col justify-center rounded-small-md items-center gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <IoLocationOutline className="" />
            <span className="text-sm ">{offer.location}Agadir</span>
          </div>
          <div className="flex flex-col justify-center items-center rounded-small-md gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <FaDollarSign className="" />
            <span className="text-sm ">{offer.price} dh</span>
          </div>
          <div className="flex flex-col justify-center items-center rounded-small-md gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <FaRegClock className="" />
            <span className="text-sm ">{offer.durationHours} hours</span>
          </div>
        </div>

        <div className="flex  justify-center gap-4">
          
            <Button
            type='secondary'
            onClick={openModal}
            
            >View Details</Button>

          <Button
            type='primary'
            onClick={() => navigate('/reservation')}
            
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