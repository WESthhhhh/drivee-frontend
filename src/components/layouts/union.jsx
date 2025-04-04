import React from 'react';
import rect from '/images/Union.svg';

const Union = () => {
  return (
    <div className=" flex justify-center items-center bg-[url('/images/Union.svg')] bg-cover bg-center bg-no-repeat w-full text-center relative px-4 md:px-0 mb-[50px]">
      <div className="content z-10 py-20">
        <h1 className="text-light font-bold text-xl md:text-3xl  mb-6 md:mb-8">What is Drivee ?</h1>
        <p className="text-light font-light leading-7 text-[14px] md:text-[16px] md:leading-8 max-w-[700px] w-full mt-6 md:mt-8 px-4 md:px-0">
          Drivee is a platform that connects drivers with driving schools in Agadir, making it easy to find and book the best offers for extra practice hours. Whether you need a refresher, advanced training, or just more time behind the wheel, Drivee helps you gain real road experience with professional instructors.
        </p>
      </div>
      <img 
        src={rect} 
        alt="" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full w-full z-0" 
      />
    </div>
  );
};

export default Union;