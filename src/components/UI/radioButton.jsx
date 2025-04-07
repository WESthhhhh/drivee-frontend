import React  from "react";

const RadioButton = ({ label, checked }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer text-text font-medium">
      <input
        type="radio"
        className={`w-[18px] h-[18px] border-2 border-[#9AD4DB]  ${checked ? 'accent-[#9AD4DB]' : ''} rounded-full`}
      />
      <p className="text-[#1F2937] font-normal">{label}</p>
    </label>
  );
};

export default RadioButton;