import React from 'react';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom';

const SchoolCard = ({ school }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-light rounded-[20px] overflow-hidden shadow-primary-4 w-full h-full flex flex-col">
      <div className="h-[100px] w-full overflow-hidden">
        <img 
          src={school.bgimg} 
          alt={school.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/fallback-bg.jpg'; 
            console.error('Failed to load cover image:', school.bgimg);
          }}
        />
      </div>
      
      <div className="p-4 text-center flex-grow flex flex-col items-center">

        <img 
          src={school.img} 
          alt={school.name} 
          className="w-16 h-16 rounded-full object-cover border-4 border-light -mt-12 bg-light"
          onError={(e) => {
            e.target.src = '/images/fallback-logo.png';
            console.error('Failed to load logo:', school.img);
          }}
        />
        
        {/* School Name */}
        <h2 className="text-primary text-xl font-semibold mt-3">{school.name}</h2>
        
        {/* Location */}
        <span className="inline-block bg-cayan50 text-primary text-sm font-semibold px-2 py-1 rounded-md my-2">
          {school.location}
        </span>
        
        {/* Rating */}
        <div className="flex items-center justify-center gap-4 my-3">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{school.rating}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {school.description}
        </p>
        
        {/* View Button */}
        <Button
          type='primary'
          onClick={() => navigate(`/schools/${school.id}`)}
        >
          View School
        </Button>
      </div>
    </div>
  );
};

export default SchoolCard;