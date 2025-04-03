import React from 'react';
import { FaHome, FaCalendar, FaArrowRight } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { PiUsersThreeFill } from "react-icons/pi";
import big_circle from '/images/phone-ellipse.png';
import sm from '/images/howw-1.png';
import intersect from '/images/Intersect.png';
import Button from '../UI/button';
import HowCard from '../cards/howCards';

const Howitwork2 = () => {
  return (
    <div className="min-h-screen mt-10 relative z-10 overflow-x-hidden text-tet">
      {/* Background elements */}
      <div className="pointer-events-none">
        <img src={big_circle} className="absolute top-0 right-0 z-0" alt="" />
        <img src={sm} className="absolute top-[200px] right-[200px] z-0" alt="" />
        <img src={intersect} className="absolute top-[45%] w-full max-w-full left-[-10px] z-0" alt="" />
        <img src={intersect} className="absolute top-[55%] w-full max-w-full left-[-10px] z-0" alt="" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        
        <h2 className="text-2xl md:text-3xl text-center font-medium mb-20">
          Want to <span className="text-primary">Showcase Your Offers?</span> Here's How!
        </h2>

        {/* Card rows - updated centering */}
        <div className="max-w-5xl mx-auto my-[4rem] flex flex-col items-center gap-12">
          {/* First row - centered on mobile */}
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 w-full">
            <HowCard
              icon={<FaHome className='text-b200' />}
              title="Create Your Profile"
              description="Sign up and showcase your driving school."
            />
            <HowCard
              icon={<IoIosDocument className='text-b200' />}
              title="Add Your Offers"
              description="List your training programs, prices, and available hours."
            />
          </div>

          {/* Second row - centered on mobile */}
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 w-full">
            <HowCard
              icon={<FaCalendar className='text-b200' />}
              title="Get Bookings"
              description="Learners browse and book directly from your offers."
            />
            <HowCard
              icon={<PiUsersThreeFill className='text-b200' />}
              title="Grow Your Business"
              description="Attract more learners and increase your bookings."
            />
          </div>
        </div>

        <div className="text-center">
          <Button type='primary' className="inline-flex items-center gap-2">
            List Your Offers <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Howitwork2;