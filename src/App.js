// App.js
import React, { useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Main from './components/Main';
import About from './components/About';
import Menu from './components/Menu';
import BookingPage from './components/BookingPage';
import OrderOnline from './components/OrderOnline';
import Login from './components/Login';
import Footer from './components/Footer';
import ConfirmedBooking from './components/ConfirmedBooking';

const bookingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMES':
      if (!state[action.date]) return { ...state, [action.date]: action.times };
      return state;
    case 'BOOK_TIME':
      const { date, time } = action.payload;
      const currentTimes = state[date] || [];
      const updatedTimes = currentTimes.filter((t) => t !== time);
      return { ...state, [date]: updatedTimes };
    default:
      return state;
  }
};

const initializeBookings = () => ({});

function App() {
  const [bookings, dispatch] = useReducer(bookingsReducer, null, initializeBookings);

  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<BookingPage bookings={bookings} dispatch={dispatch} />} />
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
