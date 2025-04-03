import React from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { FaDollarSign, FaCar, FaArrowRight } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import big_circle from '/images/phone-ellipse.png';
import sm from '/images/howw-1.png';
import intersect from '/images/Intersect.png';
import Button from '../UI/button';
import HowCard from '../cards/howCards';

const Howitwork1 = () => {
  return (
    <div className="min-h-screen pt-[15rem] relative z-10 overflow-x-hidden text-tet">
      {/* Background elements */}
      <div className="pointer-events-none">
        <img src={big_circle} className="absolute top-0 right-0 z-0" alt="" />
        <img src={sm} className="absolute top-[200px] right-[200px] z-0" alt="" />
        <img src={intersect} className="absolute top-[45%] w-full max-w-full left-[-10px] z-0" alt="" />
        <img src={intersect} className="absolute top-[55%] w-full max-w-full left-[-10px] z-0" alt="" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
      <h1 className="text-4xl md:text-5xl text-center font-normal mb-16">
          How It Works ?
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-center font-medium mb-20">
          Want to <span className="text-primary font-bold">Perfect Your Driving?</span> Here's How!
        </h2>

        {/* Card rows - matching Howitwork2's structure */}
        <div className="max-w-5xl mx-auto my-[4rem] flex flex-col justify-center gap-12">
          {/* First row */}
          <div className="flex flex-col justify-center md:flex-row md:justify-center gap-8">
            <HowCard
              icon={<IoSearchSharp className='text-b200' />}
              title="Find Driving Schools"
              description="Browse top-rated driving schools in your area."
            />
            <HowCard
              icon={<FaDollarSign className='text-b200' />}
              title="Compare Offers"
              description="Check prices, training hours & special packages."
            />
          </div>

          {/* Second row */}
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <HowCard
              icon={<MdPayment className='text-b200' />}
              title="Book & Pay Online"
              description="Reserve your spot securely in just a few clicks."
            />
            <HowCard
              icon={<FaCar className='text-b200' />}
              title="Start Your Lessons"
              description="Get behind the wheel & learn from expert instructors."
            />
          </div>
        </div>

        <div className="text-center">
          <Button type='primary' className="inline-flex items-center gap-2">
            Browse Offers <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Howitwork1;