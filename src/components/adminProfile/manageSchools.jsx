import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Pencil } from "../UI/icons";
import VerificationModal from "../modals/verification";
import { Tooltip } from "../UI/tooltip"; 
import SuccessPopup from "../modals/SuccessPopup";
import { fetchVerificationData, getDocumentUrl } from "../../services/schoolVerificationsApi";

export default function Schools() {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [popupConfig, setPopupConfig] = useState({
    title: '',
    mainMessage: '',
    highlightedText: '',
    secondaryMessage: ''
  });
  const limit = 10;

  useEffect(() => {
    fetchSchools();
  }, [currentPage]);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limit,
        role: "SCHOOL",
      }).toString();

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/users?${queryParams}`,
        { credentials: "include" }
      );
      const data = await response.json();

      if (data.success) {
        setSchools(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerificationSuccess = (action) => {
    if (action === 'verified') {
      setPopupConfig({
        title: 'Verification Approved!',
        mainMessage: 'You have successfully verified',
        highlightedText: `${selectedSchool?.firstName} ${selectedSchool?.lastName}`,
        secondaryMessage: 'The school has been officially verified and recognized!'
      });
    } else {
      setPopupConfig({
        title: 'Verification Rejected',
        mainMessage: 'You have rejected the verification for',
        highlightedText: `${selectedSchool?.firstName} ${selectedSchool?.lastName}`,
        secondaryMessage: 'The school must submit new documents for verification.'
      });
    }
    
    setShowSuccessPopup(true);
    setIsVerificationModalOpen(false);
    fetchSchools();
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
  };

  const handleSchoolClick = async (school) => {
    setSelectedSchool(school);
    try {
      const verification = await fetchVerificationData(school.id);
      setSelectedVerification(verification);
      if (verification?.status !== 'APPROVED') {
        setIsVerificationModalOpen(true);
      }
    } catch (error) {
      console.error("Error handling school click:", error);
    }
  };

  const handleMouseEnter = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY - 40 // Position above the button
      });
      setShowTooltip(true);
    }
  };
  
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="px-5 mt-9 font-poppins">
       {showSuccessPopup && (
          <SuccessPopup
            title={popupConfig.title}
            mainMessage={popupConfig.mainMessage}
            highlightedText={popupConfig.highlightedText}
            secondaryMessage={popupConfig.secondaryMessage}
            onClose={handlePopupClose}
          />
        )}

        <VerificationModal
          isOpen={isVerificationModalOpen}
          closeModal={() => setIsVerificationModalOpen(false)}
          verificationId={selectedVerification?.id}
          schoolName={`${selectedSchool?.firstName} ${selectedSchool?.lastName}`}
          documentName={selectedVerification?.proof?.split('/').pop() || 'Verification Document'}
          documentUrl={selectedVerification?.proof ? getDocumentUrl(selectedVerification.proof) : null}
          onSuccess={handleVerificationSuccess}
          refreshData={fetchSchools}
        />

      <div className="space-y-6">
        <h1 className="text-[#0F34AE] text-2xl font-bold">Manage Schools</h1>

       
        <div className="bg-light rounded-large-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-cayan50 font-semibold text-[#0B247A] text-sm ">
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-2">Phone</div>
            <div className="col-span-2">Created At</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Action</div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">Loading...</div>
          ) : schools.length === 0 ? (
            <div className="flex justify-center py-8">No schools found</div>
          ) : (
            schools.map((school) => (
              <SchoolRow 
                key={school.id}
                school={school}
                onClick={handleSchoolClick}
                fetchVerificationData={fetchVerificationData}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

const SchoolRow = ({ school, onClick, fetchVerificationData }) => {
  const [verification, setVerification] = useState(null);
  const [loadingVerification, setLoadingVerification] = useState(true);

  useEffect(() => {
    const loadVerification = async () => {
      try {
        setLoadingVerification(true);
        const data = await fetchVerificationData(school.id);
        setVerification(data);
      } catch (error) {
        console.error("Error loading verification:", error);
      } finally {
        setLoadingVerification(false);
      }
    };
    loadVerification();
  }, [school.id, fetchVerificationData]);

  const getStatusBadge = () => {
    if (loadingVerification) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Loading...
        </span>
      );
    }

    if (!verification) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Not Submitted
        </span>
      );
    }

    switch(verification.status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Verified
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Not Submitted
          </span>
        );
    }
  };

  const getTooltipMessage = () => {
    if (loadingVerification) return "Loading verification status...";
    if (!verification) return "School hasn't submitted verification documents";
    if (verification.status === 'APPROVED') return "School is already verified";
    return "Click to verify/reject school";
  };

  const isDisabled = verification?.status === 'APPROVED' || !verification || loadingVerification;

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center text-sm hover:bg-gray-50 transition-colors">
      <div className="col-span-2">{`${school.firstName} ${school.lastName}`}</div>
      <div className="col-span-2 truncate">{school.email}</div>
      <div className="col-span-2">{school.phone}</div>
      <div className="col-span-2">
        {new Date(school.createdAt).toLocaleDateString()}
      </div>
      <div className="col-span-2">
        {getStatusBadge()}
      </div>
      <div className="col-span-2">
        <Tooltip content={getTooltipMessage()}>
          <button
            onClick={() => !isDisabled && onClick(school)}
            className={`p-1 rounded transition-colors ${
              isDisabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'
            }`}
            disabled={isDisabled}
          >
            <Pencil className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center gap-2 mb-16 mt-6">
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full disabled:opacity-50 hover:bg-cayan50 transition-colors"
      >
        <FaChevronLeft className="text-b200" />
      </button>
      
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }

        return (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentPage === pageNum 
                ? 'bg-primary text-light' 
                : 'hover:bg-cayan50 text-b200'
            } transition-colors`}
          >
            {pageNum}
          </button>
        );
      })}
      
      <button
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full disabled:opacity-50 hover:bg-cayan50 transition-colors"
      >
        <FaChevronRight className="text-b200" />
      </button>
    </div>
  );
};