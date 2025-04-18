"use client"

const ReservationConfirmation = ({ schoolName, offer, startDate, price, location, onProceed }) => {
  return (
    <div className="w-full max-w-[502px] min-h-[400px] md:h-[546px] mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-[#FDFDFD] border border-gray-100 rounded-2xl shadow-sm flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-10">Reservation Confirmation</h2>

      <div className="space-y-6 sm:space-y-10 flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-[#0A1172] font-bold mb-1 sm:mb-0 sm:mr-2">Driving School:</span>
          <span className="text-[#0A1172]">{schoolName}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-[#0A1172] font-bold mb-1 sm:mb-0 sm:mr-2">Offer:</span>
          <span className="text-[#0A1172]">{offer}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-[#0A1172] font-bold mb-1 sm:mb-0 sm:mr-2">Start Date:</span>
          <span className="text-[#0A1172]">{startDate}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-[#0A1172] font-bold mb-1 sm:mb-0 sm:mr-2">Price:</span>
          <span className="text-[#0A1172]">{price}Dh</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-[#0A1172] font-bold mb-1 sm:mb-0 sm:mr-2">Location:</span>
          <span className="text-[#0A1172]">{location}</span>
        </div>
      </div>

      <button
        onClick={() => onProceed?.()}
        className="w-full mt-6 sm:mt-auto bg-[#0A1172] text-light py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors"
      >
        Proceed To Payment
      </button>
    </div>
  )
}

export default ReservationConfirmation
