// src/pages/PaymentHistory.jsx
import { useEffect, useState } from 'react';
import PaymentService from '../api/paymentService';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Cookies are sent automatically!
        const data = await PaymentService.getPaymentHistory();
        setPayments(data);
      } catch (err) {
        console.error('Failed to fetch payments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h2>Payment History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {payments.map((payment) => (
            <li key={payment.id}>
              {payment.amount} - {payment.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};