"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

import SuccessPopup from "./SuccessPopup"


const PaymentForm = ({
  // Added variables for all text content
  schoolName = "School Name",
  offerName = "20 Hour Offer",
  startDate = "20/05/2025",
  price = "500Dh",
  location = "123 Avenue Hassan II, Casablanca, Morocco",
  onPaymentComplete,
}) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  

  // Form state
  const [fullName, setFullName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [securityCode, setSecurityCode] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal")

  // Validation states
  const [errors, setErrors] = useState({
    fullName: "",
    cardNumber: "",
    securityCode: "",
    expiryDate: "",
  })

  // Payment method images
  const paymentMethods = [
    { id: "paypal", name: "PayPal", src: "/src/assets/paypal-svgrepo-com.svg", alt: "PayPal" },
    { id: "mastercard", name: "Mastercard", src: "/src/assets/mastercard-svgrepo-com.svg", alt: "Mastercard" },
    { id: "visa", name: "Visa", src: "/src/assets/visa-svgrepo-com.svg", alt: "Visa" },
  ]

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Validate full name
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters"
      isValid = false
    } else if (/\d/.test(fullName)) {
      newErrors.fullName = "Name cannot contain numbers"
      isValid = false
    }

    // Validate card number
    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
      isValid = false
    } else if (!/^\d{13,19}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Enter a valid card number"
      isValid = false
    }

    // Validate security code
    if (!securityCode.trim()) {
      newErrors.securityCode = "Security code is required"
      isValid = false
    } else if (!/^\d{3,4}$/.test(securityCode)) {
      newErrors.securityCode = "Enter a valid security code"
      isValid = false
    }

    // Validate expiry date
    if (!expiryMonth || !expiryYear) {
      newErrors.expiryDate = "Expiry date is required"
      isValid = false
    } else {
      const today = new Date()
      const currentMonth = today.getMonth() + 1 // JavaScript months are 0-indexed
      const currentYear = today.getFullYear()

      // Convert to numbers for comparison
      const month = Number.parseInt(expiryMonth, 10)
      const year = Number.parseInt(expiryYear, 10)

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = "Card has expired"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handlePayment = () => {
    if (validateForm()) {
      setShowSuccess(true)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    onPaymentComplete?.()
  }

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  return (
    <>
      <div className="w-full max-w-[950px] mx-auto px-4 py-4 scale-95 origin-center">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Left panel - 30% width */}
          <div className="w-full md:w-[35%] bg-[#F6F5FB] md:rounded-r-none p-5">
            <div className="flex flex-col justify-center h-full py-8">
              <h2 className="text-xl font-semibold text-[#1E1B48] mb-6">Offer Summary</h2>

              <div className="space-y-5">
                <div>
                  <span className="text-[#0A1172] text-[16px] font-bold">Driving School: </span>
                  <span className="text-gray-600 text-[16px]">{schoolName}</span>
                </div>

                <div>
                  <span className="text-[#0A1172] text-[16px] font-bold">Offer: </span>
                  <span className="text-gray-600 text-[16px]">{offerName}</span>
                </div>

                <div>
                  <span className="text-[#0A1172] text-[16px] font-bold">Start Date: </span>
                  <span className="text-gray-600 text-[16px]">{startDate}</span>
                </div>

                <div>
                  <span className="text-[#0A1172] text-[16px] font-bold">Price: </span>
                  <span className="text-gray-600 text-[16px]">{price}</span>
                </div>
                <div>
                  <span className="text-[#0A1172] text-[16px] font-bold">Location: </span>
                  <span className="text-gray-600 text-[16px]">{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - 70% width */}
          <div className="w-full md:w-[65%] bg-white md:rounded-l-none p-5">
            <h2 className="text-xl font-semibold text-[#1E1B48] mb-5">Offer Payment</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1E1B48] mb-2">Payment Method</label>
                <div className="flex space-x-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border ${
                        selectedPaymentMethod === method.id ? "border-[#0A1172] bg-white" : "border-gray-200 bg-gray-50"
                      } p-2 rounded-lg transition-colors flex items-center justify-center w-20 h-10 cursor-pointer`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedPaymentMethod(method.id);
                        }
                      }}
                    >
                      <div className="h-8 w-16 flex items-center justify-center overflow-hidden">
                        <img
                          src={method.src || "/placeholder.svg"}
                          alt={method.alt}
                          className="h-full object-contain scale-125"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1B48] mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Eg: Khaoula Hassoune"
                  value={fullName}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[0-9]/g, "")
                    setFullName(value)
                  }}
                  className={`w-full p-3 border ${
                    errors.fullName ? "border-red-500" : "border-gray-200"
                  } rounded-lg focus:ring-1 focus:ring-[#0A1172] focus:border-transparent`}
                />
                {errors.fullName && <p className="mt-1 text-red-500 text-xs">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1B48] mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="Eg: 1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9\s]/g, "")
                    setCardNumber(formatCardNumber(value))
                  }}
                  maxLength={19}
                  className={`w-full p-3 border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-200"
                  } rounded-lg focus:ring-1 focus:ring-[#0A1172] focus:border-transparent`}
                />
                {errors.cardNumber && <p className="mt-1 text-red-500 text-xs">{errors.cardNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1B48] mb-1">Security Code</label>
                <input
                  type="text"
                  placeholder="Eg: 123"
                  value={securityCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setSecurityCode(value)
                  }}
                  maxLength={4}
                  className={`w-full p-3 border ${
                    errors.securityCode ? "border-red-500" : "border-gray-200"
                  } rounded-lg focus:ring-1 focus:ring-[#0A1172] focus:border-transparent`}
                />
                {errors.securityCode && <p className="mt-1 text-red-500 text-xs">{errors.securityCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1B48] mb-1">Expiry Date</label>
                <div className="relative">
                  <div
                    className={`w-full p-3 border ${
                      errors.expiryDate ? "border-red-500" : "border-gray-200"
                    } rounded-lg bg-white flex items-center`}
                  >
                    <Calendar className="w-4 h-4 text-[#0A1172] mr-2" />
                    <div className="flex space-x-2 w-full">
                      <select
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        className="w-1/2 p-1 border-none focus:ring-0 text-[#1E1B48] text-sm"
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = i + 1
                          return (
                            <option key={month} value={month.toString().padStart(2, "0")}>
                              {month.toString().padStart(2, "0")}
                            </option>
                          )
                        })}
                      </select>
                      
                      <select
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        className="w-1/2 p-1 border-none focus:ring-0 text-[#1E1B48] text-sm"
                      >
                        <option value="">YYYY</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  {errors.expiryDate && <p className="mt-1 text-red-500 text-xs">{errors.expiryDate}</p>}
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-[#0A1172] text-white py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors text-base font-medium mt-4"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && <SuccessPopup schoolName={schoolName} onClose={handleCloseSuccess} />}
    </>
  )
}

export default PaymentForm
