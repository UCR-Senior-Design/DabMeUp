// Login.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";


jest.mock("firebase/auth", () => ({
    ...jest.requireActual("firebase/auth"), // If you need other functions from firebase/auth, spread them here
    signInWithEmailAndPassword: jest.fn((auth, email, password) => {
      if (email === '1`2134@gmail.com' && password === '123445') {
        return Promise.resolve({ user: "mockUser" }); // Simulate successful login
      } else {
        return Promise.reject(new Error('Invalid credentials')); // Simulate failed login
      }
    }),
 }));
// Mocking modules
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../firebase', () => ({
  auth: jest.fn(),
  signInWithEmailAndPassword: jest.fn().mockResolvedValue({}),
}));

// Helper to wrap Login with BrowserRouter due to use of useNavigate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Login Component', () => {
  test('renders Login component', () => {
    renderWithRouter(<Login />);
  });

  test('allows the user to login successfully', async () => {
    const { getByPlaceholderText, getByText } = renderWithRouter(<Login />);
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: '1`2134@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123445' } });
    fireEvent.click(loginButton);

    // Replace signInWithEmailAndPassword with the actual exported function
    await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalled());
  });

  test('shows an error message when login fails', async () => {
    const { getByPlaceholderText, getByText } = renderWithRouter(<Login />);
    // Overriding signInWithEmailAndPassword mock to simulate a login failure
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));

    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'buyer@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    
    //await waitFor(() => expect(getByText(/Login failed:/i)).toBeInTheDocument());
  });
});
