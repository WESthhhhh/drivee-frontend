import { FaRegClock, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import React from 'react';
import Button from '../UI/button';
const OfferDetail = ({ isOpen, closeModal, offer }) => {
  if (!isOpen || !offer) return null;

  return (
    <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-8">
      <div className="bg-light rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute right-4 top-4 w-8 h-8 flex justify-center items-center bg-b50 rounded-lg text-b500 text-xl z-10"
        >
          <IoMdClose />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {/* Header */}
          <h1 className="text-b200 font-semibold text-2xl text-center pt-8">Offer Details</h1>

          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-8">
            <div className="flex items-center gap-4">
              <img 
                src={offer.img} 
                alt={offer.person} 
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="text-b500 text-lg font-medium">{offer.person}</h2>
                <span className="inline-block px-3 py-1 bg-blue-50 text-b500 text-sm font-semibold rounded-md">
                  {offer.title}
                </span>
              </div>
            </div>
            <Button type='ghost'> View Profile</Button>
          </div>

          {/* Offer Details */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-b500 font-semibold text-xl">{offer.name}</h2>
              <div className="flex justify-center items-center gap-2 mt-2">
                <div className="flex">
                  {offer.stars.map((star) => (
                    <star.icon key={star.id} className="text-b500 text-xl" />
                  ))}
                </div>
                <span className="text-inputtext">({offer.reviews})</span>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-b border-blue-50">
              <div className="text-center p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaRegClock className="text-b500 text-xl" />
                  <span className="text-b500 font-semibold">Duration</span>
                </div>
                <p>{offer.duration}</p>
              </div>

              <div className="text-center p-4 border-t md:border-t-0 md:border-l border-blue-50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaDollarSign className="text-b500 text-xl" />
                  <span className="text-b500 font-semibold">Price</span>
                </div>
                <p>{offer.price}</p>
              </div>

              <div className="text-center p-4 border-t md:border-t-0 md:border-l border-blue-50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaRegClock className="text-b500 text-xl" />
                  <span className="text-b500 font-semibold">Expiration</span>
                </div>
                <p className="text-gray-500">{offer.expiration}</p>
              </div>
            </div>

            {/* Location */}
            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 text-b500 font-semibold">
                <FaMapMarkerAlt /> Location
              </h3>
              <p className="mt-2">123 Avenue Hassan II, Casablanca, Morocco</p>
              <a 
                href="https://maps.app.goo.gl/pAifJyL7AmAS8j5J8" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-4"
              >
                <img 
                  src={offer.graph} 
                  alt="Location map" 
                  className="max-w-full h-auto rounded-lg border border-gray-200"
                />
              </a>
            </div>

            {/* Action Button */}
            <button className="w-full py-3 bg-b500 text-light font-medium rounded-lg mt-6 hover:bg-blue-800 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;