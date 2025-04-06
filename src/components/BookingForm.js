// src/BookingForm.js
import React, { useState } from 'react';

function BookingForm({ initialDate, availableTimes, bookTime, selectedDate, setSelectedDate, updateTimes, submitForm }) {
  const [formData, setFormData] = useState({
    date: selectedDate || initialDate,
    time: '',
    guests: '',
    occasion: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'guests') {
      newValue = value === '' ? '' : parseInt(value, 10);
    }
    setFormData({ ...formData, [name]: newValue });
    if (name === 'date') {
      setSelectedDate(newValue);
      updateTimes(newValue);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.date) tempErrors.date = 'Date is required';
    if (!formData.time) tempErrors.time = 'Time is required';
    if (formData.guests === '' || !formData.guests || formData.guests < 1 || formData.guests > 10)
      tempErrors.guests = 'Number of guests must be between 1 and 10';
    if (!formData.occasion) tempErrors.occasion = 'Occasion is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check HTML5 validity first
    const form = e.target;
    if (!form.checkValidity()) {
      // If HTML5 validation fails, trigger custom validation to show errors
      validateForm();
      return;
    }

    // If HTML5 validation passes, run custom validation
    if (validateForm()) {
      const success = submitForm(formData);
      if (success) {
        console.log('Reservation submitted:', formData);
        alert('Reservation successful! Redirecting to confirmation...');
        setFormData({
          ...formData,
          time: '',
          guests: '',
          occasion: '',
        });
        setErrors({});
      } else {
        alert('Failed to submit reservation. Please try again.');
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="booking-form" aria-label="Table reservation form">
      <h2>Book Your Table</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'grid', gap: '20px', maxWidth: '200px' }}
      >
        <div className="form-group">
          <label htmlFor="res-date">Choose Date:</label>
          <input
            type="date"
            id="res-date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today} // Prevent past dates
            required
            aria-required="true"
            aria-describedby="date-error"
          />
          {errors.date && (
            <span id="date-error" className="error" role="alert">
              {errors.date}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="res-time">Choose Time:</label>
          <select
            id="res-time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="time-error"
          >
            <option value="">Select a time</option>
            {availableTimes(formData.date).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && (
            <span id="time-error" className="error" role="alert">
              {errors.time}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of Guests:</label>
          <input
            type="number"
            id="guests"
            name="guests"
            placeholder="1"
            min="1" // Minimum 1 guest
            max="10" // Maximum 10 guests
            value={formData.guests}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="guests-error"
          />
          {errors.guests && (
            <span id="guests-error" className="error" role="alert">
              {errors.guests}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="occasion">Occasion:</label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="occasion-error"
          >
            <option value="">Select an occasion</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          {errors.occasion && (
            <span id="occasion-error" className="error" role="alert">
              {errors.occasion}
            </span>
          )}
        </div>

        <button type="submit" role="button" aria-label="Make Your Reservation">Make Your Reservation</button>
      </form>
    </section>
  );
}

export default BookingForm;
