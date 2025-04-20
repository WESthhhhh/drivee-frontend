import { IoMdClose } from 'react-icons/io';
import React from 'react';
import Button from '../UI/button';
import { PrimaryInput } from '../UI/formInputs';

const VerificationModal = ({ 
  isOpen, 
  closeModal, 
  schoolName,
  documentName,
  documentUrl,
  onVerify,
  onReject,
  isLoading 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
      <div className="bg-light rounded-large-md max-w-lg w-full max-h-[90vh] flex flex-col relative overflow-hidden">
        <div className="sticky top-0 bg-light z-10 pt-5 px-5 pb-4 border-b border-stroke">
          <div className="relative flex justify-center items-center">
            <h1 className="text-b200 font-bold text-xl text-center mt-5 mb-5">School Verification</h1>
            <button 
              onClick={closeModal}
              className="absolute right-0 top-1 w-8 h-8 flex justify-center items-center bg-b50 hover:bg-blue-100 rounded-small-sm text-b500 font-bold text-xl transition-colors"
            >
              <IoMdClose />
            </button>
          </div>
        </div>
  
        <div className="p-10 flex-1 overflow-y-auto">
          <div className="space-y-5">
            <div className="mb-4">
              <label className="text-b500 font-semibold text-xs mb-2 block">
                School Name
              </label>
              <div className="p-3  rounded-large-sm border border-stroke">
                {schoolName}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-b500 font-semibold text-xs mb-2 block">
                Verification Document
              </label>
              <div className="flex items-center justify-between p-3  rounded-large-sm border border-stroke">
                <span>{documentName}</span>
                <a 
                  href={documentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-b200 hover:text-b300 text-sm font-medium underline"
                >
                  View Document
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5 pt-10 border-t border-stroke flex gap-3">
          <Button
            type="primary"
            onClick={onVerify}
            className="flex-1 py-2 text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Verify School'}
          </Button>
          <Button
            type="secondary"
            onClick={onReject}
            className="flex-1 py-2 text-sm"
            disabled={isLoading}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;