import React, { useState } from "react";
import UserType from "../../UI/userType";
import Button from "../../UI/button";
import { Link } from "react-router-dom";

const Signup1 = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate selection
    if (!selectedType) {
      alert("Please select a user type");
      setIsSubmitting(false);
      return;
    }

    console.log("Selected user type:", selectedType);
  };

  return (
    <div className="">
      <h1 className="text-3xl md:text-4xl font-regular mb-8 text-text flex justify-center">
        Welcome to <span className="text-primary font-bold ml-2">Drivee.</span>
      </h1>
      <h3 className="text-text mb-8 flex justify-center">Are You Signing Up as?</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-[19px]">
          <div onClick={() => handleUserTypeSelect("school")} className="w-full md:w-auto">
            <UserType 
              type="school" 
              isSelected={selectedType === "school"}
            />
          </div>
        </div>

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