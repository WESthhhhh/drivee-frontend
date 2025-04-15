import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/button';
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex justify-center items-center text-center pb-20 mb-[50px] xl:pt-12 lg:pt-12 ">
      {/* Background elements */}
      <img 
        src="/images/home-ellipse.png" 
        className="absolute top-0 right-0 w-auto h-auto" 
        alt="background circle" 
      />
      <img 
        src="/images/home-ellipse.png" 
        className="absolute top-1/5 left-0 transform rotate-180 w-auto h-auto" 
        alt="background circle" 
      />
      <img 
        src="/images/home-elli-t.png" 
        className="absolute left-[13%] top-1/5 w-auto h-auto" 
        alt="small decorative element" 
      />
      <img 
        src="/images/home-elli-b.png" 
        className="absolute right-[2%] top-1/2 w-auto h-auto" 
        alt="small decorative element" 
      /> 
      
      <div className="relative z-10 w-full px-4 xl:px-40 lg:px-16 md:px-8 sm:px-4 space-y-[30px]">
        <span className="text-inputtext tracking-[10px] font-semibold relative z-10">
          Find. Book. Drive.
        </span>
        
        <h1 className="my-4 text-4xl font-medium relative z-10 sm:text-3xl">
          Refine Your Skills with <span className="text-primary font-bold relative z-10">Drivee.</span> <br />
          <b className="font-bold">More Driving,</b> No Theory!
        </h1>
        
        <p className="max-w-[1100px] w-full leading-8 text-lg relative z-10 sm:text-base sm:leading-7">
          Already have your driving permit? <span className="text-primary font-bold relative z-10">Drivee</span> helps you find the best <span className="text-primary font-bold relative z-10">offers</span> for extra training hours in <span className="text-primary font-bold relative z-10">Agadir</span>, so you can refine your driving skills and gain real road experience with professional instructors
        </p>
        
        <div className="mt-8 flex gap-4 justify-center relative z-10">
          <Button
            type="primary"
            onClick={() => navigate('/offers')}
          >
            Browse Offers
          </Button>
          <Button
            type="secondary"
            onClick={() => navigate('/offers')}
          >
            List Your Offers
          </Button>
        </div>
        
        <div className="mt-24 flex flex-col justify-center items-center gap-6 relative z-10 md:flex-row">
          <img 
            src="/images/home-1.png" 
            className="w-full md:w-[430px] hidden md:block" 
            alt="driving illustration" 
          />
          <img 
            src="/images/home-2.png" 
            className="w-full md:w-[430px]" 
            alt="driving illustration" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;