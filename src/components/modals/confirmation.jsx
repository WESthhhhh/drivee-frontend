"use client";

import Button from "../UI/button";

const ConfirmPopup = ({
  icon,
  title = "Are you sure?",
  mainMessage = "This action cannot be undone.",
  highlightedText,
  secondaryMessage,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-light rounded-large-md py-10 px-14 max-w-md text-center shadow-primary-9 border-[0.2px] border-warning">
        {/* Customizable icon section */}
        <div className="flex justify-center mb-8">
          {icon || (
            <div className="w-16 h-16 rounded-full  flex items-center justify-center">
              <img src="/icons/warning.svg" alt="Warning" />
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold text-text mb-6">
          {title}
        </h2>

        {mainMessage && (
          <p className="text-inputtext mb-1">
            {mainMessage}
          </p>
        )}

        {highlightedText && (
          <p className="mb-8">
            <span className="text-b200 font-semibold">
              {highlightedText}
            </span>
          </p>
        )}

        {secondaryMessage && (
          <p className="text-xs text-inputtext mb-20">
            {secondaryMessage}
          </p>
        )}

        <div className="flex justify-center gap-6 mt-8">
          {/* <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-b200 font-medium rounded-small-md hover:shadow-primary-4 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-cayan50 text-b200 font-medium rounded-small-md hover:shadow-primary-4 transition-colors"
          >
            {confirmText}
          </button> */}

          
          <Button 
          type="ghost"
          onClick={onCancel}
          >
             {cancelText}
          </Button>
          
          <Button 
          type="primary"
          onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;