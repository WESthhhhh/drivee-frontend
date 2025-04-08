import React, { useState } from "react";
import UserType from "../../UI/userType";
import Button from "../../UI/button";
import { Link } from "react-router-dom";

const Signup1 = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleUserTypeSelect = (type) => {
    setSelectedType(type);
    // Clear error when user selects an option
    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate selection
    if (!selectedType) {
      setError("Please select a user type");
      return;
    }

    setIsSubmitting(true);
    console.log("Selected user type:", selectedType);
    
    // Here you would typically proceed to the next step or API call
    // For demo, we'll reset after 1 second
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-4xl font-regular mb-8 text-text text-center">
        Welcome to <span className="text-primary font-bold ml-2">Drivee.</span>
      </h1>
      <h3 className="text-text mb-8 text-center">Are You Signing Up as?</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-[19px]">
          <div 
            onClick={() => handleUserTypeSelect("school")} 
            className="w-full md:w-auto"
          >
            <UserType 
              type="school" 
              isSelected={selectedType === "school"}
            />
          </div>
        </div>

        {/* Error message display */}
        {error && (
          <div className="text-error text-sm mt-2 text-center animate-fadeIn">
            {error}
          </div>
        )}

        <Button 
          type="primary" 
          htmlType="submit" 
          className="w-full mt-2"
        >
          Next
        </Button>

        <div className="text-center mt-2">
          <Link to="/login" className="text-primary text-sm flex justify-center items-center">
            Already Have an Account? <span className="font-bold ml-1">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup1;