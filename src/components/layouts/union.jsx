import React from 'react';
import rect from '/images/Union.png';

const Union = () => {
  return (
    <div className=" flex justify-center items-center bg-[url('../../assets/Union.png')] bg-center bg-no-repeat w-full text-center relative">
      <div className="content z-10">
        <h1 className="text-light text-3xl font-medium mb-8">What is Drivee ?</h1>
        <p className="text-light font-light leading-8 max-w-[700px] w-full mt-8">
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