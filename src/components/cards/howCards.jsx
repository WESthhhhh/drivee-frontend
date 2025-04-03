import React from 'react';
const Card = ({ icon, title, description, className = '' }) => {
  return (
    <div className={`text-center border border-b50 rounded-small-md md:rounded-large-md p-[30px_60px] w-[350px] md:w-[380px] bg-white relative z-10 ${className}`}>
      <div className="w-[60px] h-[60px] flex justify-center items-center text-primary rounded-[20px] text-[2rem] mx-auto bg-b50">
        {icon}
      </div>
      <h2 className="font-semibold text-[1.4rem] py-[1rem] border-b border-accent text-primary">
        {title}
      </h2>
      <p className="text-text leading-[2] mt-[1.5rem]">
        {description}
      </p>
    </div>
  );
};

export default Card;