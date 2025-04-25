import { Pencil, Trash } from "../UI/icons";
import Button from "../UI/button";
import AddOfferModal from "../modals/addOffer";
import EditOfferModal from "../modals/editOffer";
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

  // Fetch offers by school ID on component mount
  useEffect(() => {
    const loadOffers = async () => {
      try {
        const data = await fetchAllOffers();
        setOffers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  // Handle create new offer for this school
  const handleCreateOffer = async (offerData) => {
    try {
      const newOffer = await createOffer(offerData); // Let the modal handle schoolId
      setOffers([...offers, newOffer]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };
  // Handle delete offer
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        await deleteOffer(id);
        setOffers(offers.filter(offer => offer.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      // Find the offer in the existing offers array
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
      // Call the API to update the offer
      const updatedOffer = await updateOffer(currentOffer.id, updatedData);
      
      // Update the local state
      setOffers(offers.map(offer => 
        offer.id === updatedOffer.id ? updatedOffer : offer
      ));
      
      // Close the modal
      setIsEditModalOpen(false);
      setCurrentOffer(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-12 px-5 mt-9 font-poppins">
      <div className="space-y-10">
        <div className="text-[#0F34AE] text-[25px] font-bold">
          Offers for School ID: {schoolId}
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
            <div className="bg-cayan50 flex gap-4 px-2 py-4 font-semibold text-[#0B247A]">
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
                <div key={offer.id} className="flex gap-4 px-2 py-4 border-b border-b50 hover:bg-gray-50">
                  <div className="basis-2/12">{offer.title || 'N/A'}</div>
                  <div className="basis-2/12 truncate">{offer.description || 'N/A'}</div>
                  <div className="basis-1/12">{offer.price || 'N/A'}</div>
                  <div className="basis-2/12">{offer.durationHours || 'N/A'}</div>
                  <div className="basis-2/12">{offer.startDate || 'N/A'}</div>
                  <div className="basis-2/12">{offer.endDate || 'N/A'}</div>
                  <div className="basis-1/12 flex items-center gap-2">
                    <button onClick={() => handleDelete(offer.id)} className="hover:text-red-600">
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