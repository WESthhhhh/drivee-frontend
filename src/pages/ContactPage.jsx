import React from 'react';
import Getintouch from '../components/layouts/getInTouch';
import Contactform from '../components/layouts/contactForm';
import big_circle from '/images/phone-ellipse.png';
import sm from '/images/contact-sm.png';

const Contact = () => {
  return (
    <>
      <div className="relative z-10 mx-auto w-full max-w-[1200px] overflow-x-hidden pt-[15rem] pb-[17rem] flex items-start justify-between">
        <Getintouch />
        <Contactform />
        <img src={big_circle} className="absolute top-0 right-[-90px]" alt="" />
        <img src={sm} className="absolute top-[170px] right-[150px]" alt="" />
        <img src={big_circle} className="absolute bottom-0 left-[-90px]" alt="" />
        <img src={sm} className="absolute bottom-[170px] left-[150px]" alt="" />
      </div>
    </>
  );
};

export default Contact;