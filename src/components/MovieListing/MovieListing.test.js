import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieListing from './MovieListing';
import { useFetchMovies, useFetchShows } from '../../reactQuery/ReactQuery';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../reactQuery/ReactQuery', () => ({
  useFetchMovies: jest.fn(),
  useFetchShows: jest.fn(),
}));

jest.mock('react-slick', () => {
  return ({ children }) => <div>{children}</div>; // Mock the slider as a simple wrapper
});

describe('MovieListing Component', () => {
  // Test the loading state
  test('renders loading state for movies and shows', () => {
    useFetchMovies.mockReturnValue({ data: null, isLoading: true, error: null });
    useFetchShows.mockReturnValue({ data: null, isLoading: true, error: null });

    render(
      <BrowserRouter>
        <MovieListing searchTerm="action" />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading Movies...')).toBeInTheDocument();
    expect(screen.getByText('Loading Shows...')).toBeInTheDocument();
  });

  // Test when no movies are found
  test('renders no movies found message', () => {
    useFetchMovies.mockReturnValue({ data: [], isLoading: false, error: null });
    useFetchShows.mockReturnValue({ data: [], isLoading: false, error: null });

    render(
      <BrowserRouter>
        <MovieListing searchTerm="action" />
      </BrowserRouter>
    );

    expect(screen.getByText('No movies found')).toBeInTheDocument();
  });

  // Test when no shows are found
  test('renders no shows found message', () => {
    useFetchMovies.mockReturnValue({ data: [{ title: 'Movie 1' }], isLoading: false, error: null });
    useFetchShows.mockReturnValue({ data: [], isLoading: false, error: null });

    render(
      <BrowserRouter>
        <MovieListing searchTerm="action" />
      </BrowserRouter>
    );
    expect(screen.getByText('No shows found')).toBeInTheDocument();
  });
  
  test('renders movie cards when movies are found', () => {
    const mockMovies = [
      { Title: 'Movie 1', imdbID: '1', Poster: 'poster1.jpg', Year: '2021' },
      { Title: 'Movie 2', imdbID: '2', Poster: 'poster2.jpg', Year: '2022' },
    ];

    useFetchMovies.mockReturnValue({ data: mockMovies, isLoading: false, error: null });
    useFetchShows.mockReturnValue({ data: [], isLoading: false, error: null });

    render(
      <BrowserRouter>
        <MovieListing searchTerm="action" />
      </BrowserRouter>
    );

    // Check if the movie titles are rendered correctly
    expect(screen.getByText(/Movie 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Movie 2/i)).toBeInTheDocument();
  });

  test('renders show cards when shows are found', () => {
    const mockShows = [
      { Title: 'Show 1', imdbID: '1', Poster: 'poster1.jpg', Year: '2021' },
      { Title: 'Show 2', imdbID: '2', Poster: 'poster2.jpg', Year: '2022' },
    ];

    useFetchMovies.mockReturnValue({ data: [], isLoading: false, error: null });
    useFetchShows.mockReturnValue({ data: mockShows, isLoading: false, error: null });

    render(
      <BrowserRouter>
        <MovieListing searchTerm="action" />
      </BrowserRouter>
    );

    // Check if the show titles are rendered correctly
    expect(screen.getByText(/Show 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Show 2/i)).toBeInTheDocument();
  });
  
});





// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter
// import MovieListing from './MovieListing';
// import movieReducer from '../../features/movies/slice';

// // Mock the Slider component from react-slick
// jest.mock('react-slick', () => {
//   return ({ children }) => <div>{children}</div>; // Mock the slider as a simple wrapper
// });

// describe('MovieListing Component', () => {
//   // Create a mock store
//   const createStore = (movies, shows) => {
//     return configureStore({
//       reducer: {
//         movies: movieReducer,
//       },
//       preloadedState: {
//         movies: {
//           movies: movies || {},
//           shows: shows || {},
//           selectedMovieOrShow: {},
//           error: null,
//         },
//       },
//     });
//   };

//   test('should render movies correctly when Response is True', () => {
//     const mockMovies = {
//       Response: 'True',
//       Search: [
//         { Title: 'Movie 1', Year: '2020', imdbID: 'tt1234' },
//         { Title: 'Movie 2', Year: '2021', imdbID: 'tt5678' },
//       ],
//     };

//     const store = createStore(mockMovies);

//     render(
//       <Provider store={store}>
//         <Router> {/* Wrap the component with Router */}
//           <MovieListing />
//         </Router>
//       </Provider>
//     );

//     // Assert that the Movie Cards are rendered correctly
//     expect(screen.getByText('Movie 1')).toBeInTheDocument();
//     expect(screen.getByText('Movie 2')).toBeInTheDocument();
//   });

//   test('should render shows correctly when Response is True', () => {
//     const mockShows = {
//       Response: 'True',
//       Search: [
//         { Title: 'Show 1', Year: '2019', imdbID: 'tt9876' },
//         { Title: 'Show 2', Year: '2020', imdbID: 'tt5432' },
//       ],
//     };

//     const store = createStore({}, mockShows);

//     render(
//       <Provider store={store}>
//         <Router> {/* Wrap the component with Router */}
//           <MovieListing />
//         </Router>
//       </Provider>
//     );

//     // Assert that the Show Cards are rendered correctly
//     expect(screen.getByText('Show 1')).toBeInTheDocument();
//     expect(screen.getByText('Show 2')).toBeInTheDocument();
//   });

//   test('should render error message when Response is not True for movies', () => {
//     const mockMovies = {
//       Response: 'False',
//       Error: 'Movie not found!',
//     };

//     const store = createStore(mockMovies);

//     render(
//       <Provider store={store}>
//         <Router> {/* Wrap the component with Router */}
//           <MovieListing />
//         </Router>
//       </Provider>
//     );

//     // Assert that the error message for movies is displayed
//     expect(screen.getByText('Movie not found!')).toBeInTheDocument();
//   });

//   test('should render error message when Response is not True for shows', () => {
//     const mockShows = {
//       Response: 'False',
//       Error: 'Show not found!',
//     };

//     const store = createStore({}, mockShows);

//     render(
//       <Provider store={store}>
//         <Router> {/* Wrap the component with Router */}
//           <MovieListing />
//         </Router>
//       </Provider>
//     );

//     // Assert that the error message for shows is displayed
//     expect(screen.getByText('Show not found!')).toBeInTheDocument();
//   });
// });
