import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { useAppContext } from '../../common/AppContext/AppContext';

// Mocking AppContext and navigation
jest.mock('../../common/AppContext/AppContext', () => ({
    useAppContext: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Header Component', () => {
    let mockSetTerm, mockNavigate;

    beforeEach(() => {
        mockSetTerm = jest.fn();
        mockNavigate = jest.fn();
        useAppContext.mockReturnValue({
            currentUser: null,
            setTerm: mockSetTerm,
        });
        jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the header with default elements', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText('MovieApp')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search Movies Or Shows')).toBeInTheDocument();
        expect(screen.getByText('SignUp')).toBeInTheDocument();
        expect(screen.getByText('LogIn')).toBeInTheDocument();
    });

    test('navigates to signup when SignUp is clicked', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('SignUp'));
        expect(mockNavigate).toHaveBeenCalledWith('/signup');
    });

    test('navigates to login when LogIn is clicked', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('LogIn'));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('alerts on empty search term submission', () => {
        window.alert = jest.fn();

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId('search-button'));
        expect(window.alert).toHaveBeenCalledWith('Please enter search term');
    });

    test('updates the term in context when a search is performed', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const inputField = screen.getByPlaceholderText('Search Movies Or Shows');
        fireEvent.change(inputField, { target: { value: 'Inception' } });

        fireEvent.click(screen.getByTestId('search-button'));
        expect(mockSetTerm).toHaveBeenCalledWith('Inception');
    });

    test('renders user image when logged in', () => {
        useAppContext.mockReturnValue({
            currentUser: { email: 'test@example.com' },
            setTerm: mockSetTerm,
        });

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByAltText('user')).toBeInTheDocument();
    });

    test('navigates to login when user image is clicked', () => {
        useAppContext.mockReturnValue({
            currentUser: { email: 'test@example.com' },
            setTerm: mockSetTerm,
        });

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByAltText('user'));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});





// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter,useNavigate } from 'react-router-dom';
// import Header from './Header';
// import { useAppContext } from '../../common/AppContext/AppContext';
// import { useDispatch } from 'react-redux';
// import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/slice';

// // Mocking useAppContext
// jest.mock('../../common/AppContext/AppContext', () => ({
//   useAppContext: jest.fn()
// }));

// // Mocking Redux's useDispatch and the async movie/show actions
// jest.mock('react-redux', () => ({
//   useDispatch: jest.fn(),
// }));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(), // Mock the useNavigate hook
// }));

// jest.mock('../../features/movies/slice', () => ({
//   fetchAsyncMovies: jest.fn(),
//   fetchAsyncShows: jest.fn(),
// }));

// describe('Header Component', () => {
//   beforeEach(() => {
//     // Clear mocks before each test
//     useAppContext.mockClear();
//     useDispatch.mockClear();
//     fetchAsyncMovies.mockClear();
//     fetchAsyncShows.mockClear();
//   });

//   test('renders without crashing when user is not logged in', () => {
//     useAppContext.mockReturnValue({
//       currentUser: null,
//     });

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );

//     expect(screen.getByText(/SignUp/)).toBeInTheDocument();
//     expect(screen.getByText(/LogIn/)).toBeInTheDocument();
//   });

//   test('renders user image when user is logged in', () => {
//     useAppContext.mockReturnValue({
//       currentUser: { email: 'test@example.com' },
//     });

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );

//     const userImage = screen.getByAltText('user');
//     expect(userImage).toBeInTheDocument();
//   });

//   test('navigates to login when user image is clicked', () => {
//     const navigate = jest.fn(); // Create a mock navigate function
//     useNavigate.mockReturnValue(navigate); 
//     useAppContext.mockReturnValue({
//       currentUser: { email: 'test@example.com' }, // Mock logged-in user
//     });
  
//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );
//     // Simulate clicking on the user image
//     const userImage = screen.getByAltText('user');
//     fireEvent.click(userImage);
  
//     // Check if navigation happened to the login page by checking the URL
//     expect(navigate).toHaveBeenCalledWith('/login');
//   });

//   test('handles search correctly', () => {
//     useAppContext.mockReturnValue({
//       currentUser: null,
//     });

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );

//     const inputField = screen.getByTestId('search-button');
//     fireEvent.change(inputField, { target: { value: 'Inception' } });

//     const submitButton = screen.getByRole('button');
//     fireEvent.click(submitButton);

//     // Check if search action is dispatched or if any effect happens
//     // For example, you might check for a console log, network call, or component state change
//   });

//   test('renders sign-up and login buttons when user is not logged in', () => {
//     useAppContext.mockReturnValue({ currentUser: null });

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );

//     expect(screen.getByText(/SignUp/)).toBeInTheDocument();
//     expect(screen.getByText(/LogIn/)).toBeInTheDocument();
//   });

//   test('navigates to the login page when "LogIn" is clicked', () => {
//     const navigate = jest.fn(); // Create a mock function for navigate
//     useNavigate.mockReturnValue(navigate); // Return the mock navigate function

//     useAppContext.mockReturnValue({
//       currentUser: null,
//     });
    
//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );
//     const signUpLink = screen.getByText('SignUp');

//     fireEvent.click(signUpLink);

//     expect(navigate).toHaveBeenCalledWith('/signup');
//   });

//   test('navigates to the sign-up page when "SignUp" is clicked', () => {
//     const navigate = jest.fn(); // Create a mock function for navigate
//     useNavigate.mockReturnValue(navigate); // Return the mock navigate function

//     useAppContext.mockReturnValue({
//       currentUser: null,
//     });

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );
//     const signUpLink = screen.getByText('SignUp');

//     fireEvent.click(signUpLink);

//     expect(navigate).toHaveBeenCalledWith('/signup');
//   });

//   test('performs search when a term is entered and search button is clicked', async () => {
//     const dispatch = jest.fn();
//     useDispatch.mockReturnValue(dispatch);
//     useAppContext.mockReturnValue({ currentUser: null });

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );

//     const inputField = screen.getByPlaceholderText(/Search Movies Or Shows/i);
//     fireEvent.change(inputField, { target: { value: 'Inception' } });

//     const submitButton = screen.getByRole('button');
//     fireEvent.click(submitButton);

//     // Check if the dispatch function was called with the correct parameters
//     await waitFor(() => {
//       expect(dispatch).toHaveBeenCalledTimes(2); // For both movies and shows
//       expect(fetchAsyncMovies).toHaveBeenCalledWith('Inception');
//       expect(fetchAsyncShows).toHaveBeenCalledWith('Inception');
//     });
//   });

//   test('alerts if search term is empty when the search button is clicked', () => {
//     useDispatch.mockReturnValue(jest.fn());
//     useAppContext.mockReturnValue({ currentUser: null });
  
//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );
  
//     const submitButton =  screen.getByTestId('search-button');
//     window.alert = jest.fn(); // Mock window.alert
  
//     fireEvent.click(submitButton);
  
//     // Check if alert was called when no search term is provided
//     expect(window.alert).toHaveBeenCalledWith('Please enter search term');
//   });  
// });


