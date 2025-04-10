import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Getintouch = () => {
  return (
    <div className="text-center md:max-w-[50%] md:text-left ">
      <h1 className="text-4xl  relative z-10">
        Get In Touch
      </h1>
      
      <p className="leading-[2] relative z-10 my-[1.4rem]">
        Have Any <span className="text-b200 font-semibold">Questions or need Help?</span> Fill Out The Form Below, And We'll Get Back To You As Soon As Possible.
      </p>

      <div className=" items-center text-center  flex flex-col justify-center md:gap-8 md:flex-row ">
        <div className="flex items-center pb-4  md:pb-0 gap-4 text-primary md:">
          <FaPhoneAlt />
          <p>+212 645789765</p>
        </div>
        
        <div className="flex  items-center  gap-4 text-primary">
          <IoMail />
          <Link ><p>Drivee.it@gmail.com</p></Link>
        </div>
      </div>
    </div>
  );
};

export default Getintouch;