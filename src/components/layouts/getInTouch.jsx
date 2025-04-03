import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Getintouch = () => {
  return (
    <div className="max-w-[45%] w-full md:max-w-full">
      <h1 className="text-[2.5rem] font-normal relative z-10">
        Get In Touch
      </h1>
      
      <p className="leading-[2] relative z-10 my-[1.4rem]">
        Have Any <span className="text-primary font-semibold">Questions or need Help?</span> Fill Out The Form Below, And We'll Get Back To You As Soon As Possible.
      </p>

      <div className="flex items-center gap-[2.5rem] md:flex-col md:gap-0">
        <div className="flex items-center gap-4 text-primary">
          <FaPhoneAlt />
          <p>+212 645789765</p>
        </div>
        
        <div className="flex items-center gap-4 text-primary">
          <IoMail />
          <p>Drivee.it@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Getintouch;