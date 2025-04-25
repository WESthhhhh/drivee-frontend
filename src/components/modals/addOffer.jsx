import { FaRegClock, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoMdClose } from 'react-icons/io';
import { useState, useEffect } from 'react';
import Button from '../UI/button';
import { PrimaryInput, TextArea } from '../UI/formInputs';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { fetchCities, createOffer } from '../../services/offersApi';
import SuccessPopup from '../modals/SuccessPopup';

const AddOfferModal = ({ isOpen, closeModal, onOfferCreated = () => {}, schoolId }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    durationHours: '',
    price: '',
    startDate: '',
    endDate: '',
    city: '',
    address: ''
  });

  const initialFormState = {
    title: '',
    description: '',
    durationHours: '',
    price: '',
    startDate: '',
    endDate: '',
    city: '',
    address: ''
  };

  // UI state
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCityLabel, setSelectedCityLabel] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Fetch cities when modal opens
  useEffect(() => {
    const loadCities = async () => {
      if (!isOpen) return;
      
      setIsLoadingCities(true);
      try {
        const citiesData = await fetchCities();
        setCities(citiesData);
      } catch (error) {
        setErrors(prev => ({ ...prev, city: 'Failed to load cities' }));
        console.error('Error fetching cities:', error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    loadCities();
  }, [isOpen]);

  // Handlers
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleCitySelect = (city) => {
    handleChange('city', city.value);
    setSelectedCityLabel(city.label);
    setOpenDropdown(null);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      isValid = false;
    }

    // Duration validation
    if (!formData.durationHours) {
      newErrors.durationHours = "Duration is required";
      isValid = false;
    } else if (isNaN(formData.durationHours)) {
      newErrors.durationHours = "Duration must be a number";
      isValid = false;
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(formData.price)) {
      newErrors.price = "Price must be a number";
      isValid = false;
    }

    // Date validation
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    } else if (new Date(formData.startDate) < new Date()) {
      newErrors.startDate = "Start date cannot be in the past";
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date";
      isValid = false;
    }

    // Location validation
    if (!formData.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const offerData = {
        ...formData,
        schoolId: schoolId || user?.schoolId,
        durationHours: Number(formData.durationHours),
        price: Number(formData.price),
      };
  
      console.log('Prepared offer data:', offerData);
  
      const newOffer = await createOffer(offerData);
      
      if (!newOffer?.id) {
        throw new Error('Unexpected response from server');
      }
  
      setFormData(initialFormState);
      setSelectedCityLabel('');
      onOfferCreated(newOffer);
      setShowSuccessPopup(true);
      
    } catch (error) {
      console.error('Detailed submission error:', {
        error: error.message,
        formData,
        user
      });
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to create offer'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessPopup(false);
    closeModal();
  };

  // Early returns
  if (!isOpen) return null;

  if (isLoading || isLoadingCities) {
    return (
      <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
        <div className="bg-light rounded-large-md p-8">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showSuccessPopup && (
        <SuccessPopup
          title="Offer Created Successfully!"
          mainMessage="Your new offer has been successfully added."
          highlightedText={formData.title}
          secondaryMessage="You can now manage it from your offers dashboard."
          buttonText="Close"
          onClose={handleCloseSuccess}
        />
      )}

      <div className="fixed inset-0 bg-b500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999999999] p-4">
        <div className="bg-light rounded-large-md max-w-lg w-full max-h-[90vh] flex flex-col relative overflow-hidden">
          <div className="sticky top-0 bg-light z-10 pt-5 px-5 pb-4 border-b border-stroke">
            <div className="relative flex justify-center items-center">
              <h1 className="text-b200 font-bold text-xl text-center mt-4">Add New Offer</h1>
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
              <PrimaryInput
                label="Offer Title"
                placeholder="Enter offer title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                error={errors.title}
              />
              
              <TextArea
                label="Description"
                placeholder="Enter course description (minimum 10 characters)"
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                error={errors.description}
              />

              <div className="grid grid-cols-2 gap-3 my-2 border-t border-b border-stroke py-4">
                <PrimaryInput
                  label={
                    <div className="flex items-center gap-1">
                      <FaRegClock className="text-b500 text-xs" />
                      <span className="text-b500 font-semibold text-xs">Duration (hours)</span>
                    </div>
                  }
                  type="number"
                  placeholder="0"
                  value={formData.durationHours}
                  onChange={(e) => handleChange('durationHours', e.target.value)}
                  error={errors.durationHours}
                  min="1"
                />

                <PrimaryInput
                  label={
                    <div className="flex items-center gap-1">
                      <FaDollarSign className="text-b500 text-xs" />
                      <span className="text-b500 font-semibold text-xs">Price (dh)</span>
                    </div>
                  }
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  error={errors.price}
                  min="0"
                  step="0.01"
                />

                <PrimaryInput
                  label={
                    <div className="flex items-center gap-1">
                      <IoCalendarClearOutline className="text-b500 text-xs" />
                      <span className="text-b500 font-semibold text-xs">Start Date</span>
                    </div>
                  }
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  error={errors.startDate}
                  min={new Date().toISOString().split('T')[0]}
                />

                <PrimaryInput
                  label={
                    <div className="flex items-center gap-1">
                      <IoCalendarClearOutline className="text-b500 text-xs" />
                      <span className="text-b500 font-semibold text-xs">End Date</span>
                    </div>
                  }
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  error={errors.endDate}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />

                <div className="col-span-1 relative">
                  <label className="flex items-center gap-1 text-primary font-semibold text-xs mb-3">
                    <FaMapMarkerAlt className="text-bprimary text-xs" />
                    <span>Area</span>
                  </label>
                  
                  <div
                    className={`w-full p-2 border text-[14px] flex items-center justify-between cursor-pointer rounded-small-md focus:outline-none focus:ring-thin focus:ring-border-b50 focus:border-b75 ${
                      errors.city ? 'border-red-500' : 'border-b50'
                    }`}
                    onClick={() => toggleDropdown('city')}
                  >
                    <span>{selectedCityLabel || 'Select a city'}</span>
                    <svg
                      className={`w-4 h-4 transition-transform text-accent ${
                        openDropdown === 'city' ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openDropdown === 'city' && (
                    <div className="dropdown absolute top-full left-0 mt-1 bg-light shadow-primary-4 rounded-small-md p-2 w-full z-50 border border-stroke max-h-60 overflow-y-auto">
                      {isLoadingCities ? (
                        <div className="py-2 px-4 text-b200">Loading cities...</div>
                      ) : (
                        cities.map((city) => (
                          <div
                            key={city.value}
                            className="py-2 px-4 hover:bg-cayan50 cursor-pointer text-b200 rounded-md"
                            onClick={() => handleCitySelect(city)}
                          >
                            {city.label}
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div className="col-span-1">
                  <PrimaryInput
                    label={
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-b500 text-xs" />
                        <span className="text-b500 font-semibold text-xs">Address</span>
                      </div>
                    }
                    placeholder="Enter exact address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    error={errors.address}
                  />
                </div>
              </div>
            </form>
          </div>
          
          <div className="p-5 pt-2 border-t border-stroke">
          <Button
            type="primary"
            className="w-full py-2 text-sm"
            disabled={isSubmitting}
            htmlType="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            {isSubmitting ? 'Creating...' : 'Create Offer'}
          </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOfferModal;