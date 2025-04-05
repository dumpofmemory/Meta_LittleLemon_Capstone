import React, { useReducer, useState } from 'react';
import BookingForm from './BookingForm';
import BookingSlot from './BookingSlot';
// import '../styles/BookingForm.css';

const initialTimes = [
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

// Reducer for managing bookings by date
const bookingsReducer = (state, action) => {
  switch (action.type) {
    case 'BOOK_TIME':
      const { date, time } = action.payload;
      const currentTimes = state[date] || initialTimes;
      const updatedTimes = currentTimes.filter((t) => t !== time);
      return { ...state, [date]: updatedTimes };
    default:
      return state;
  }
};

// Initialize bookings state (empty initially)
const initializeBookings = () => ({});

function BookingPage() {
  const [bookings, dispatch] = useReducer(bookingsReducer, null, initializeBookings);
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  // Get available times for a given date
  const getAvailableTimes = (date) => {
    return bookings[date] || initialTimes;
  };

  const bookTime = (date, time) => {
    dispatch({ type: 'BOOK_TIME', payload: { date, time } });
  };

  return (
    <main>
      <section>
        <h1>Reserve a Table at Little Lemon</h1>
        <BookingForm
          initialDate={today}
          availableTimes={getAvailableTimes}
          bookTime={bookTime}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <h2>Available Slots for {selectedDate}</h2>
        <ul>
          {getAvailableTimes(selectedDate).length > 0 ? (
            getAvailableTimes(selectedDate).map((time) => (
              <BookingSlot key={time} time={time} isAvailable={true} />
            ))
          ) : (
            <li>No available slots for this date</li>
          )}
        </ul>
      </section>
    </main>
  );
}

export default BookingPage;
