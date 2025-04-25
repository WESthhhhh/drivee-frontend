import api from "../utils/axios";


export const verifySchool = async (schoolId) => {
  try {
    const response = await api.patch(`/verifications/${schoolId}/verify`);
    return response.data;
  } catch (error) {
    console.error('Error verifying school:', error);
    throw error;
  }
};

export const rejectSchool = async (schoolId, reason) => {
  try {
    const response = await api.patch(`/verifications/${schoolId}/reject`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error rejecting school:', error);
    throw error;
  }
};