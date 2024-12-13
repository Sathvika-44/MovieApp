import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from './Home';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/slice';
import MovieListing from '../MovieListing/MovieListing';

// Mock the fetchAsyncMovies and fetchAsyncShows actions
jest.mock('../../features/movies/slice', () => ({
  fetchAsyncMovies: jest.fn(),
  fetchAsyncShows: jest.fn(),
}));

// Mock the MovieListing component to avoid rendering it fully
jest.mock('../MovieListing/MovieListing', () => () => <div>Movie Listing</div>);

describe('Home Component', () => {
  let store;

  beforeEach(() => {
    // Mock the dispatch function
    const dispatch = jest.fn();

    // Create a mock store
    store = configureStore({
      reducer: {
        movies: (state = { movieList: [], showList: [] }, action) => state, // initial state
      },
      // We are not using redux-thunk, so we're just testing the dispatch call
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    // Overwrite dispatch in the store with the jest mock function
    store.dispatch = dispatch;
  });

  test('should render MovieListing component and dispatch fetchAsyncMovies and fetchAsyncShows on mount', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Verify that MovieListing is rendered
    expect(screen.getByText('Movie Listing')).toBeInTheDocument();

    // Wait for the actions to be dispatched and verify they were called with the correct arguments
    await waitFor(() => {
      expect(fetchAsyncMovies).toHaveBeenCalledWith('Harry');
      expect(fetchAsyncShows).toHaveBeenCalledWith('Friends');
    });
  });
});
