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
  const [isCreatingReservation, setIsCreatingReservation] = useState(false);
  const [temporaryReservation, setTemporaryReservation] = useState({
    offreId: id,
    schoolId: '',
    startDate: '',
    price: 0,
    status: 'pending',
    paymentStatus: 'unpaid'
  });

  useEffect(() => {
    const loadOffer = async () => {
      try {
        const offerData = await fetchOfferById(id);
        setOffer(offerData);
        // Initialize temporary reservation with offer data
        setTemporaryReservation(prev => ({
          ...prev,
          schoolId: offerData.schoolId,
          price: offerData.price
        }));
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load offer");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) loadOffer();
  }, [id]);

  const handleDateSelected = (date) => {
    if (!date) {
      setError("Please select a date");
      return;
    }
  
    const selectedDateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Check if date is in the past
    if (selectedDateObj < today) {
      setError("Please select a future date");
      return;
    }
  
    // Check if date is within offer availability
    if (offer?.startDate && offer?.endDate) {
      const offerStart = new Date(offer.startDate);
      const offerEnd = new Date(offer.endDate);
      
      if (selectedDateObj < offerStart || selectedDateObj > offerEnd) {
        setError(`Please select a date between ${offerStart.toLocaleDateString()} and ${offerEnd.toLocaleDateString()}`);
        return;
      }
    }
  
    setError(null);
    setSelectedDate(date);
    setTemporaryReservation(prev => ({
      ...prev,
      startDate: date
    }));
  };

  const handleConfirmClick = () => {
    if (!selectedDate) {
      setError("Please select a date before confirming");
      return;
    }
    setCurrentStep(2);
  };

  const handleConfirmReservation = async () => {
    if (!temporaryReservation.startDate) {
      setError("Please select a date before confirming");
      return;
    }
  
    setIsCreatingReservation(true);
    setError(null);
  
    try {
      // Ensure all required fields are included
      const reservationData = {
        offreId: temporaryReservation.offreId,
        schoolId: temporaryReservation.schoolId,
        startDate: temporaryReservation.startDate,
        price: temporaryReservation.price,
        status: 'pending',
        paymentStatus: 'unpaid'
      };
  
      console.log("Creating reservation with:", reservationData);
      
      const createdReservation = await createReservation(reservationData);
      setReservation(createdReservation);
      setCurrentStep(3);
    } catch (err) {
      setError(err.message || "Failed to create reservation");
    } finally {
      setIsCreatingReservation(false);
    }
  };

  const handlePaymentComplete = () => {
    navigate("/my-reservations", { 
      state: { 
        success: true,
        message: "Reservation and payment completed successfully!",
        reservation: reservation 
      } 
    });
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="pt-12 flex flex-col min-h-screen">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}
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
          isLoading={isCreatingReservation}
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