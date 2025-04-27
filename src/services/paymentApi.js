import api from '../utils/axios';

export const createPaymentIntent = async (reservationId, currency = 'mad') => {
  return api.post('/payments/create-intent', {
    reservationId,
    currency
  });
};

export const confirmCardPayment = async (paymentData) => {
  return api.post('/payments/confirm-card', paymentData);
};