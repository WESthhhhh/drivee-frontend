import React from 'react';
import phone from '/images/Phone.svg';
import big_circle from '/images/phone-ellipse.png';
import sm2 from '/images/home-elli-t.png';
import Button from '../UI/button';

const Work = () => {
  return (
    <div className="min-h-screen max-w-7xl w-[90%] mx-auto flex justify-between items-center overflow-x-hidden xl:min-h-auto">
      {/* Content Section */}
      <div className="max-w-[50%] w-full">
        <h1 className="text-3xl font-bold">How Drivee Works ?</h1>
        <p className="my-6 text-text">
          Learners find and book the best driving schools. Schools list offers and get more students. Simple, fast, and secure!
        </p>
        <Button
        type='primary'
        onClick={() => navigate('/HowItWorks')}
        >
          How It Works
        </Button>
      </div>

      {/* Image Section */}
      <div className="relative">
        <img src={phone} className="relative z-10 w-[450px]" alt="Mobile phone" />
        <img src={big_circle} className="absolute -right-[100px] bottom-[100px] rotate-180" alt="Decorative circle" />
        <img src={sm2} className="absolute top-0 right-[50px]" alt="Small decorative element" />
        <img src={sm2} className="absolute top-1/2 left-[50px]" alt="Small decorative element" />
      </div>
    </div>
  );
};

export default Work;