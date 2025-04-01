import React from 'react';
import { offers } from '../../offers';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import big_circle from '/images/phone-ellipse.png';
import sm2 from '/images/home-elli-t.png';
import sm1 from '/images/home-elli-b.png';
import OfferCard from '../cards/offerCards';

const Features = () => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate('/offers');
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-20 text-center relative overflow-hidden">
      {/* Decorative background images */}
      <img src={big_circle} className="absolute -left-32 top-1/4 opacity-30 -z-10" alt="" />
      <img src={sm2} className="absolute left-8 top-1/2 opacity-20 -z-10" alt="" />
      <img src={sm1} className="absolute right-0 top-1/4 opacity-20 -z-10" alt="" />

      {/* Header section */}
      <h1 className="text-3xl font-bold text-text mb-4">
        Check Out Our Featured Offers
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Discover top-rated driving school deals tailored for you. Compare, book,
        and start your journey today!
      </p>

      {/* Offers grid */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
        {offers.slice(0, 2).map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>

      {/* See more button */}
      <button 
        onClick={handleSeeMore}
        className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-blue-50 transition inline-flex items-center gap-2"
      >
        See More Offers <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Features;