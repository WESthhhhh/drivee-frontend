"use client"
import { Check } from "lucide-react"

const SuccessPopup = ({ schoolName = "Excellence Driving School", onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-light rounded-3xl p-8 max-w-md w-full text-center shadow-md">
        {/* Custom styled checkmark to match the image */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500 stroke-[3]" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Payment was Successful !</h2>

        <p className="text-gray-600 mb-1">Thank You For Reserving Your Driving Lesson </p>
        <p className="mb-8">
        With <span className="text-[#0F34AE] font-semibold">{schoolName}</span>.
        </p>

        <p className="text-[12px] text-[#454D59] mb-10">
          We've Sent A Confirmation Email With All The Details
          <br />
          About Your Driving Lessons.
        </p>

        <button
          onClick={onClose}
          className="px-10 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors"
        >
          Ok, Got It
        </button>
      </div>
    </div>
  )
}

export default SuccessPopup
