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


// Enhanced with request queue and instance-based rate limiting
const requestQueue = [];
let isProcessing = false;
const BASE_DELAY = 1000; // 1s minimum between requests

async function processQueue() {
  if (isProcessing || requestQueue.length === 0) return;
  
  isProcessing = true;
  const { userId, resolve, reject, retryCount = 0 } = requestQueue.shift();

  try {
    const response = await api.get(`/verifications/user/${userId}`);
    const data = response.data;
    
    if (data.success && data.verification) {
      resolve({
        id: data.verification.id,
        proof: data.verification.proof,
        status: data.verification.status
      });
    } else {
      resolve(null);
    }
  } catch (error) {
    if (error.response?.status === 429 && retryCount < 3) {
      const delay = BASE_DELAY * (2 ** retryCount); // Exponential backoff
      setTimeout(() => {
        requestQueue.unshift({ 
          userId, 
          resolve, 
          reject, 
          retryCount: retryCount + 1 
        });
        processQueue();
      }, delay);
      return;
    }
    reject(error);
  } finally {
    isProcessing = false;
    setTimeout(processQueue, BASE_DELAY); // Enforce delay between requests
  }
}

export const fetchVerificationData = (userId) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ userId, resolve, reject });
    processQueue();
  });
};
/**
 * Helper function to construct document URL
 * @param {string} filename - Name of the file
 * @returns {string} Full URL to the document
 */
export const getDocumentUrl = (filename) => {
  return `${api.defaults.baseURL}/verifications/files/${filename}`;
};