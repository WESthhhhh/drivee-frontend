import { Pencil, Trash } from "../UI/icons";
import Button from "../UI/button";
import AddOfferModal from "../modals/addOffer";
import VerificationModal from "../modals/verification"; 
import { useState } from "react";

export default function Offers() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  // Sample data - replace with your actual data
  const schools = [
    {
      id: 1,
      name: "Ecole Saada",
      email: "saada@gmail.com",
      phone: "065769899",
      location: "Adrar",
      registeredAt: "2023-05-15",
      status: "Pending",
      documentName: "license.pdf",
      documentUrl: "/path/to/document.pdf"
    },
    {
      id: 1,
      name: "Ecole Ewa",
      email: "saada@gmail.com",
      phone: "065769899",
      location: "Adrar",
      registeredAt: "2023-05-15",
      status: "Pending",
      documentName: "license.pdf",
      documentUrl: "/path/to/document.pdf"
    },
    // Add more schools as needed
  ];

  const handleVerify = async () => {
    try {
      // Add your verification API call here
      console.log("Verifying school:", selectedSchool.id);
      setIsVerificationModalOpen(false);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const handleReject = async () => {
    try {
      // Add your rejection API call here
      console.log("Rejecting school:", selectedSchool.id);
      setIsVerificationModalOpen(false);
    } catch (error) {
      console.error('Rejection failed:', error);
    }
  };

  return (
    <div className="space-y-12 px-5 mt-9 font-poppins">
      <div className="space-y-10">
        <div className="text-[#0F34AE] text-[25px] font-bold">Manage Schools</div>
        <div className="">
          {/* Add Offer Modal */}
          <AddOfferModal 
            isOpen={isAddModalOpen} 
            closeModal={() => setIsAddModalOpen(false)}
          />

          {/* Verification Modal */}
          <VerificationModal
            isOpen={isVerificationModalOpen}
            closeModal={() => setIsVerificationModalOpen(false)}
            schoolName={selectedSchool?.name}
            documentName={selectedSchool?.documentName}
            documentUrl={selectedSchool?.documentUrl}
            onVerify={handleVerify}
            onReject={handleReject}
          />

          {/* List */}
          <div className="mt-4">
            <div className="bg-cayan50 flex gap-4 px-2 py-4 font-semibold text-[#0B247A]">
              <div className="basis-2/12">Name</div>
              <div className="basis-2/12">Email</div>
              <div className="basis-1/12">Phone</div>
              <div className="basis-2/12">Location</div>
              <div className="basis-2/12">Registered At</div>
              <div className="basis-2/12">Status</div>
              <div className="basis-1/12">Action</div>
            </div>
            
            {/* Map over schools */}
            {schools.map((school) => (
              <div key={school.id} className="flex gap-4 px-2 py-4 border-b border-b50 items-center">
                <div className="basis-2/12">{school.name}</div>
                <div className="basis-2/12 truncate">{school.email}</div>
                <div className="basis-1/12">{school.phone}</div>
                <div className="basis-2/12">{school.location}</div>
                <div className="basis-2/12">{school.registeredAt}</div>
                <div className="basis-2/12">
                  <div className="bg-[#F2FAF4] p-2 flex items-center gap-3 text-[#4F7E59] w-fit rounded-small-md">
                    <div className="w-3 h-3 rounded-full border border-[#4F7E59]"></div>
                    <div>{school.status}</div>
                  </div>
                </div>
                <div className="basis-1/12 flex items-center ">
                  <button 
                    onClick={() => {
                      setSelectedSchool(school);
                      setIsVerificationModalOpen(true);
                    }}
                  >
                    <Pencil />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}