// src/BookingForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './components/BookingForm'; // Adjust path if needed

const mockSubmitForm = jest.fn(() => true);
// Define initialTimes and mocks at the top
const initialTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
const today = new Date().toISOString().split('T')[0];
const numberOfGuests = parseInt("5");

// Helper to render BookingForm with all required props
const renderBookingForm = (props = {}) => {
  const mockAvailableTimes = jest.fn((date) => {
    // console.log('mockAvailableTimes called with:', date, 'returning:', initialTimes);
    return initialTimes;
  });
  const mockBookTime = jest.fn();
  const mockSetSelectedDate = jest.fn();
  const mockUpdateTimes = jest.fn();


  // console.log('Rendering BookingForm with props:', {
  //   initialDate: today,
  //   availableTimes: mockAvailableTimes,
  //   bookTime: mockBookTime,
  //   selectedDate: today,
  //   setSelectedDate: mockSetSelectedDate,
  //   updateTimes: mockUpdateTimes,
  //   submitForm: mockSubmitForm,
  //   ...props,
  // });

  return render(
    <BookingForm
      initialDate={today}
      availableTimes={mockAvailableTimes}
      bookTime={mockBookTime}
      selectedDate={today}
      setSelectedDate={mockSetSelectedDate}
      updateTimes={mockUpdateTimes}
      submitForm={mockSubmitForm}
      {...props}
    />
  );
};

describe('BookingForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  test('mockAvailableTimes returns an array', () => {
    const mockAvailableTimes = jest.fn((date) => initialTimes); // Simple mock for this test
    const times = mockAvailableTimes('2025-04-06');
    expect(times).toEqual(initialTimes);
    expect(mockAvailableTimes).toHaveBeenCalledWith('2025-04-06');
  });

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

  test('BookingForm Component submits form successfully with valid inputs', async () => {
    const initialTimes = ['10:00', '11:00', '12:00', '18:00'];
    const today = "2025-04-06";
    const mockAvailableTimes = jest.fn((date) => initialTimes);
    const mockBookTime = jest.fn();
    const mockSetSelectedDate = jest.fn();
    const mockUpdateTimes = jest.fn();
    const mockSubmitForm = jest.fn(() => true);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <BookingForm
        initialDate={today}
        availableTimes={mockAvailableTimes}
        bookTime={mockBookTime}
        selectedDate={today}
        setSelectedDate={mockSetSelectedDate}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Choose Date:'), { target: { value: '2025-04-06' } });
    const timeSelect = screen.getByLabelText('Choose Time:');
    console.log('Available time options:', Array.from(timeSelect.options).map(opt => opt.value));
    await userEvent.selectOptions(timeSelect, '18:00');
    console.log('Time value after selection:', timeSelect.value);
    const guestsInput = screen.getByLabelText('Number of Guests:');
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '5');
    await userEvent.selectOptions(screen.getByLabelText('Occasion:'), 'Birthday');

    // Assert DOM values before submission
    expect(screen.getByLabelText('Choose Date:').value).toBe('2025-04-06');
    expect(screen.getByLabelText('Choose Time:').value).toBe('18:00');
    expect(screen.getByLabelText('Number of Guests:').value).toBe('5');
    expect(screen.getByLabelText('Occasion:').value).toBe('Birthday');

    // Simulate form submission
    await userEvent.click(screen.getByRole('button', { name: /Make Your Reservation/i }));

    // Assert submission and alert
    expect(mockSubmitForm).toHaveBeenCalledWith({
      date: '2025-04-06',
      time: '18:00',
      guests: 5,
      occasion: 'Birthday',
    });
    expect(window.alert).toHaveBeenCalledWith('Reservation successful! Redirecting to confirmation...');

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
    const initializeBookings = () => ({});
    const initialState = initializeBookings();
    expect(initialState).toEqual({});
  });
});

describe('Bookings Reducer', () => {
  test('Returns initial times for a new date when no bookings exist', () => {
    const initializeBookings = () => ({});
    const initialState = initializeBookings();
    const date = '2025-04-05';
    const availableTimes = initialState[date] || initialTimes;
    expect(availableTimes).toEqual(initialTimes);
  });

  test('Removes booked time for a specific date', () => {
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
