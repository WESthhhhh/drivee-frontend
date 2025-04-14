"use client"

const SuccessPopup = ({
  icon,
  title,
  mainMessage,
  highlightedText,
  secondaryMessage,
  buttonText = "Close",
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-md">
        {/* Customizable icon section */}
        <div className="flex justify-center mb-8">
          {icon || (
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <img src="/images/success.svg" alt="" />
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {title}
        </h2>

        {mainMessage && (
          <p className="text-gray-600 mb-1">
            {mainMessage}
          </p>
        )}

        {highlightedText && (
          <p className="mb-8">
            <span className="text-[#0F34AE] font-semibold">
              {highlightedText}
            </span>
          </p>
        )}

        {secondaryMessage && (
          <p className="text-xs text-[#454D59] mb-10">
            {secondaryMessage}
          </p>
        )}

        <button
          onClick={onClose}
          className="px-10 py-3 bg-cayan50 text-b200 font-medium rounded-small-md hover:shadow-primary-4 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default SuccessPopup