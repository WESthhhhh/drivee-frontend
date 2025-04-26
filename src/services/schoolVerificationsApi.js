import api from "../utils/axios";

export const verifySchool = async (verificationId) => {
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

export const rejectSchool = async (verificationId) => {
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

export const getUserVerification = async (userId) => {
  try {
    const response = await api.get(`/verifications/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user verification:', error);
    throw error;
  }
};