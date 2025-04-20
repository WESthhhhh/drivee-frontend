import { IoMdClose } from 'react-icons/io';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/button';
import { TextArea } from '../UI/formInputs';
import api from '../../utils/axios';

const ReplyReviewModal = ({ isOpen, closeModal, onReplyCreated, reviewId }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [reply, setReply] = useState('');
  const [errors, setErrors] = useState({
    reply: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
        <div className="bg-light rounded-large-md p-8">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      reply: ''
    };

    if (!reply.trim()) {
      newErrors.reply = "Reply is required";
      isValid = false;
    } else if (reply.trim().length < 5) {
      newErrors.reply = "Reply must be at least 5 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await api.post(`/reviews/${reviewId}/replies`, {
        reply: reply.trim()
      });
      
      setReply('');
      
      onReplyCreated(response.data);
      closeModal();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        console.error('Error creating reply:', error);
        alert(
          error.response?.data?.error || 
          error.response?.data?.details || 
          "Failed to reply to the review"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
      <div className="bg-light rounded-large-md max-w-lg w-full max-h-[90vh] flex flex-col relative overflow-hidden">
        <div className="sticky top-0 bg-light z-10 pt-5 px-5 pb-4 border-b border-stroke">
          <div className="relative flex justify-center items-center">
            <h1 className="text-b200 font-bold text-xl text-center mt-4">Reply to Review</h1>
            <button 
              onClick={closeModal}
              className="absolute right-0 w-8 h-8 flex justify-center items-center bg-b50 hover:bg-blue-100 rounded-small-sm text-b500 font-bold text-xl transition-colors"
            >
              <IoMdClose />
            </button>
          </div>
        </div>
  
        <div className="p-5 flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <TextArea
              label="Your Reply"
              placeholder="Write your reply (minimum 5 characters)"
              rows={5}
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
                if (errors.reply) {
                  setErrors(prev => ({ ...prev, reply: '' }));
                }
              }}
              error={errors.reply}
            />
          </form>
        </div>
        
        <div className="p-5 pt-2 border-t border-stroke">
          <Button
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
            className="w-full py-2 text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Reply'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyReviewModal;