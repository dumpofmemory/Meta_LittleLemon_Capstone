// src/BookingPage.js (simplified)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import BookingSlot from './BookingSlot';
import { fetchAPI, submitAPI } from '../api';
// import '../styles/BookingForm.css';

function BookingPage({ bookings, dispatch }) {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookings[today]) {
      const times = fetchAPI(today);
      dispatch({ type: 'SET_TIMES', date: today, times });
    }
  }, [bookings, dispatch]);

  const updateTimes = (date) => {
    if (!bookings[date]) {
      const times = fetchAPI(date);
      dispatch({ type: 'SET_TIMES', date, times });
    }
  };

  const getAvailableTimes = (date) => {
    if (!bookings[date]) updateTimes(date);
    return bookings[date] || [];
  };

  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      dispatch({ type: 'BOOK_TIME', payload: { date: formData.date, time: formData.time } });
      navigate('/confirmed');
    }
    return success;
  };

  return (
    <main>
      <section>
        <h1>Reserve a Table at Little Lemon</h1>
        <BookingForm
          initialDate={today}
          availableTimes={getAvailableTimes}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          updateTimes={updateTimes}
          submitForm={submitForm}
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
