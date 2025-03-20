import React, { Children } from 'react';

const Button = ({ Children, type ,icon, disabled }) => {
  let className = `text-[14px] md:text-[16px] px-[20px] py-[5px] rounded-[12px] hover:shadow-lg`;

  if (icon && !Children) {
    className = `px-[10px] py-[8px]  rounded-[12px] hover:shadow-lg`;
  }
  if (disabled && icon) {
    className += ` bg-[#D1D5DB] text-[#7F8286] flex flex gap-[8px] bg-[#D1D5DB] text-[#7F8286] `;
  }if (disabled) {
    className += ` bg-[#D1D5DB] text-[#7F8286] `;
  }

  if (type === "primary" && icon) {
    className += ` bg-[#0B247A] text-[#FDFDFD] hover:bg-[#09206A] flex flex gap-[8px] hover:bg-[#09206A] hover:shadow-lg`;
  } if (type === "primary" ){
    className += ` bg-[#0B247A] text-[#FDFDFD] hover:bg-[#09206A] `
  }

  if (type === "secondary" && disabled) {
    className += `border-[1px] border-[#929599] bg-white  text-[#7F8286] `;
  }if (type === "secondary") {
    className += ` border-[1px] border-[#0B247A] text-[#0B247A]`;
  }

  if(type === "ghost" && disabled) {
    className += ` border-none bg-[#ECEEF0] text-[#7F8286] `
  }if(type === "ghost"){
    className += ` border-none bg-[#F5FBFB]  text-[#09206A]`;
  }

  return (
    <button className={className}>
      {Children} <img src={icon} alt="" className='w-[24px]'/>
    </button>
  );
};

export default Button;