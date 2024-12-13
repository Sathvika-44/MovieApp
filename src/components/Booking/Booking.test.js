import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Booking from './Booking';
import { useAppContext } from '../../common/AppContext/AppContext';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock the useAppContext hook to simulate different user states
jest.mock('../../common/AppContext/AppContext', () => ({
    useAppContext: jest.fn(),
}));

describe('Booking Component', () => {
    const mockCurrentUser = { email: 'testuser@example.com' };
    const mockData = { Title: 'Test Movie' };

    beforeEach(() => {
        localStorage.clear();
    });

    test('renders Book Ticket button when user is logged in', async () => {
        // Mock useAppContext to return a logged-in user
        useAppContext.mockReturnValue({
            currentUser: mockCurrentUser,
        });

        render(<Booking data={mockData} />);

        const bookTicketButton = await waitFor(() => screen.getByRole('button', { name: /book ticket/i }));
        expect(bookTicketButton).toBeInTheDocument();
    });

    test('does not render Book Ticket button when user is not logged in', () => {
        // Mock useAppContext to return no currentUser (logged out state)
        useAppContext.mockReturnValue({
            currentUser: null,
        });

        render(<Booking data={mockData} />);

        const bookTicketButton = screen.queryByRole('button', { name: /book ticket/i });
        expect(bookTicketButton).not.toBeInTheDocument();
    });

    test('opens booking modal when Book Ticket button is clicked', () => {
        // Mock useAppContext to return a logged-in user
        useAppContext.mockReturnValue({
            currentUser: mockCurrentUser,
        });

        render(<Booking data={mockData} />);

        const bookTicketButton = screen.getByRole('button', { name: /book ticket/i });
        fireEvent.click(bookTicketButton);

        expect(screen.getByText(/book tickets for test movie/i)).toBeInTheDocument();
    });

    test('does not allow booking without selecting a date and seat', () => {
        // Mock useAppContext to return a logged-in user
        useAppContext.mockReturnValue({
            currentUser: mockCurrentUser,
        });

        render(<Booking data={mockData} />);

        const bookTicketButton = screen.getByRole('button', { name: /book ticket/i });
        fireEvent.click(bookTicketButton);

        const confirmButton = screen.getByRole('button', { name: /confirm booking/i });
        fireEvent.click(confirmButton);

        expect(screen.getByText(/please select a date and at least one seat/i)).toBeInTheDocument();
    });

    test('books seats and saves to localStorage', () => {
        // Mock useAppContext to return a logged-in user
        useAppContext.mockReturnValue({
            currentUser: mockCurrentUser,
        });

        render(<Booking data={mockData} />);

        const bookTicketButton = screen.getByRole('button', { name: /book ticket/i });
        fireEvent.click(bookTicketButton);

        const dateInput = screen.getByLabelText(/select date/i);
        fireEvent.change(dateInput, { target: { value: '2024-12-12' } });

        const seat = screen.getByText('1');
        fireEvent.click(seat);

        const confirmButton = screen.getByRole('button', { name: /confirm booking/i });
        fireEvent.click(confirmButton);

        expect(
            JSON.parse(localStorage.getItem('movieBookings'))
        ).toEqual({
            'testuser@example.com': [
                {
                    movie: 'Test Movie',
                    date: '2024-12-12',
                    seats: [1],
                },
            ],
        });

        expect(
            screen.queryByText(/book tickets for test movie/i)
        ).not.toBeInTheDocument(); // Modal should close
    });

    test('prevents selecting already booked seats', () => {
        localStorage.setItem(
            'movieBookings',
            JSON.stringify({
                'testuser@example.com': [
                    {
                        movie: 'Test Movie',
                        date: '2024-12-12',
                        seats: [1, 2],
                    },
                ],
            })
        );

        // Mock useAppContext to return a logged-in user
        useAppContext.mockReturnValue({
            currentUser: mockCurrentUser,
        });

        render(<Booking data={mockData} />);

        const bookTicketButton = screen.getByRole('button', { name: /book ticket/i });
        fireEvent.click(bookTicketButton);

        const dateInput = screen.getByLabelText(/select date/i);
        fireEvent.change(dateInput, { target: { value: '2024-12-12' } });

        const seat = screen.getByText('1');
        fireEvent.click(seat);

        expect(screen.getByRole('alert')).toHaveTextContent(/seat 1 is already booked/i);
    });
});
