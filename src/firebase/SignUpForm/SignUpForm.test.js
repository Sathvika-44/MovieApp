// SignUpForm.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";
import { signUpWithEmailAndPassword } from "../firebase";
import { MemoryRouter,useNavigate } from "react-router-dom";

// Mock the signUpWithEmailAndPassword function
jest.mock("../firebase", () => ({
    signUpWithEmailAndPassword: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock the useNavigate hook
  }));

describe("SignUpForm", () => {
    test("renders SignUp form with fields and submit button", () => {
        render(<MemoryRouter>
            <SignUpForm />
        </MemoryRouter>);

        // Check if the form elements are rendered
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Confirm your password/i)).toBeInTheDocument();
        expect(screen.getByText(/SignUp/i)).toBeInTheDocument();
    });

    test("displays an error when passwords do not match", async () => {
        render(<MemoryRouter>
            <SignUpForm />
        </MemoryRouter>);

        // Simulate filling in the form with mismatched passwords
        userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
        userEvent.type(screen.getByPlaceholderText(/Enter your password/i), "password123");
        userEvent.type(screen.getByPlaceholderText(/confirm your password/i), "password321");

        // Submit the form
        fireEvent.click(screen.getByText(/SignUp/i));

        // Check if error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Password and Confirm password are not same/i)).toBeInTheDocument();
        });
    });

    test("calls signUpWithEmailAndPassword and navigates to login on successful sign-up", async () => {
        const mockSignUp = jest.fn(() => Promise.resolve());
        const mockNavigate = jest.fn();
        jest.mock("../firebase", () => ({
            signUpWithEmailAndPassword: mockSignUp,
        }));
        useNavigate.mockReturnValue(mockNavigate);
        signUpWithEmailAndPassword.mockResolvedValue({ user: { email: "test@example.com" } });

        render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>
        );

        // Simulate user input for email, password, and confirmPassword
        userEvent.type(screen.getByTestId('email'), "test@example.com");
        userEvent.type(screen.getByTestId('password'), "password123");
        userEvent.type(screen.getByTestId('confirm-password'), "password123");
        userEvent.click(screen.getByRole('button', { name: /signUp/i }));

        await waitFor(() => {
            expect(signUpWithEmailAndPassword).toHaveBeenCalledWith("test@example.com", "password123");
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });  
    });


    test("displays error message when signUpWithEmailAndPassword fails", async () => {
        // Mock the signUpWithEmailAndPassword function to simulate failure
        const mockSignUp = jest.fn(() => Promise.reject(new Error("Failed to SignUp. Please try again.")));
        jest.mock("../firebase", () => ({
            signUpWithEmailAndPassword: mockSignUp,
        }));

        // Render the SignUpForm wrapped with MemoryRouter
        render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>
        );

        // Simulate user input for email, password, and confirmPassword
        userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
        userEvent.type(screen.getByPlaceholderText(/Enter your password/i), "password123");
        userEvent.type(screen.getByPlaceholderText(/confirm your password/i), "password123");

        // Simulate form submission
        fireEvent.click(screen.getByText(/signUp/i));

        await waitFor(() => {
            expect(screen.getByText(/Failed to SignUp. Please try again./i)).toBeInTheDocument();;
        });
    });
});
