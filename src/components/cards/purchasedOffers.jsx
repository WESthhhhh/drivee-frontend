import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Button from '../UI/button';
import AddReviewModal from '../modals/addReview';
import OfferDetail from '../modals/offerDetail';

// Default offer data to prevent undefined errors
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
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
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

  const handleReviewCreated = (newReview) => {
    console.log('New review created:', newReview);
    setIsReviewModalOpen(false);
  };

  return (
    <>
      <div className="border border-stroke rounded-large-md p-6 space-y-6">
        <div className="space-y-3">
          <div className="text-text text-xl font-semibold">{fullOfferDetails.title}</div>
          <div className="text-inputtext">{fullOfferDetails.description}</div>
          {fullOfferDetails.rating > 0 && (
            <div className="flex items-center gap-1">
              {Array(Math.floor(fullOfferDetails.rating)).fill(0).map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm" />
              ))}
              <span className="text-xs text-gray-500">
                ({fullOfferDetails.reviews || 0} reviews)
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          <Button 
            type='secondary'
            onClick={() => setIsDetailModalOpen(true)}
          >
            View Details
          </Button>
          <Button 
            type='ghost'
            onClick={() => {
              setSelectedOfferId(fullOfferDetails.id);
              setIsReviewModalOpen(true);
            }}
          >
            Add Review
          </Button>
        </div>
      </div>

      {/* Offer Details Modal */}
      <OfferDetail 
        isOpen={isDetailModalOpen}
        closeModal={() => setIsDetailModalOpen(false)}
        offer={fullOfferDetails}
      />

      {/* Review Modal */}
      <AddReviewModal 
        isOpen={isReviewModalOpen} 
        closeModal={() => setIsReviewModalOpen(false)}
        onReviewCreated={handleReviewCreated}
        offerId={selectedOfferId}
      />
    </>
  );
};

export default PurchasedOffers;