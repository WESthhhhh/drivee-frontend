import React, { useState, useEffect } from 'react';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom';

const VerifiedCard = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      const hiddenUntil = localStorage.getItem('verificationCardHiddenUntil');
      
      if (hiddenUntil) {
        const currentTime = new Date().getTime();
        const isStillHidden = currentTime < parseInt(hiddenUntil, 10);
        
        // If time hasn't expired, hide the card
        setIsVisible(!isStillHidden);
      }
    };

    checkVisibility();
    
    // Optional: Check every minute for expiration
    const interval = setInterval(checkVisibility, 60000);
    return () => clearInterval(interval);
  }, []);

  
  const handleLaterClick = () => {
    const hideUntil = new Date().getTime() + 3600000;
    localStorage.setItem('verificationCardHiddenUntil', hideUntil.toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={'text-center rounded-small-md md:rounded-large-md p-[30px_60px] w-full bg-cayan50'}>
      <div className=''>
        <h1 className='mb-6'>Complete your verification to start listing offers!</h1>
        <div className='flex gap-6 justify-center'>
          <Button 
            type='primary'
            onClick={() => navigate('/verification')}
          >
            Verify Now
          </Button>
          <Button 
            type='secondary'
            onClick={handleLaterClick}
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedCard;