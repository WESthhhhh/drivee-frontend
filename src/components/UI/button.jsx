import React from 'react';

const Button = ({ 
  children, 
  type = 'primary', 
  icon, 
  disabled = false, 
  onClick,
  className: additionalClasses = ''
}) => {
  // Base classes
  let className = `text-[12px] px-[15px] py-[9px] md:text-[16px] md:px-[20px] md:py-[10px] rounded-small-md hover:shadow-primary-4 transition-all duration-300 flex items-center justify-center ${additionalClasses}`;

  // Icon-only buttons
  if (icon && !children) {
    className = `px-[10px] py-[10px] rounded-small-md hover:shadow-primary-4 transition-all duration-300 flex items-center justify-center ${additionalClasses}`;
  }

  // Disabled state
  if (disabled) {
    className += ` bg-lightgrey text-[#7F8286] cursor-not-allowed`;
  } else {
    // Button types when not disabled
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

  // Handle icon with conditional spacing
  const iconElement = icon ? (
    <img 
      src={icon}
      alt=""
      className={`w-[18px] h-[18px] ${children ? 'ml-[8px]' : ''}`} // Adds margin-left only when there's text
      onError={(e) => {
        console.error('Failed to load icon:', icon);
        e.target.style.display = 'none';
      }}
    />
  ) : null;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {/* Reverse order to put icon after text */}
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
//     className += ` bg-[#D1D5DB] text-[#7F8286] flex flex gap-[8px] bg-[#D1D5DB] text-[#7F8286] `;
//   }if (disabled) {
//     className += ` bg-[#D1D5DB] text-[#7F8286] `;
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
//     className += ` border-none bg-[#ECEEF0] text-[#7F8286] `
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