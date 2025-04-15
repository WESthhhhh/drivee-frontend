import React, { useState } from 'react';

import ProgressBar from '../components/UI/ProgressBar';
import ReservationStep from '../components/layouts/ReservationStep';
import ReservationConfirmation from '../components/layouts/ReservationConfirmation';
import PaymentForm from '../components/layouts/PaymentForm';

function ReservationToPayement() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');

  const reservationDetails = {
    schoolName: "Excellence Driving School",
    offer: "20 Hour Offer",
    startDate: selectedDate,
    price: "5000",
    location: "123 Avenue Hassan II, Casablanca, Morocco"
  };

  const handleStepChange = (step) => {
    // Only allow going back to previous steps or proceeding if date is selected
    if (step < currentStep || (step === 2 && selectedDate)) {
      setCurrentStep(step);
    }
  };

  const handleConfirmReservation = () => {
    if (selectedDate) {
      setCurrentStep(2);
    }
  };

  const handleProceedToPayment = () => {
    setCurrentStep(3);
  };

  const handlePaymentComplete = () => {
    setCurrentStep(1);
    setSelectedDate('');
  };

  return (
    <div className="pt-12  flex flex-col z-[9999999999999] ">
      
      <main className="flex-grow">
        <ProgressBar 
          currentStep={currentStep} 
          onStepClick={handleStepChange}
          canProceed={!!selectedDate}
        />
        
        {currentStep === 1 && (
          <ReservationStep 
            onConfirm={handleConfirmReservation}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        )}
        
        {currentStep === 2 && (
          <ReservationConfirmation 
            {...reservationDetails} 
            onProceed={handleProceedToPayment}
          />
        )}
        
        {currentStep === 3 && (
          <PaymentForm 
            schoolName={reservationDetails.schoolName}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </main>
     
    </div>
  );
}

export default ReservationToPayement;