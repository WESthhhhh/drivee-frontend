'use client'
import { IoMdClose } from 'react-icons/io';
import React, { useState } from 'react';
import Button from '../UI/button';

const DeleteConfirmationModal = ({ 
  isOpen, 
  closeModal, 
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
      <div className="bg-light rounded-large-md max-w-lg w-full max-h-[90vh] flex flex-col relative overflow-hidden">
        <div className="sticky top-0 bg-light z-10 pt-5 px-5 pb-4 border-b border-stroke">
          <div className="relative flex justify-center items-center">
            <h1 className="text-b200 font-bold text-xl text-center mt-4">{title}</h1>
            <button 
              onClick={closeModal}
              className="absolute right-0 w-8 h-8 flex justify-center items-center bg-b50 hover:bg-blue-100 rounded-small-sm text-b500 font-bold text-xl transition-colors"
              disabled={isLoading}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
  
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="space-y-5">
            <p className="text-b300">{message}</p>
          </div>
        </div>
        
        <div className="p-5 pt-2 border-t border-stroke flex gap-3">
          <Button
            type="secondary"
            onClick={closeModal}
            className="w-full py-2 text-sm"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="danger"
            onClick={onConfirm}
            className="w-full py-2 text-sm"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;