
import React from "react";
import Button from "../UI/button";
import { useNavigate } from 'react-router-dom'; 

const Journey = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full max-w-[1100px] mx-auto my-12 py-12 px-4 md:px-12 lg:px-[50px] text-center bg-[#f5fbfb]">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-primary">
        Start Your Journey with Drivee Today!
      </h1>
      <p className="my-8 mx-2 md:mx-8 text-text leading-8">
        Whether you're a learner looking for the best deals or a driving school looking for more students—Drivee is your go-to platform!
      </p>
      <div className="flex flex-row gap-4 justify-center">
      <Button
        type='primary'
        onClick={() => navigate('/offers')}
        className='mb-10 md:mb-0'
        >
          Browse Offers
        </Button>
        <Button
        type='secondary'
        onClick={() => navigate('/list')}
        className='mb-10 md:mb-0'
        >
          List Your Offers
        </Button>
      </div>
    </div>
  );
};

export default Journey;