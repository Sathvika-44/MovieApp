import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For better assertions
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./LoginForm";
import { signInWithGoogle, signInWithEmail } from "../firebase";

jest.mock('../firebase', () => ({
  signInWithEmail: jest.fn(),
  signInWithGoogle: jest.fn(),
}));


describe("LoginForm Component", () => {
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the LoginForm component correctly", () => {
    render(
      <Router>
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );

    const loginTextElements = screen.getAllByText('Login');
    expect(loginTextElements[0]).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    const googleLoginButton = screen.getAllByText("Login with Google");
    expect(googleLoginButton[0]).toBeInTheDocument();
    expect(screen.getByText(/Don't have the account/)).toBeInTheDocument();
  });

  test("calls handleEmailLogin on form submission with valid inputs", async () => {
    // Mock the signInWithEmail function to resolve with a user object
    signInWithEmail.mockResolvedValue({
      user: { email: "test@example.com" },
    });

    // Render the component with the mock callback
    render(
      <Router>
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      </Router>);

    // Simulate filling in the email and password
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.submit(screen.getByTestId("login-form"));

    // Wait for the async operation to complete
    await waitFor(() => expect(mockOnLoginSuccess).toHaveBeenCalledWith({
      user: { email: "test@example.com" },
    }));

    // Check that the mock callback was called with the correct data
    expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1);
    expect(mockOnLoginSuccess).toHaveBeenCalledWith({
      user: { email: "test@example.com" },
    });
  });



  test("displays error message on failed email login", async () => {
    const mockOnLoginSuccess = jest.fn();
    signInWithEmail.mockRejectedValue(new Error("Invalid email or password"));

    render(
      <Router>
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );

    // Simulate filling in the email and password
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "incorrectemail@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    // Simulate the form submission
    fireEvent.click(screen.getByTestId("login-button"));

    // Check for error message
    await screen.findByText(/invalid email or password/i);

    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  });


  test("calls handleGoogleLogin when Google login button is clicked", async () => {
    signInWithGoogle.mockResolvedValue({ user: { email: "googleuser@example.com" } });

    render(
      <Router>
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );

    fireEvent.click(screen.getByTestId("google-login-button"));

    await screen.findByRole("button", { name: /login with google/i });
    expect(signInWithGoogle).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(mockOnLoginSuccess).toHaveBeenCalledWith({
      user: { email: "googleuser@example.com" },
    }));
  });



  test("displays error message on failed Google login", async () => {
    signInWithGoogle.mockRejectedValue(new Error("Google login failed"));

    render(
      <Router>
        <LoginForm onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );

    fireEvent.click(screen.getByText("Login with Google"));

    await screen.findByText("Google login failed. Please try again.");
    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  });
});
