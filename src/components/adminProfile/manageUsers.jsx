import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Learners() {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchLearners();
  }, [currentPage]);

  const fetchLearners = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limit,
        role: "STUDENT",
      }).toString();

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/admin/users?${queryParams}`,
        { credentials: "include" }
      );
      const data = await response.json();

      if (data.success) {
        setLearners(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching learners:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 mt-9 font-poppins">
      <div className="space-y-6">
        <h1 className="text-b200 text-2xl font-bold">All Learners</h1>

        {/* Learners Table */}
        <div className="bg-light rounded-large-md  overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-3 py-4 bg-cayan50 font-semibold text-primary">
            <div className="col-span-3">Name</div>
            <div className="col-span-4">Email</div>
            <div className="col-span-2">Phone</div>
            <div className="col-span-3">Created At</div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">Loading...</div>
          ) : learners.length === 0 ? (
            <div className="flex justify-center py-8">No learners found</div>
          ) : (
            learners.map((learner) => (
              <div
                key={learner.id}
                className="grid grid-cols-12 gap-4 px-3 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-3">{`${learner.firstName} ${learner.lastName}`}</div>
                <div className="col-span-4 basis-2/12 truncate w-[200px]">{learner.email}</div>
                <div className="col-span-2">{learner.phone}</div>
                <div className="col-span-3">
                  {new Date(learner.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Improved Pagination */}
        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
}