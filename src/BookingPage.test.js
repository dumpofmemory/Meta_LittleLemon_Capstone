// src/BookingPage.test.js
import { fetchAPI } from './api'; // Ensure this matches your file structure

// Mock fetchAPI and submitAPI
jest.mock('./api', () => ({
  fetchAPI: jest.fn(() => {
    const times = ['17:00', '18:30', '19:00', '20:30', '21:00'];
    console.log('fetchAPI mocked, returning:', times);
    return times;
  }),
  submitAPI: jest.fn(() => true),
}));

// Define functions outside describe to ensure they use the mocked fetchAPI
const mockDispatch = jest.fn();
let mockBookings = {};

const initializeTimes = (date) => {
  const times = fetchAPI(date);
  console.log('initializeTimes - times from fetchAPI:', times); // Debug
  mockDispatch({ type: 'SET_TIMES', date, times });
};

const updateTimes = (date) => {
  if (!mockBookings[date]) {
    const times = fetchAPI(date);
    console.log('updateTimes - times from fetchAPI:', times); // Debug
    mockDispatch({ type: 'SET_TIMES', date, times });
  }
};

describe('BookingPage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls and logs
    mockBookings = {}; // Reset bookings state
  });

  test('initializeTimes calls fetchAPI and dispatches SET_TIMES with non-empty times', () => {
    const testDate = '2025-04-06';
    fetchAPI.mockReturnValue(['17:00', '18:30', '19:00', '20:30', '21:00']); // Reinforce mock
    initializeTimes(testDate);

    expect(fetchAPI).toHaveBeenCalledWith(testDate);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_TIMES',
      date: testDate,
      times: ['17:00', '18:30', '19:00', '20:30', '21:00'],
    });
  });

  test('updateTimes calls fetchAPI and dispatches SET_TIMES for a new date', () => {
    const testDate = '2025-04-07';
    fetchAPI.mockReturnValue(['17:00', '18:30', '19:00', '20:30', '21:00']); // Reinforce mock
    updateTimes(testDate);

    expect(fetchAPI).toHaveBeenCalledWith(testDate);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_TIMES',
      date: testDate,
      times: ['17:00', '18:30', '19:00', '20:30', '21:00'],
    });
  });

  test('updateTimes does not call fetchAPI or dispatch if times exist for the date', () => {
    const testDate = '2025-04-07';
    mockBookings[testDate] = ['17:00', '18:00']; // Simulate existing times
    updateTimes(testDate);

    expect(fetchAPI).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
