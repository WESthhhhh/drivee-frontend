import React from 'react';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom';
const VerifiedCard = () => {
    const navigate = useNavigate();
  return (
    <div className={'text-center   rounded-small-md md:rounded-large-md p-[30px_60px] w-full bg-cayan50 '}>
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
                >
                   Later
                </Button>

            </div>
        </div>
    </div>
  );
};

export default VerifiedCard;