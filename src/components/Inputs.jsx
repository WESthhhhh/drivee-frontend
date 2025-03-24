import React from "react";

const FormInput = ({ label, placeholder, type = "text", icon = null }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-blue-900">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img src={`./assets/${icon}.png`} alt={icon} className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

const FileInput = ({ label, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-blue-900">{label}</label>
      <div className="relative">
        <div className="flex">
          <div className="flex-grow">
            <div className="flex items-center border border-gray-300 rounded-md p-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {placeholder}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TextArea = ({ label, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-blue-900">{label}</label>
      <textarea 
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

const Inputs = () => {
  return (
    <div className="max-w-md mx-auto p-6 border border-purple-500 border-dashed rounded-lg">
      <FormInput label="Label" placeholder="Placeholder" />
      <FormInput label="Label" placeholder="Placeholder" />
      <FormInput label="Label" placeholder="Placeholder" />
      <FormInput label="Label" placeholder="Placeholder" />
      <TextArea label="Label" placeholder="Placeholder" />
    </div>
  );
};

export default Inputs;