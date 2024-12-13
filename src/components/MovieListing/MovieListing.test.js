import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter
import MovieListing from './MovieListing';
import movieReducer from '../../features/movies/slice';

// Mock the Slider component from react-slick
jest.mock('react-slick', () => {
  return ({ children }) => <div>{children}</div>; // Mock the slider as a simple wrapper
});

describe('MovieListing Component', () => {
  // Create a mock store
  const createStore = (movies, shows) => {
    return configureStore({
      reducer: {
        movies: movieReducer,
      },
      preloadedState: {
        movies: {
          movies: movies || {},
          shows: shows || {},
          selectedMovieOrShow: {},
          error: null,
        },
      },
    });
  };

  test('should render movies correctly when Response is True', () => {
    const mockMovies = {
      Response: 'True',
      Search: [
        { Title: 'Movie 1', Year: '2020', imdbID: 'tt1234' },
        { Title: 'Movie 2', Year: '2021', imdbID: 'tt5678' },
      ],
    };

    const store = createStore(mockMovies);

    render(
      <Provider store={store}>
        <Router> {/* Wrap the component with Router */}
          <MovieListing />
        </Router>
      </Provider>
    );

    // Assert that the Movie Cards are rendered correctly
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  test('should render shows correctly when Response is True', () => {
    const mockShows = {
      Response: 'True',
      Search: [
        { Title: 'Show 1', Year: '2019', imdbID: 'tt9876' },
        { Title: 'Show 2', Year: '2020', imdbID: 'tt5432' },
      ],
    };

    const store = createStore({}, mockShows);

    render(
      <Provider store={store}>
        <Router> {/* Wrap the component with Router */}
          <MovieListing />
        </Router>
      </Provider>
    );

    // Assert that the Show Cards are rendered correctly
    expect(screen.getByText('Show 1')).toBeInTheDocument();
    expect(screen.getByText('Show 2')).toBeInTheDocument();
  });

  test('should render error message when Response is not True for movies', () => {
    const mockMovies = {
      Response: 'False',
      Error: 'Movie not found!',
    };

    const store = createStore(mockMovies);

    render(
      <Provider store={store}>
        <Router> {/* Wrap the component with Router */}
          <MovieListing />
        </Router>
      </Provider>
    );

    // Assert that the error message for movies is displayed
    expect(screen.getByText('Movie not found!')).toBeInTheDocument();
  });

  test('should render error message when Response is not True for shows', () => {
    const mockShows = {
      Response: 'False',
      Error: 'Show not found!',
    };

    const store = createStore({}, mockShows);

    render(
      <Provider store={store}>
        <Router> {/* Wrap the component with Router */}
          <MovieListing />
        </Router>
      </Provider>
    );

    // Assert that the error message for shows is displayed
    expect(screen.getByText('Show not found!')).toBeInTheDocument();
  });
});
