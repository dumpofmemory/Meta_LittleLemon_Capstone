import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './components/BookingForm';

// Mock functions and initial data for testing
const initialTimes = [
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];
const today = new Date().toISOString().split('T')[0];
const mockAvailableTimes = (date) => initialTimes;
const mockBookTime = jest.fn();
const mockSetSelectedDate = jest.fn();

// Mock initializeBookings and bookingsReducer
const initializeBookings = () => ({});
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

// Helper to render BookingForm with default props
const renderBookingForm = (props = {}) => {
  return render(
    <BookingForm
      initialDate={today}
      availableTimes={mockAvailableTimes}
      bookTime={mockBookTime}
      selectedDate={today}
      setSelectedDate={mockSetSelectedDate}
      {...props}
    />
  );
};

describe('BookingForm Component', () => {
  test('Renders the BookingForm heading', () => {
    renderBookingForm();
    const headingElement = screen.getByText('Book Your Table');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders booking form fields', () => {
    renderBookingForm();
    expect(screen.getByLabelText('Choose Date:')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose Time:')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Guests:')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion:')).toBeInTheDocument();
  });

  test('shows validation errors for empty form submission', async () => {
    renderBookingForm();
    const user = userEvent.setup();

    await user.clear(screen.getByLabelText('Choose Date:'));
    fireEvent.click(screen.getByText('Make Your Reservation'));

    expect(await screen.findByText('Date is required')).toBeInTheDocument();
    expect(await screen.findByText('Time is required')).toBeInTheDocument();
    expect(await screen.findByText('Number of guests must be between 1 and 10')).toBeInTheDocument();
    expect(await screen.findByText('Occasion is required')).toBeInTheDocument();
  });

  test('shows validation errors for invalid inputs', async () => {
    renderBookingForm();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Number of Guests:'), '11');
    await user.click(screen.getByText('Make Your Reservation'));

    expect(screen.getByText('Number of guests must be between 1 and 10')).toBeInTheDocument();
  });

  test('submits form successfully with valid inputs', async () => {
    renderBookingForm();
    const user = userEvent.setup();

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Clear and set date to ensure correct input
    const dateInput = screen.getByLabelText('Choose Date:');
    await user.clear(dateInput);
    await user.type(dateInput, '2025-04-06');
    await user.selectOptions(screen.getByLabelText('Choose Time:'), '18:00');
    await user.type(screen.getByLabelText('Number of Guests:'), '5');
    await user.selectOptions(screen.getByLabelText('Occasion:'), 'Birthday');

    await user.click(screen.getByText('Make Your Reservation'));

    expect(mockBookTime).toHaveBeenCalledWith('2025-04-06', '18:00');
    expect(window.alert).toHaveBeenCalledWith('Reservation successful!');
    expect(screen.getByLabelText('Choose Date:')).toHaveValue(today);
    expect(screen.getByLabelText('Choose Time:')).toHaveValue('');
    expect(screen.getByLabelText('Number of Guests:')).toHaveValue(null);
    expect(screen.getByLabelText('Occasion:')).toHaveValue('');

    window.alert.mockRestore();
  });

  test('navigates through form fields with keyboard', async () => {
    renderBookingForm();
    const user = userEvent.setup();

    const dateInput = screen.getByLabelText('Choose Date:');
    const timeInput = screen.getByLabelText('Choose Time:');
    const guestsInput = screen.getByLabelText('Number of Guests:');
    const occasionInput = screen.getByLabelText('Occasion:');
    const submitButton = screen.getByText('Make Your Reservation');

    await user.tab();
    expect(dateInput).toHaveFocus();

    await user.tab();
    expect(timeInput).toHaveFocus();

    await user.tab();
    expect(guestsInput).toHaveFocus();

    await user.tab();
    expect(occasionInput).toHaveFocus();

    await user.tab();
    expect(submitButton).toHaveFocus();

    await user.type(submitButton, '{enter}');
    expect(await screen.findByText('Time is required')).toBeInTheDocument();
  });

  test('dismisses error message after correcting invalid input', async () => {
    renderBookingForm();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Number of Guests:'), '11');
    await user.click(screen.getByText('Make Your Reservation'));
    expect(screen.getByText('Number of guests must be between 1 and 10')).toBeInTheDocument();

    await user.clear(screen.getByLabelText('Number of Guests:'));
    await user.type(screen.getByLabelText('Number of Guests:'), '5');
    await user.click(screen.getByText('Make Your Reservation'));
    expect(screen.queryByText('Number of guests must be between 1 and 10')).not.toBeInTheDocument();
  });
});

describe('Bookings Initialization', () => {
  test('initializeBookings returns an empty object', () => {
    const initialState = initializeBookings();
    expect(initialState).toEqual({});
  });
});

describe('Bookings Reducer', () => {
  test('Returns initial times for a new date when no bookings exist', () => {
    const initialState = initializeBookings();
    const date = '2025-04-05';
    const availableTimes = initialState[date] || initialTimes;
    expect(availableTimes).toEqual(initialTimes);
  });

  test('Removes booked time for a specific date', () => {
    const initialState = initializeBookings();
    const date = '2025-04-05';
    const timeToBook = '18:00';
    const newState = bookingsReducer(initialState, {
      type: 'BOOK_TIME',
      payload: { date, time: timeToBook },
    });
    const updatedTimes = newState[date];
    expect(updatedTimes).toEqual(initialTimes.filter((t) => t !== timeToBook));
    expect(updatedTimes).not.toContain(timeToBook);
  });
});
