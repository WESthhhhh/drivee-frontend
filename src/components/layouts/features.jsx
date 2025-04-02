import React from 'react';
import { offers } from '../../offers';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import big_circle from '/images/phone-ellipse.png';
import sm2 from '/images/home-elli-t.png';
import sm1 from '/images/home-elli-b.png';
import OfferCard from '../cards/offerCards';
import Button from '../UI/button';
const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-20 text-center relative overflow-hidden">
    
      <img src={big_circle} className="absolute -left-32 top-1/4 opacity-30 -z-10" alt="" />
      <img src={sm2} className="absolute left-8 top-1/2 opacity-20 -z-10" alt="" />
      <img src={sm1} className="absolute right-0 top-1/4 opacity-20 -z-10" alt="" />

   
      <h1 className="text-3xl font-bold text-text mb-4">
        Check Out Our Featured Offers
      </h1>
      <p className="text-inputtext max-w-2xl mx-auto mb-12">
        Discover top-rated driving school deals tailored for you. Compare, book,
        and start your journey today!
      </p>


      <div className="grid sm:grid-cols-1 justify-center md:flex md:flex-row   gap-8 mb-12">
        {offers.slice(0, 2).map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>


      <Button
      type='secondary'
      onClick={() => navigate('/offers')}
      className='inline-flex items-center gap-2'>See More Offers <FaArrowRightLong />
      </Button>
    </div>
  );
};

export default Features;