import api from '../utils/axios';

export const createPaymentIntent = async (reservationId, currency, paymentMethod) => {
    return api.post('/payments/create-payment-intent', {
      reservationId,
      currency,
      paymentMethod
    });
  };

export const confirmCardPayment = async (paymentData) => {
  return api.post('/payments/confirm-card', paymentData);
};