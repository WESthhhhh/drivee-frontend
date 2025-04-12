import React from "react";

const RadioButton = ({ label, checked, onChange, name, value }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer text-text font-medium">
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange} 
          className="absolute opacity-0 w-4 h-4 cursor-pointer"
        />
        <div className={`w-5 h-5 rounded-full border-2 ${checked ? 'border-accent' : 'border-accent'} flex items-center justify-center`}>
          {checked && <div className="w-3 h-3 rounded-full bg-accent"></div>}
        </div>
      </div>
      <p className="text-text ">{label}</p>
    </label>
  );
};

export default RadioButton;