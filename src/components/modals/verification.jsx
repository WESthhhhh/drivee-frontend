import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../UI/button';
import { approveVerification, rejectVerification } from '../../services/schoolVerificationsApi';

const VerificationModal = ({ 
  isOpen, 
  closeModal, 
  verificationId,
  schoolName,
  documentName,
  documentUrl,
  onSuccess,
  refreshData
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleVerify = async () => {
    if (!verificationId) {
      setError('No verification selected');
      return;
    }
  
    setIsLoading(true);
    setError(null);
    try {
      await approveVerification(verificationId);
      onSuccess?.('verified');
      refreshData?.();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to verify school. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!verificationId) {
      setError('No verification selected');
      return;
    }
  
    setIsLoading(true);
    setError(null);
    try {
      await rejectVerification(verificationId);
      onSuccess?.('rejected');
      refreshData?.();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reject school. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center mt-25 p-4 z-40">
      <div className="bg-light rounded-large-md max-w-lg w-full flex flex-col relative overflow-hidden">
        <div className="sticky top-0 bg-light z-10 pt-5 px-5 pb-4 border-b border-stroke">
          <div className="relative flex justify-center items-center">
            <h1 className="text-b200 font-bold text-xl text-center mt-5 mb-5">School Verification</h1>
            <button 
              onClick={closeModal}
              className="absolute right-0 top-1 w-8 h-8 flex justify-center items-center bg-b50 hover:bg-blue-100 rounded-small-sm text-b500 font-bold text-xl transition-colors"
              disabled={isLoading}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
  
        <div className="p-10 flex-1 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-large-sm text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-5">
            <div className="mb-4">
              <label className="text-b500 font-semibold text-xs mb-2 block">
                School Name
              </label>
              <div className="p-3 rounded-large-sm border border-stroke">
                {schoolName || 'N/A'}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-b500 font-semibold text-xs mb-2 block">
                Verification Document
              </label>
              <div className="flex items-center justify-between p-3 rounded-large-sm border border-stroke">
                <span>{documentName || 'No document uploaded'}</span>
                {documentUrl ? (
                  <a 
                    href={documentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-b200 hover:text-b300 text-sm font-medium underline"
                  >
                    View Document
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">No document available</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5 pt-10 border-t border-stroke flex gap-3">
          <Button
            type="primary"
            onClick={handleVerify}
            className="flex-1 py-2 text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Approve Verification'}
          </Button>
          
          <Button
            type="secondary"
            onClick={handleReject}
            className="flex-1 py-2 text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Reject Verification'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;