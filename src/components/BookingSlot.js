import React from 'react';

function BookingSlot({ time, isAvailable }) {
  return (
    <li>
      {time} - {isAvailable ? 'Available' : 'Booked'}
    </li>
  );
}

export default BookingSlot;
