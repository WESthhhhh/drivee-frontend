// src/api/paymentService.js
import api from "../utils/axios";
const PaymentService = {
  // Create payment intent (matches backend route)
  createPaymentIntent: async (reservationId) => {
    const response = await api.post(
      '/create-payment-intent',
      { reservationId }
    );
    return response.data;
  },

  // Fetch payment history (matches backend route)
  getPaymentHistory: async () => {
    const response = await api.get('/history');
    return response.data;
  },
};

export default PaymentService;