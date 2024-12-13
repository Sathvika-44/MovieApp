import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { AppProvider } from "../../common/AppContext/AppContext"; // Mock the context provider
import "@testing-library/jest-dom";

jest.mock("../../firebase/LoginForm/LoginForm", () => (props) => (
    <div>
        <h2>Mock Login Form</h2>
        <button onClick={() => props.onLoginSuccess({ email: "test@example.com" })}>
            Mock Login
        </button>
    </div>
));

describe("Login Component", () => {
    beforeEach(() => {
        localStorage.clear(); // Clear localStorage before each test
    });

    test("renders the login form when no user is logged in", () => {
        render(
            <AppProvider>
                <Login />
            </AppProvider>
        );

        // Check if the login form is displayed
        expect(screen.getByText("Mock Login Form")).toBeInTheDocument();
        expect(screen.getByText("Mock Login")).toBeInTheDocument();
    });

    test("logs in successfully and displays user details", () => {
        render(
            <AppProvider>
                <Login />
            </AppProvider>
        );

        // Simulate login
        const loginButton = screen.getByText("Mock Login");
        fireEvent.click(loginButton);

        // Check if the user details are displayed after login
        expect(screen.getByText(/Welcome, test@example.com/i)).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    test("fetches and displays user bookings correctly", () => {
        // Mock bookings in localStorage
        const bookings = {
            "test@example.com": [
                { movie: "Avengers", date: "2024-12-12", seats: ["A1", "A2"] },
                { movie: "Batman", date: "2024-12-15", seats: ["B1", "B2"] },
            ],
        };
        localStorage.setItem("movieBookings", JSON.stringify(bookings));
        localStorage.setItem("currentUser", JSON.stringify({ email: "test@example.com" }));

        render(
            <AppProvider>
                <Login />
            </AppProvider>
        );

        // Check if bookings are displayed
        expect(screen.getByText(/Avengers/i)).toBeInTheDocument();
        expect(screen.getByText(/Date: 2024-12-12/i)).toBeInTheDocument();
        expect(screen.getByText(/Seats: A1, A2/i)).toBeInTheDocument();
        expect(screen.getByText(/Batman/i)).toBeInTheDocument();
        expect(screen.getByText(/Date: 2024-12-15/i)).toBeInTheDocument();
        expect(screen.getByText(/Seats: B1, B2/i)).toBeInTheDocument();
    });

    test("displays a message when no bookings are found", () => {
        localStorage.setItem("currentUser", JSON.stringify({ email: "test@example.com" }));

        render(
            <AppProvider>
                <Login />
            </AppProvider>
        );

        // Check for no bookings message
        expect(screen.getByText("No bookings found.")).toBeInTheDocument();
    });

    test("logs out successfully and displays login form again", () => {
        localStorage.setItem("currentUser", JSON.stringify({ email: "test@example.com" }));

        render(
            <AppProvider>
                <Login />
            </AppProvider>
        );

        // Check if user details are displayed initially
        expect(screen.getByText(/Welcome, test@example.com/i)).toBeInTheDocument();

        // Simulate logout
        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);

        // Check if the login form is displayed again
        expect(screen.getByText("Mock Login Form")).toBeInTheDocument();
    });
});
