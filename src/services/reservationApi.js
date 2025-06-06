const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createReservation = async (reservationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...reservationData,
        price: parseFloat(reservationData.price) // Convert string to number
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create reservation');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

export const fetchUserReservations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations/my-reservations`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user reservations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};