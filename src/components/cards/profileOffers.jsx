import React, { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaDollarSign, FaRegClock } from 'react-icons/fa6';
import Button from '../UI/button';
import OfferDetail from '../modals/offerDetail';
import { useNavigate } from 'react-router-dom'; 

const defaultOffer = {
  id: 'default-id',
  title: 'Default Offer Title',
  description: 'No description available',
  img: '/images/default-course.jpg',
  location: 'Location not specified',
  price: '0',
  durationHours: '0',
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  school: {
    firstName: 'Unknown',
    lastName: 'School',
    profileImage: '/images/of-2.png'
  },
  rating: 0,
  reviews: 0,
  graph: '/images/default-map.jpg'
};

const PurchasedOffers = ({ offer = defaultOffer }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(offer.id);

  const fullOfferDetails = {
    ...defaultOffer,
    ...offer,
    school: {
      ...defaultOffer.school,
      ...(offer.school || {})
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="border border-stroke rounded-large-md p-6 space-y-6">
        <div className="space-y-3">
          <div className="text-text text-xl font-semibold">{fullOfferDetails.title}</div>
          <div className="text-inputtext">{fullOfferDetails.description}</div>

        </div>
        <div className="flex justify-center gap-[40px] mb-6 text-primary">
                  <div className="flex flex-col justify-center rounded-small-md items-center gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
                    <IoLocationOutline className="" />
                    <span className="text-sm ">Agadir</span>
                  </div>
                  <div className="flex flex-col justify-center items-center rounded-small-md gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
                    <FaDollarSign className="" />
                    <span className="text-sm ">100 dh</span>
                  </div>
                  <div className="flex flex-col justify-center items-center rounded-small-md gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
                    <FaRegClock className="" />
                    <span className="text-sm ">20 hours</span>
                  </div>
                </div>
        <div className="flex items-center gap-6 justify-center">
          <Button 
            type='secondary'
            onClick={() => setIsDetailModalOpen(true)}
          >
            View Details
          </Button>
          <Button
            type='primary'
            onClick={() => navigate('/reservation')}
            
            >Book Offer
          </Button>
        </div>
      </div>

      {/* Offer Details Modal */}
      <OfferDetail 
        isOpen={isDetailModalOpen}
        closeModal={() => setIsDetailModalOpen(false)}
        offer={fullOfferDetails}
      />

     
    </>
  );
};

export default PurchasedOffers;