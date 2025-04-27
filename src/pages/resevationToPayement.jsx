import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/UI/ProgressBar';
import ReservationStep from '../components/layouts/ReservationStep';
import { fetchOfferById } from "../services/offersApi";
import {createReservation} from "../services/reservationApi"
import ReservationConfirmation from '../components/layouts/ReservationConfirmation';
import PaymentForm from '../components/layouts/PaymentForm';

function ReservationToPayement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [temporaryReservation, setTemporaryReservation] = useState(null);

  useEffect(() => {
    if (id) {
      const loadOffer = async () => {
        try {
          const offerData = await fetchOfferById(id);
          setOffer(offerData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadOffer();
    }
  }, [id]);

  const handleDateSelected = (date) => {
    setSelectedDate(date);
    setTemporaryReservation({
      offreId: offer.id,
      schoolId: offer.schoolId,
      startDate: date,
      price: offer.price,
      status: 'pending'
    });
    // Removed the automatic step change here
  };

  const handleConfirmClick = () => {
    if (selectedDate) {
      setCurrentStep(2); // Only move to confirmation step when confirm is clicked
    }
  };

  const handleConfirmReservation = async () => {
    if (!temporaryReservation) {
      setError("Reservation data is missing");
      return;
    }
    
    try {
      const createdReservation = await createReservation(temporaryReservation);
      setReservation(createdReservation);
      setCurrentStep(3); // Move to payment step
    } catch (err) {
      setError(err.message);
      setCurrentStep(1); // Go back to date selection if error
    }
  };

  const handlePaymentComplete = () => {
    navigate("/my-reservations", { 
      state: { 
        success: true,
        reservation: reservation 
      } 
    });
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="pt-12 flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4">
        <ProgressBar 
          currentStep={currentStep} 
          steps={['Select Date', 'Confirmation', 'Payment']}
          onStepClick={(step) => {
            if (step < currentStep) setCurrentStep(step);
          }}
        />
        
        {currentStep === 1 && (
          <ReservationStep 
            offer={offer}
            onDateChange={handleDateSelected}
            selectedDate={selectedDate}
            onConfirm={handleConfirmClick} // Changed to use the new handler
          />
        )}
        
        {currentStep === 2 && (
          <ReservationConfirmation 
            temporaryReservation={temporaryReservation}
            offer={offer}
            onConfirm={handleConfirmReservation}
            onBack={() => setCurrentStep(1)}
          />
        )}
        
        {currentStep === 3 && reservation && (
          <PaymentForm 
            reservation={reservation}
            offer={offer}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </main>
    </div>
  );
}

export default ReservationToPayement;