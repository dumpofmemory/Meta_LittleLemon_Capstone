// components/Reservations.js
import React, { useState } from 'react';

function Reservations() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.date) tempErrors.date = "Date is required";
    if (!formData.time) tempErrors.time = "Time is required";
    if (!formData.guests || formData.guests < 1 || formData.guests > 20) 
      tempErrors.guests = "Number of guests must be between 1 and 20";
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) 
      tempErrors.email = "Valid email is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) 
      tempErrors.phone = "Valid 10-digit phone number is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the booking data to a server
      console.log("Booking submitted:", formData);
      alert("Booking successful!");
      setFormData({ date: '', time: '', guests: '', name: '', email: '', phone: '' });
    }
  };

  return (
    <main>
      <section className="booking-form" aria-label="Table booking form">
        <h2>Book a Table</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              data-testid="date-input"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="date-error"
            />
            {errors.date && <span data-testid="date-error" id="date-error" className="error" role="alert">{errors.date}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              data-testid="time-input"
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="time-error"
            />
            {errors.time && <span id="time-error" className="error" role="alert">{errors.time}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="guests">Number of Guests:</label>
            <input
              data-testid="guests-input"
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              max="20"
              required
              aria-required="true"
              aria-describedby="guests-error"
            />
            {errors.guests && <span data-testid="guests-error" id="guests-error" className="error" role="alert">{errors.guests}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              data-testid="name-input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="name-error"
            />
            {errors.name && <span id="name-error" className="error" role="alert">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              data-testid="email-input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="email-error"
            />
            {errors.email && <span data-testid="email-error" id="email-error" className="error" role="alert">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              data-testid="phone-input"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="phone-error"
            />
            {errors.phone && <span data-testid="phone-error" id="phone-error" className="error" role="alert">{errors.phone}</span>}
          </div>
          <button data-testid="submit-button" type="submit">Book Now</button>
        </form>
      </section>
    </main>
  );
}

export default Reservations;
