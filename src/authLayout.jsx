import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="flex flex-col justify-center md:flex-row items-center gap-10 ">
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
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;