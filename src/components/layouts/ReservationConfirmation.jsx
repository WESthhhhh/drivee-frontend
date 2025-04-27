"use client"
import Button from "../UI/button";
const ReservationConfirmation = ({ 
  temporaryReservation,
  offer,
  onConfirm,
  onBack
}) => {
  if (!temporaryReservation || !offer) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Reservation Data Missing</h2>
        <p>Please start the reservation process again.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[602px] min-h-[400px] md:h-[546px] mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-light border border-stroke rounded-large-md shadow-primary-4 flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-10 text-b200">Confirm Reservation</h2>

      <div className="space-y-6 sm:space-y-10 flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-b200 font-bold mb-1 sm:mb-0 sm:mr-2">Driving School:</span>
          <span className="text-text">
            {offer.school?.firstName} {offer.school?.lastName}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-b200 font-bold mb-1 sm:mb-0 sm:mr-2">Offer Title:</span>
          <span className="text-text">{offer.title}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-b200 font-bold mb-1 sm:mb-0 sm:mr-2">Duration:</span>
          <span className="text-text">{offer.durationHours} hours a week</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-b200 font-bold mb-1 sm:mb-0 sm:mr-2">Start Date:</span>
          <span className="text-text">
            {new Date(temporaryReservation.startDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-b200 font-bold mb-1 sm:mb-0 sm:mr-2">Price:</span>
          <span className="text-text">{temporaryReservation.price} Dh</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-b200 font-bold mb-1 sm:mb-0 sm:mr-2">Location:</span>
          <span className="text-text">{offer.location?.address}</span>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-6 sm:mt-auto">
        <Button
          onClick={onBack}
          type="secondary"
          className="flex-1  py-3 px-6"
        >
          Back
        </Button>
        <Button
          onClick={onConfirm}
          className="flex-1 py-3 px-6"
        >
          Confirm Reservation
        </Button>
      </div>
    </div>
  );
};

export default ReservationConfirmation;