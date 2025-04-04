// components/Book.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Book from './components/Book';

describe('Book Component', () => {
  test('renders booking form', () => {
    render(<Book />);
    expect(screen.getByLabelText('Date:')).toBeInTheDocument();
    expect(screen.getByLabelText('Time:')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Guests:')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone:')).toBeInTheDocument();
  });

  test('shows validation errors for empty form submission', async () => {
    render(<Book />);
    fireEvent.click(screen.getByText('Book Now'));

    expect(await screen.findByText('Date is required')).toBeInTheDocument();
    expect(await screen.findByText('Time is required')).toBeInTheDocument();
    expect(await screen.findByText('Number of guests must be between 1 and 20')).toBeInTheDocument();
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Valid email is required')).toBeInTheDocument();
    expect(await screen.findByText('Valid 10-digit phone number is required')).toBeInTheDocument();
  });

  test('shows validation errors for invalid inputs', async () => {
    render(<Book />);
    const user = userEvent.setup();

    await user.type(screen.getByTestId('guests-input'), '21'); // Invalid guest count
    await user.type(screen.getByTestId('email-input'), 'invalid-email'); // Invalid email
    await user.type(screen.getByTestId('phone-input'), '123'); // Invalid phone
    await user.click(screen.getByTestId('submit-button'));

    expect(screen.getByTestId('guests-error')).toHaveTextContent('Number of guests must be between 1 and 20');
    expect(screen.getByTestId('email-error')).toHaveTextContent('Valid email is required');
    expect(screen.getByTestId('phone-error')).toHaveTextContent('Valid 10-digit phone number is required');
  });

  test('submits form successfully with valid inputs', async () => {
    render(<Book />);
    const user = userEvent.setup();

    // Mock alert to verify submission
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    await user.type(screen.getByTestId('date-input'), '2023-11-15');
    await user.type(screen.getByTestId('time-input'), '18:00');
    await user.type(screen.getByTestId('guests-input'), '5');
    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.type(screen.getByTestId('phone-input'), '1234567890');

    await user.click(screen.getByTestId('submit-button'));

    expect(window.alert).toHaveBeenCalledWith('Booking successful!');

    // Verify form fields are cleared
    expect(screen.getByTestId('date-input')).toHaveValue('');
    expect(screen.getByTestId('time-input')).toHaveValue('');
    expect(screen.getByTestId('guests-input')).toHaveValue(null); // Number input clears to null
    expect(screen.getByTestId('name-input')).toHaveValue('');
    expect(screen.getByTestId('email-input')).toHaveValue('');
    expect(screen.getByTestId('phone-input')).toHaveValue('');

    // Restore alert mock
    window.alert.mockRestore();
  });

  test('navigates through form fields with keyboard', async () => {
    render(<Book />);
    const user = userEvent.setup();

    const dateInput = screen.getByTestId('date-input');
    const timeInput = screen.getByTestId('time-input');
    const submitButton = screen.getByTestId('submit-button');

    await user.tab(); // Focus on date input
    expect(dateInput).toHaveFocus();

    await user.tab(); // Focus on time input
    expect(timeInput).toHaveFocus();

    // Tab through other fields...
    await user.tab(); // Guests input
    await user.tab(); // Name input
    await user.tab(); // Email input
    await user.tab(); // Phone input
    await user.tab(); // Submit button
    expect(submitButton).toHaveFocus();

    // Submit with Enter key
    await user.type(submitButton, '{enter}');
    expect(screen.getByTestId('date-error')).toHaveTextContent('Date is required');
  });

  test('dismisses error message after correcting invalid input', async () => {
    render(<Book />);
    const user = userEvent.setup();

    // Trigger error for guests
    await user.type(screen.getByTestId('guests-input'), '21');
    await user.click(screen.getByTestId('submit-button'));
    expect(screen.getByTestId('guests-error')).toHaveTextContent('Number of guests must be between 1 and 20');

    // Correct the input
    await user.clear(screen.getByTestId('guests-input'));
    await user.type(screen.getByTestId('guests-input'), '5');
    await user.click(screen.getByTestId('submit-button'));
    expect(screen.queryByTestId('guests-error')).not.toBeInTheDocument();
  });
});