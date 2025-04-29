// PurchasedOffers.jsx
import React, { useState, useEffect } from 'react';
import { fetchOfferById } from '../../services/offersApi';

const PurchasedOffers = ({ offerId }) => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const loadOffer = async () => {
      try {
        setLoading(true);
        const offerData = await fetchOfferById(offerId);
        setOffer(offerData);
      } catch (err) {
        console.error('Failed to load offer:', err);
        setError(err.message || 'Failed to load offer details');
      } finally {
        setLoading(false);
      }
    };

    if (offerId) {
      loadOffer();
    }
  }, [offerId]);

  if (loading) return <div>Loading offer details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!offer) return <div>No offer data available</div>;

  return (
    <>
      <div className="border border-stroke rounded-large-md p-6 space-y-6">
        <div className="space-y-3">
          <div className="text-text text-xl font-semibold">{offer.title}</div>
          <div className="text-inputtext">{offer.description}</div>
        </div>
        
        <div className="flex justify-center gap-[40px] mb-6 text-primary">
          <div className="flex flex-col justify-center rounded-small-md items-center gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <IoLocationOutline />
            <span className="text-sm">{offer.city}</span>
          </div>
          <div className="flex flex-col justify-center items-center rounded-small-md gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <FaDollarSign />
            <span className="text-sm">{offer.price} dh</span>
          </div>
          <div className="flex flex-col justify-center items-center rounded-small-md gap-2 py-2 text-b200 bg-cayan50 w-[90px]">
            <FaRegClock />
            <span className="text-sm">{offer.durationHours} hours</span>
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
          >
            Book Offer
          </Button>
        </div>
      </div>

      <OfferDetail 
        isOpen={isDetailModalOpen}
        closeModal={() => setIsDetailModalOpen(false)}
        offer={offer}
      />
    </>
  );
};

export default PurchasedOffers;