import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop';
const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4   font-poppins">
      <ScrollToTop />
      <img 
        src="/images/home-ellipse.png" 
        className="absolute top-0 right-0 w-auto h-auto z-[-1]" 
        alt="background circle" 
      />
      {/* <img 
        src="/images/home-ellipse.png" 
        className="absolute top-1/5 left-0 transform rotate-180 w-auto h-auto" 
        alt="background circle" 
      /> */}
      <div className="flex flex-col justify-center md:flex-row items-center gap-8 ">
        <div className="hidden md:block md:w-1/2 py-8">
          <img 
            src="/images/loginpic.svg" 
            alt="Authentication illustration" 
            className="w-full max-h-[850px] object-contain" 
          />
        </div>
        <div className="md:hidden mb-8 w-full items-center  flex justify-center">
          <img 
            src="/images/loginpicsm.svg" 
            alt="Authentication illustration" 
            className="w-full" 
          />
        </div>
        <div className="w-full md:w-1/2">
          <Outlet className="relative z-10"/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;