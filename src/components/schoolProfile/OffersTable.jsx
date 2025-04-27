import { Pencil, Trash } from "../UI/icons";
import Button from "../UI/button";
import AddOfferModal from "../modals/addOffer";
import EditOfferModal from "../modals/editOffer";
import  ConfirmPopup  from "../modals/confirmation";
import SuccessPopup from "../modals/SuccessPopup";
import { format } from 'date-fns';

import { useState, useEffect } from "react";
import { 
  deleteOffer,
  createOffer,
  fetchAllOffers,
  updateOffer,
  fetchOffersForCurrentSchool
} from "../../services/offersApi";
import { useParams } from "react-router-dom";

export default function SchoolOffers() {
  const { schoolId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successTitle, setSuccessTitle] = useState('');
  const [popupType, setPopupType] = useState('create'); 



  // Fetch offers by school ID on component mount
  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchOffersForCurrentSchool();
        setOffers(data);
      } catch (err) {
        setError(err.message);
        // Handle 403 specifically
        if (err.message.includes('403')) {
          setError("You don't have permission to view these offers");
        }
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  // Handle create new offer for this school
  const handleCreateOffer = async (offerData) => {
    try {
      const newOffer = await createOffer(offerData);
      setOffers([...offers, newOffer]);
      setIsModalOpen(false);
      setSuccessTitle("Offer Created Successfully!");
      setSuccessMessage(`"${newOffer.title}" has been successfully created.`);
      setPopupType('create');
      setShowSuccessPopup(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteOffer(itemToDelete);
      setOffers(offers.filter(offer => offer.id !== itemToDelete));
      setShowConfirm(false);
    } catch (err) {
      setError(err.message);
      setShowConfirm(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      const offer = offers.find(offer => offer.id === id);
      if (offer) {
        setCurrentOffer(offer);
        setIsEditModalOpen(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  
  

  const handleUpdateOffer = async (updatedData) => {
    try {
      const updatedOffer = await updateOffer(currentOffer.id, updatedData);
      setOffers(offers.map(offer => 
        offer.id === updatedOffer.id ? updatedOffer : offer
      ));
      setIsEditModalOpen(false);
      setCurrentOffer(null);
      setSuccessTitle("Offer Updated Successfully!");
      setSuccessMessage(`"${updatedOffer.title}" has been successfully updated.`);
      setPopupType('update');
      setShowSuccessPopup(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-12 px-5 mt-9 font-poppins">

      {showConfirm && (
        <ConfirmPopup
          title="Are you Sure You Want To Delete the Offer !"
          confirmText="Delete"
          mainMessage="Are you sure you want to delete this offer? This action cannot be undone."
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {showSuccessPopup && (
        <SuccessPopup
          title={successTitle}
          mainMessage={successMessage}
          buttonText="Close"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
      <div className="space-y-10">
        <div className="text-[#0F34AE] text-[25px] font-bold">
          Manage Offers
        </div>
        
        <div className="">
          <div className="flex justify-end">
            <Button 
              type="primary" 
              onClick={() => setIsModalOpen(true)}
            >
              Add New Offer
            </Button>
          </div>
          
          {/* Add Offer Modal */}
          <AddOfferModal 
            isOpen={isModalOpen} 
            closeModal={() => setIsModalOpen(false)}
            onOfferCreated={handleCreateOffer}
          />

          {/* Edit Offer Modal */}
          <EditOfferModal
            isOpen={isEditModalOpen}
            closeModal={() => {
              setIsEditModalOpen(false);
              setCurrentOffer(null);
            }}
            offer={currentOffer}
            onOfferUpdated={handleUpdateOffer}
          />

          {/* Offers table */}
          <div className="mt-4">
            <div className="bg-cayan50 flex gap-4 px-2 py-4 font-semibold text-[#0B247A] text-sm">
              <div className="basis-2/12">Name</div>
              <div className="basis-2/12">Description</div>
              <div className="basis-1/12">Price</div>
              <div className="basis-2/12">Duration</div>
              <div className="basis-2/12">Start Date</div>
              <div className="basis-2/12">End Date</div>
              <div className="basis-1/12">Actions</div>
            </div>
            
            {offers.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No offers found for this school
              </div>
            ) : (
              offers.map(offer => (
                <div key={offer.id} className="flex gap-4 px-2 py-4 border-b border-b50 hover:bg-gray-50 text-sm">
                  <div className="basis-2/12">{offer.title || 'N/A'}</div>
                  <div className="basis-2/12 truncate">{offer.description || 'N/A'}</div>
                  <div className="basis-1/12">{offer.price || 'N/A'}</div>
                  <div className="basis-2/12">{offer.durationHours || 'N/A'}</div>
                  <div className="col-span-2">{offer.startDate ? format(new Date(offer.startDate), 'MM-dd-yy') : 'N/A'}</div>
                  <div className="col-span-2">{offer.endDate ? format(new Date(offer.endDate), 'MM-dd-yy') : 'N/A'}</div>
                  <div className="basis-1/12 flex items-center gap-2">
                  <button onClick={() => handleDeleteClick(offer.id)} className="hover:text-red-600">                      
                      <Trash />
                    </button>
                    <div className="h-[22px] w-0.25 bg-[#6E6E6A]" />
                    <button onClick={() => handleEdit(offer.id)} className="hover:text-blue-600">
                      <Pencil />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}