import { FaRegClock, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import React from 'react';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom';

const OfferDetail = ({ isOpen, closeModal, offer }) => {
  const navigate = useNavigate();

  // Early return if modal shouldn't be open
  if (!isOpen) return null;

  // Safely handle missing offer data
  if (!offer) {
    return (
      <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-8">
        <div className="bg-light rounded-xl max-w-3xl w-full p-6 text-center">
          <h2 className="text-b200 font-semibold text-2xl">Offer Not Found</h2>
          <p className="my-4">The offer details could not be loaded.</p>
          <Button onClick={closeModal}>Close</Button>
        </div>
      </div>
    );
  }

  // Safely destructure with defaults
  const {
    img = '',
    title = 'Driving Course',
    description = 'No description available',
    location = 'Location not specified',
    price = '0',
    durationHours = '0',
    startDate = new Date().toISOString(),
    endDate = new Date().toISOString(),
    school = {}, // Ensure school is always an object
    stars = [],
    reviews = 0,
    graph = '/images/map.svg'
  } = offer;

  const schoolName = school?.firstName 
  ? `${school.firstName} ${school.lastName || ''}` 
  : 'Unknown School';
  
    console.log('Offer data:', offer);
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
                src={school?.profileImage || img} 
                alt={schoolName} 
                className="w-14 h-14 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/default-avatar.png';
                }}
              />
              <div>
                <h2 className="text-b500 text-lg font-medium">{schoolName}</h2>
                <span className="inline-block px-3 py-1 bg-blue-50 text-b500 text-sm font-semibold rounded-md">
                  Pro
                </span>
              </div>
            </div>
            <Button type='ghost'>View Profile</Button>
          </div>

          {/* Offer Details */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-b500 font-semibold text-xl">{title}</h2>
              <p>{description}</p>
              <div className="flex justify-center items-center gap-2 mt-2">
                <div className="flex">
                  {stars.length > 0 ? (
                    stars.map((star) => (
                      <star.icon key={star.id} className="text-b500 text-xl" />
                    ))
                  ) : (
                    <span className="text-inputtext">No ratings</span>
                  )}
                </div>
                {reviews > 0 && (
                  <span className="text-inputtext">({reviews})</span>
                )}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-b border-blue-50">
              <div className="text-center p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaRegClock className="text-b500 text-xl" />
                  <span className="text-b500 font-semibold">Duration</span>
                </div>
                <p>{durationHours} hours</p>
              </div>

              <div className="text-center p-4 border-t md:border-t-0 md:border-l border-blue-50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaDollarSign className="text-b500 text-xl" />
                  <span className="text-b500 font-semibold">Price</span>
                </div>
                <p>{price} dh</p>
              </div>

              <div className="text-center p-4 border-t md:border-t-0 md:border-l border-blue-50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaRegClock className="text-b500 text-xl" />
                  <span className="text-b500 font-semibold">Expiration</span>
                </div>
                <p className="text-gray-500">
                  {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                </p>

              </div>
            </div>

            {/* Location */}
            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 text-b500 font-semibold">
                <FaMapMarkerAlt /> Location
              </h3>
              {/* <p className="mt-2">{location || 'Agadir, Morocco'}</p> */}
              <p className="mt-2">Agadir, Morocco</p>
              <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location || 'Agadir Morocco')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4"
              >
                <img 
                  src={graph} 
                  alt="Location map" 
                  className="w-[500px] h-[500px] rounded-lg border "
                  onError={(e) => {
                    e.target.src = '/images/map.svg';
                  }}
                />
                {/* <span className='text-right items-end justify-end'>View in maps</span> */}
              </a>
            </div>

            <Button
              type='primary'
              onClick={() => navigate('/reservation', { state: { offer } })}
              className='w-full'>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;