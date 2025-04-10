import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/button';
import UserType from '../../UI/userType';

const UserTypeSelection = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserTypeSelect = (type) => {
    setSelectedType(type);
    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedType) {
      setError("Please select a user type");
      return;
    }
    
    navigate(`/signup/${selectedType}`, {
      state: { 
        role: selectedType === "school" ? "SCHOOL" : "STUDENT" 
      }
    });
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto md:ml-30 xl:ml-30">
      <h1 className="text-4xl font-regular mb-8 text-center">
        Welcome to <span className="text-primary font-bold">Drivee</span>
      </h1>
      <h3 className="text-text mb-8 text-center">Are you signing up as?</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-center">
          <UserType 
            selectedType={selectedType}
            onSelect={handleUserTypeSelect} 
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button 
          type="primary" 
          htmlType="submit" 
          className="w-full mt-4"
          loading={isLoading}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default UserTypeSelection;