import { FaRegClock, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { IoCalendarClearOutline } from "react-icons/io5";
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
        <div className="bg-light rounded-xl max-w-md w-full p-6 text-center">
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
    
    <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
      <div className="bg-light rounded-large-md max-w-lg w-full max-h-[90vh] flex flex-col relative">
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute right-4 top-4 w-8 h-8 flex justify-center items-center bg-b50 hover:bg-blue-100 rounded-small-sm text-b500 font-bold text-xl z-10 transition-colors"
        >
          <IoMdClose />
        </button>

        {/* Modal Content - Scrollable area */}
        <div className="p-5 flex-1 overflow-y-auto">
          {/* Header */}
          <h1 className="text-b200 font-bold text-xl text-center pt-4 pb-8">Offer Details</h1>
          
          {/* Profile Section */}
          <div className="flex justify-between items-center gap-3 mt-3 mb-2 p-2 rounded-lg">
            <div className="flex items-center gap-3">
              <img 
                src={school?.profileImage || img} 
                alt={schoolName} 
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/default-avatar.png';
                }}
              />
              <div>
                <h2 className="text-b500 text-sm font-medium">{schoolName}</h2>
                <span className="inline-block px-2 py-0.5 bg-blue-100 text-b500 text-xs font-semibold rounded">
                  Pro
                </span>
              </div>
            </div>
            <Button type='ghost' className="text-xs px-2 py-1">View Profile</Button>
          </div>
          
          {/* Course Title and Description */}
          <div className="text-center mb-10">
            <h2 className="text-b500 font-semibold text-base">{title}</h2>
            <div className="flex justify-center items-center gap-2 mt-1">
              <div className="flex">
                {stars.length > 0 ? (
                  stars.map((star) => (
                    <star.icon key={star.id} className="text-b500 text-sm" />
                  ))
                ) : (
                  <span className="text-inputtext text-xs my-1">No ratings</span>
                )}
              </div>
              {reviews > 0 && (
                <span className="text-inputtext text-xs">({reviews})</span>
              )}
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 mx-auto max-w-xs">{description}</p>
          </div>

          {/* Info Cards - Horizontal layout with 4 cards including location */}
          <div className="grid grid-cols-4 gap-1 my-2 border-t border-b border-blue-50 py-2 mb-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <FaRegClock className="text-b500 text-xs" />
                <span className="text-b500 font-semibold text-xs">Duration</span>
              </div>
              <p className="text-xs text-inputtext">{durationHours} hours</p>
            </div>

            <div className="text-center border-l border-blue-50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <FaDollarSign className="text-b500 text-xs" />
                <span className="text-b500 font-semibold text-xs">Price</span>
              </div>
              <p className="text-xs text-inputtext">{price} dh</p>
            </div>

            <div className="text-center border-l border-blue-50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <IoCalendarClearOutline className="text-b500 text-xs" />
                <span className="text-b500 font-semibold text-xs">Expires</span>
              </div>
              <p className="text-xs text-inputtext">
                {new Date(endDate).toLocaleDateString()}
              </p>
            </div>
            
            <div className="text-center border-l border-stroke">
              <div className="flex items-center justify-center gap-1 mb-1">
                <FaMapMarkerAlt className="text-b500 text-xs" />
                <span className="text-b500 font-semibold text-xs">Location</span>
              </div>
              {/* <p className="text-xs text-inputtext">{location || 'Agadir, Morocco'}</p> */}
              <p className="text-xs text-inputtext">Agadir</p>
            </div>
          </div>

          {/* Map container */}
          <div className="mb-10">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location || 'Agadir Morocco')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative">
                <img 
                  src={graph} 
                  alt="Location map" 
                  className="w-full h-44 object-cover rounded-lg border border-blue-100"
                  onError={(e) => {
                    e.target.src = '/images/map.svg';
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-cayan50 px-2 py-1 text-xs rounded shadow-sm text-b500 font-medium">
                  Open in Google Maps
                </div>
              </div>
            </a>
          </div>
        </div>
        
        {/* Button fixed at bottom */}
        <div className="p-5 pt-2 border-t border-blue-50">
          <Button
            type='primary'
            onClick={() => navigate('/reservation', { state: { offer } })}
            className='w-full py-2 text-sm'>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;