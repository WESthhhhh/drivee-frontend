import api from "../utils/axios";

export const verifySchool = async (verificationId) => {
    try {
      console.log("Attempting to verify:", verificationId); // Debug log
      const response = await api.patch(`/verifications/${verificationId}/verify`);
      return response.data;
    } catch (error) {
      console.error("Full error details:", {
        verificationId,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  };

export const rejectSchool = async (verificationId, reason) => {
  try {
    const response = await api.patch(
      `/verifications/${verificationId}/reject`, 
      { reason }
    );
    return response.data;
  } catch (error) {
    console.error('Error rejecting school:', {
      error: error.response?.data || error.message,
      verificationId
    });
    throw error;
  }
};
