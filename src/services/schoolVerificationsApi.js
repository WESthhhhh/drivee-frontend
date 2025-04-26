import api from "../utils/axios";

/**
 * Approves a school verification request
 * @param {string} verificationId - ID of the verification to approve
 * @returns {Promise<Object>} Response data
 */
export const approveVerification = async (verificationId) => {
  try {
    const response = await api.patch(`/verifications/${verificationId}/approve`);
    return response.data;
  } catch (error) {
    console.error("Error approving verification:", {
      error: error.response?.data || error.message,
      verificationId
    });
    throw error;
  }
};

/**
 * Rejects a school verification request
 * @param {string} verificationId - ID of the verification to reject
 * @returns {Promise<Object>} Response data
 */
export const rejectVerification = async (verificationId) => {
  try {
    const response = await api.patch(`/verifications/${verificationId}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting verification:', {
      error: error.response?.data || error.message,
      verificationId
    });
    throw error;
  }
};

/**
 * Fetches verification data for a specific user
 * @param {string} userId - ID of the user to fetch verification for
 * @returns {Promise<Object|null>} Verification data or null if not found
 */
export const fetchVerificationData = async (userId) => {
  try {
    const response = await api.get(`/verifications/user/${userId}`);
    const data = response.data;
    
    if (data.success && data.verification) {
      return {
        id: data.verification.id,
        proof: data.verification.proof,
        status: data.verification.status
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching verification:', {
      error: error.response?.data || error.message,
      userId
    });
    throw error;
  }
};

/**
 * Helper function to construct document URL
 * @param {string} filename - Name of the file
 * @returns {string} Full URL to the document
 */
export const getDocumentUrl = (filename) => {
  return `${api.defaults.baseURL}/verifications/files/${filename}`;
};