import api from '../utils/axios'

export const createPaymentIntent = async (reservationId, amount) => {
  return api.post('/payments/create-payment-intent', {
    reservationId,
    amount: amount * 100 // Convert to cents
  });
};

export const createPaymentRecord = async (paymentData) => {
  return api.post('/payments', paymentData);
};