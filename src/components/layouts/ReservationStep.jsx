"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Button from "../UI/button"
const ReservationStep = ({
  offer,
  trainingTitle = offer?.title || "Training Offer",
  address = offer?.location?.address || "Address not specified",
  phoneNumber = offer?.school?.phone || "Phone not specified",
  hours = offer?.durationHours ? `${offer.durationHours} Hours` : "Duration not specified",
  totalPrice = offer?.price ? `${offer.price} dh` : "Price not specified",
  chooseDateLabel = "Choose The Date",
  dateInputPlaceholder = "Enter The desired start Date",
  confirmButtonText = "Next",
  selectedDate,
  onDateChange,
  onConfirm,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [error, setError] = useState(null);

  // Initialize with today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get offer's date range
  const offerStartDate = offer?.startDate ? new Date(offer.startDate) : null;
  const offerEndDate = offer?.endDate ? new Date(offer.endDate) : null;

  // Function to check if a date is within the offer's available range
  const isDateInRange = (date) => {
    if (!offerStartDate || !offerEndDate) return true;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate >= offerStartDate && checkDate <= offerEndDate;
  };

  // Format date for display (MM/DD/YYYY)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Generate calendar days
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  // Previous month
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  // Handle date selection - ONLY ONE VERSION OF THIS FUNCTION
  const handleDateSelect = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateChange(date.toISOString().split("T")[0]);
    setIsCalendarOpen(false);
  };

  // Generate calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-5 w-5"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate === date.toISOString().split("T")[0];
      const isPast = date < today;
      const isInOfferRange = isDateInRange(date);
      
      days.push(
        <div
          key={`day-${day}`}
          className={`h-5 w-5 flex items-center justify-center rounded-full cursor-pointer text-[10px]
            ${isSelected ? "bg-[#0B247A] text-light" : ""}
            ${isToday && !isSelected ? "border border-[#0B247A] text-[#0B247A]" : ""}
            ${(isPast || !isInOfferRange) && !isToday ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}`}
          onClick={() => !isPast && isInOfferRange && handleDateSelect(day)}
        >
          {day}
        </div>
      );
    }
    
    return (
      <div className="bg-light p-2 rounded-small-md shadow-lg text-xs w-52">
        <div className="flex justify-between items-center mb-1">
          <button className="p-0.5 rounded-full hover:bg-gray-100" onClick={prevMonth}>
            <ChevronLeft className="w-3 h-3 text-[#0B247A]" />
          </button>
          <div className="text-xs font-medium">
            {currentMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </div>
          <button className="p-0.5 rounded-full hover:bg-gray-100" onClick={nextMonth}>
            <ChevronRight className="w-3 h-3 text-[#0B247A]" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {dayNames.map(day => (
            <div key={day} className="h-5 w-5 flex items-center justify-center font-medium text-[10px] text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[1025px] px-4 md:px-0 py-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-0 border border-gray-100 rounded-large-md shadow-primary-4 overflow-hidden">
        <div className="w-full md:w-[408px] bg-cayan50 md:rounded-r-none md:py-20 p-6 py-8">
          <h2 className="text-[18px] font-semibold text-b200 mb-6">{trainingTitle}</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-[#0B247A] mt-1" />
              <p className="text-[16px] text-[#0B247A]">{address}</p>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-4 h-4 text-[#0B247A] mt-1" />
              <p className="text-[16px] text-[#0B247A]">{phoneNumber}</p>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-[#0B247A] mt-1" />
              <p className="text-[16px] text-[#0B247A]">{hours} a week</p>
            </div>
            <div className="pt-6 mt-auto">
            <div className="flex justify-between items-center border-t border-stroke 0 pt-4">
              <span className="text-base font-medium text-gray-800">Total Price:</span>
              <span className="text-xl font-bold text-[#0B247A]">{totalPrice}</span>
            </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[617px] bg-light md:rounded-l-none md:py-20 p-6 py-8">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-b200 mb-6">Offer Reservation</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-text mb-3">{chooseDateLabel}</label>
                <div className="relative">
                  <div className="w-full p-2 border border-[#E5E7EB] rounded-small-md bg-light flex items-center">
                    <Calendar 
                      className="w-4 h-4 text-[#0B247A] mr-2 cursor-pointer" 
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    />
                    <span className={selectedDate ? "text-text" : "text-gray-400"}>
                      {selectedDate ? formatDateForDisplay(selectedDate) : dateInputPlaceholder}
                    </span>
                  </div>
                  {isCalendarOpen && (
                    <div className="absolute top-full left-0 mt-2 z-10">
                      {renderCalendar()}
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={onConfirm}
                disabled={!selectedDate}
                className={`w-full text-base 
                  ${selectedDate ? "bg-primary text-light hover:bg-b500" : "bg-gray-200 text-gray-500 cursor-not-allowed"}
                  transition-colors`}
              >
                {confirmButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationStep;