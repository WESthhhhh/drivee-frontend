import React from 'react';

const Button = ({ 
  children, 
  type = 'primary', // style type: 'primary', 'secondary', etc.
  htmlType = 'button', // actual HTML type: 'button', 'submit', 'reset'
  icon, 
  disabled = false, 
  onClick,
  className: additionalClasses = ''
}) => {
  let className = `text-[12px] px-[15px] py-[9px] md:text-[16px] md:px-[20px] md:py-[10px] rounded-small-md hover:shadow-primary-4 transition-all duration-300 flex items-center justify-center ${additionalClasses}`;

  if (icon && !children) {
    className = `px-[10px] py-[10px] rounded-small-md hover:shadow-primary-4 transition-all duration-300 flex items-center justify-center ${additionalClasses}`;
  }

  if (disabled) {
    className += ` bg-lightgrey text-inputtext cursor-not-allowed`;
  } else {
    switch(type) {
      case 'primary':
        className += ` bg-primary text-light hover:bg-[#09206A]`;
        break;
      case 'secondary':
        className += ` border border-primary text-primary hover:bg-primary/10`;
        break;
      case 'ghost':
        className += ` border-none bg-[#F5FBFB] text-[#09206A] hover:bg-[#ECEEF0]`;
        break;
      default:
        className += ` bg-primary text-light hover:bg-[#09206A]`;
    }
  }

  const iconElement = icon ? (
    <img 
      src={icon}
      alt=""
      className={`w-[18px] h-[18px] ${children ? 'ml-[8px]' : ''}`}
      onError={(e) => {
        console.error('Failed to load icon:', icon);
        e.target.style.display = 'none';
      }}
    />
  ) : null;

  return (
    <button
      type={htmlType}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {iconElement}
    </button>
  );
};

export default Button;

//to call them

// Regular button with action
{/* <Button 
  type="primary" 
  onClick={() => console.log('Button clicked!')}
>
  Click Me
</Button>

// Button with icon and action
<Button
  type="secondary"
  icon="/path/to/icon.png"
  onClick={() => navigate('/offers')}
>
  View Offers
</Button>

// Disabled button
<Button
  type="primary"
  disabled={true}
  onClick={() => {}} // Won't fire when disabled
>
  Can't Click Me
</Button> */}















// import React, { Children } from 'react';

// const Button = ({ Children, type ,icon, disabled }) => {
//   let className = `text-[14px] md:text-[16px] px-[20px] py-[10px] rounded-small-md hover:shadow-primary-4 transition-all duration-300`;

//   if (icon && !Children) {
//     className = `px-[10px] py-[8px]  rounded-small-md hover:shadow-primary-4 transition-all duration-300`;
//   }
//   if (disabled && icon) {
//     className += ` bg-[#D1D5DB] text-inputtext flex flex gap-[8px] bg-[#D1D5DB] text-inputtext `;
//   }if (disabled) {
//     className += ` bg-[#D1D5DB] text-inputtext `;
//   }

//   if (type === "primary" && icon) {
//     className += ` bg-primary text-light hover:bg-[#09206A] flex flex gap-[8px] hover:bg-[#09206A] hover:shadow-primary-4 transition-all duration-300`;
//   } if (type === "primary" ){
//     className += ` bg-primary text-light hover:bg-[#09206A] `
//   }

//   if (type === "secondary" && disabled) {
//     className += `border-[1px] border-grey bg-light  text-grey `;
//   }if (type === "secondary") {
//     className += ` border-[1px] border-primary text-primary`;
//   }

//   if(type === "ghost" && disabled) {
//     className += ` border-none bg-[#ECEEF0] text-inputtext `
//   }if(type === "ghost"){
//     className += ` border-none bg-[#F5FBFB]  text-[#09206A]`;
//   }

//   return (
//     <button className={className}>
//       {Children} <img src={icon} alt="" className='w-[24px]'/>
//     </button>
//   );
// };
// {/* <Button Children="buttom" type="primary"/> */}
// export default Button;