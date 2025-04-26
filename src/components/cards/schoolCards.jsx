import React from 'react';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom';

const SchoolCard = ({ school }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-light rounded-large-md border border-b50 overflow-hidden shadow-primary-4 w-full h-full flex flex-col">
      <div className="h-[100px] w-full overflow-hidden">
        <img 
          src="/images/cover.svg" 
          alt={school.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 text-center flex-grow flex flex-col items-center">
      <div 
        className="w-16 h-16 rounded-full border-2 border-light -mt-12 bg-light flex items-center justify-center text-b200 text-2xl "
        style={{
          backgroundColor: "#DCEFFE" // Directly use the hex code
          // OR hsl(207, 95%, 93%) if you prefer HSL
        }}
      >
        {school.name.charAt(0).toUpperCase()}
      </div>
        
        <h2 className="text-primary text-xl font-semibold mt-3">{school.name}</h2>
        
        <span className="inline-block bg-cayan50 text-primary text-sm font-semibold px-2 py-1 rounded-md my-2">
          pro
        </span>
        
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