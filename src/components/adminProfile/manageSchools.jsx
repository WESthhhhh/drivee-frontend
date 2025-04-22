import { Pencil, Trash } from "../UI/icons";
import Button from "../UI/button";
import VerificationModal from "../modals/verification"; 
import { useState, useEffect } from "react";

export default function Offers() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
  const [filters, setFilters] = useState({
    status: 'Pending' // Default filter
  });

  useEffect(() => {
    fetchSchools();
  }, [pagination.page, filters]);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      }).toString();

      const response =await fetch(`${import.meta.env.VITE_API_BASE_URL}/school?${queryParams}`);
      const data = await response.json();
      
      if (data.success) {
        setSchools(data.data);
        setPagination(prev => ({
          ...prev,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages
        }));
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleVerify = async () => {
  //   try {
  //     // API call to verify school
  //     const response = await fetch(`/api/schools/${selectedSchool.id}/verify`, {
  //       method: 'PUT'
  //     });
      
  //     if (response.ok) {
  //       // Refresh the list
  //       fetchSchools();
  //       setIsVerificationModalOpen(false);
  //     }
  //   } catch (error) {
  //     console.error('Verification failed:', error);
  //   }
  // };

  // const handleReject = async () => {
  //   try {
  //     // API call to reject school
  //     const response = fetch(`${import.meta.env.VITE_API_BASE_URL}/schools/${selectedSchool.id}/reject`, {
  //       method: 'PUT'
  //     });
      
  //     if (response.ok) {
  //       // Refresh the list
  //       fetchSchools();
  //       setIsVerificationModalOpen(false);
  //     }
  //   } catch (error) {
  //     console.error('Rejection failed:', error);
  //   }
  // };

  const handleStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="space-y-12 px-5 mt-9 font-poppins">
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <div className="text-[#0F34AE] text-[25px] font-bold">Manage Schools</div>
        </div>

       

        {/* Verification Modal */}
        <VerificationModal
          isOpen={isVerificationModalOpen}
          closeModal={() => setIsVerificationModalOpen(false)}
          schoolName={selectedSchool?.name}
          documentName={selectedSchool?.documentName}
          documentUrl={selectedSchool?.documentUrl}
          // onVerify={handleVerify}
          // onReject={handleReject}
        />

        {/* Status Filter */}
        <div className="flex gap-4">
          {['Pending', 'Verified', 'Rejected'].map(status => (
            <button
              key={status}
              className={`px-4 py-2 rounded-md ${
                filters.status === status 
                  ? 'bg-[#0F34AE] text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

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
          
          {loading ? (
            <div className="flex justify-center py-8">Loading...</div>
          ) : schools.length === 0 ? (
            <div className="flex justify-center py-8">
              No {filters.status.toLowerCase()} schools found
            </div>
          ) : (
            <>
              {schools.map((school) => (
                <div key={school.id} className="flex gap-4 px-2 py-4 border-b border-b50 items-center">
                  <div className="basis-2/12">{school.name}</div>
                  <div className="basis-2/12 truncate">{school.email}</div>
                  <div className="basis-1/12">{school.phone}</div>
                  <div className="basis-2/12">{school.location}</div>
                  <div className="basis-2/12">{new Date(school.registeredAt).toLocaleDateString()}</div>
                  <div className="basis-2/12">
                    <div className={`p-2 flex items-center gap-3 w-fit rounded-small-md ${
                      school.status === 'Verified' ? 'bg-[#F2FAF4] text-[#4F7E59]' :
                      school.status === 'Rejected' ? 'bg-[#FFF2F2] text-[#D34053]' :
                      'bg-[#FFF9E6] text-[#FFB800]'
                    }`}>
                      <div className={`w-3 h-3 rounded-full border ${
                        school.status === 'Verified' ? 'border-[#4F7E59]' :
                        school.status === 'Rejected' ? 'border-[#D34053]' :
                        'border-[#FFB800]'
                      }`}></div>
                      <div>{school.status}</div>
                    </div>
                  </div>
                  <div className="basis-1/12 flex items-center">
                    <button 
                      onClick={() => {
                        setSelectedSchool(school);
                        setIsVerificationModalOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        
        {/* Pagination */}
        {schools.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <Button 
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button 
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}