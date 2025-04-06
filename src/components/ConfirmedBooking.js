// src/ConfirmedBooking.js
import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
      <section>
        <h1>Booking Confirmed!</h1>
        <p>Your reservation has been successfully confirmed. We look forward to welcoming you at Little Lemon!</p>
        <Link to="/reservations">Back to Booking</Link>
      </section>
  );
}

export default ConfirmedBooking;
