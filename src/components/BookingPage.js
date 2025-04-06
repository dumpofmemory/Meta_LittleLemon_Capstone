// src/BookingPage.js
import React, { useReducer, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import BookingSlot from './BookingSlot';
import { fetchAPI, submitAPI } from '../api';
// import '../styles/BookingForm.css';

// Reducer for managing bookings by date
const bookingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMES':
      if (!state[action.date]) {
        return { ...state, [action.date]: action.times };
      }
      return state;
    case 'BOOK_TIME':
      const { date, time } = action.payload;
      const currentTimes = state[date] || [];
      const updatedTimes = currentTimes.filter((t) => t !== time);
      return { ...state, [date]: updatedTimes };
    case 'INITIALIZE':
      return action.payload; // Load initial state
    default:
      return state;
  }
};

// Initialize bookings state from localStorage or empty object
const initializeBookings = () => {
  const storedBookings = localStorage.getItem('bookings');
  return storedBookings ? JSON.parse(storedBookings) : {};
};

function BookingPage() {
  const [bookings, dispatch] = useReducer(bookingsReducer, null, initializeBookings);
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const navigate = useNavigate();

  // Load initial state and fetch times for today on mount
  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      dispatch({ type: 'INITIALIZE', payload: JSON.parse(storedBookings) });
    }
    initializeTimes(today);
  }, []);

  // Persist bookings to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Function to initialize times for a given date
  const initializeTimes = (date) => {
    const times = fetchAPI(date);
    dispatch({ type: 'SET_TIMES', date, times });
  };

  // Function to update times based on selected date
  const updateTimes = (date) => {
    if (!bookings[date]) {
      const times = fetchAPI(date);
      dispatch({ type: 'SET_TIMES', date, times });
    }
  };

  // Get available times for a given date
  const getAvailableTimes = (date) => {
    if (!bookings[date]) {
      updateTimes(date);
    }
    return bookings[date] || [];
  };

  // Book a time (kept for state update)
  const bookTime = (date, time, formData) => {
    const success = submitAPI(formData);
    if (success) {
      dispatch({ type: 'BOOK_TIME', payload: { date, time } });
      return true;
    }
    return false;
  };

  // Submit form and navigate on success
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
          bookTime={bookTime}
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
