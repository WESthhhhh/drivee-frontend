import { FaStar } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/button';
import { TextArea } from '../UI/formInputs';
import api from '../../utils/axios';

const AddReviewModal = ({ isOpen, closeModal, onReviewCreated, offerId }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({
    rating: '',
    comment: ''
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
      rating: '',
      comment: ''
    };

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
      isValid = false;
    }

    if (!comment.trim()) {
      newErrors.comment = "Review comment is required";
      isValid = false;
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Review must be at least 10 characters";
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
      const response = await api.post('/reviews', {
        offerId,
        score,
        review: comment.trim()
      });
      
      // Reset form
      setRating(0);
      setComment('');
      
      onReviewCreated(response.data);
      closeModal();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        console.error('Error creating review:', error);
        alert(
          error.response?.data?.error || 
          error.response?.data?.details || 
          "Failed to create review"
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
            <h1 className="text-b200 font-bold text-xl text-center mt-4">Add Your Review</h1>
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
            <div className="mb-4">
              <label className="text-b500 font-semibold text-xs mb-2 block">
                Your Rating
              </label>
              <div className="flex justify-start gap-1">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className="cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        className="hidden"
                      />
                      <FaStar
                        className="text-2xl"
                        color={ratingValue <= (hover || rating) ? "#0F34AE" : "#E7EBF7"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
              )}
            </div>
            
            <TextArea
              label="Your Review"
              placeholder="Share your experience (minimum 10 characters)"
              rows={5}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (errors.comment) {
                  setErrors(prev => ({ ...prev, comment: '' }));
                }
              }}
              error={errors.comment}
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
            {isSubmitting ? 'Posting...' : 'Post Review'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;