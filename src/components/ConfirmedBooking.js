// src/ConfirmedBooking.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ConfirmedBooking.css';

function ConfirmedBooking() {
  return (
      <section className="confirmation-section">
        <h1>Booking Confirmed!</h1>
        <p>
            Your reservation request has been successfully submitted.
            We look forward to welcoming you at Little Lemon!
        </p>
        <Link to="/reservations">Book Another Table</Link>
      </section>
  );
}

export default ConfirmedBooking;
