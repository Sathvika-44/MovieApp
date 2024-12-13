import { configureStore } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import moviesReducer, { fetchAsyncMovies, fetchAsyncShows, fetchAsyncMovieOrShowDetail } from './slice';

jest.mock('../../common/apis/movieApi'); // Mock movieApi

describe('Movies Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });
  });

  // Test fetchAsyncMovies
  it('should handle fetching movies asynchronously and populate the state', async () => {
    const mockMoviesData = {
      Search: [
        { Title: 'Inception', Year: '2010', imdbID: 'tt1375666' },
      ],
    };

    // Mock the API response
    movieApi.get.mockResolvedValue({ data: mockMoviesData });

    // Dispatch the async action
    await store.dispatch(fetchAsyncMovies('Inception'));

    // Get the updated state
    const state = store.getState();

    // Verify the state has been updated correctly
    expect(state.movies.movies.Search).toEqual(mockMoviesData.Search);
    expect(state.movies.error).toBeNull(); // Ensure no error
  });

  it('should handle fetching movies with error', async () => {
    // Mock the API response to simulate an error
    movieApi.get.mockRejectedValue(new Error('Failed to fetch movies'));

    // Dispatch the async action
    await store.dispatch(fetchAsyncMovies('Inception'));

    // Get the updated state
    const state = store.getState();

    // Verify the error is set correctly
    expect(state.movies.movies).toEqual({});
    expect(state.movies.error).toBe('Failed to fetch movies');
  });

  // Test fetchAsyncShows
  it('should handle fetching shows asynchronously', async () => {
    const mockShowsData = {
      Search: [
        { Title: 'Breaking Bad', Year: '2008', imdbID: 'tt0903747' },
      ],
    };

    // Mock the API response
    movieApi.get.mockResolvedValue({ data: mockShowsData });

    // Dispatch the async action
    await store.dispatch(fetchAsyncShows('Breaking Bad'));

    // Get the updated state
    const state = store.getState();

    // Verify the state has been updated correctly
    expect(state.movies.shows.Search).toEqual(mockShowsData.Search);
    expect(state.movies.error).toBeNull(); // Ensure no error
  });

  it('should handle fetching shows with error', async () => {
    // Mock the API response to simulate an error
    movieApi.get.mockRejectedValue(new Error('Failed to fetch shows'));

    // Dispatch the async action
    await store.dispatch(fetchAsyncShows('Breaking Bad'));

    // Get the updated state
    const state = store.getState();

    // Verify the error is set correctly
    expect(state.movies.shows).toEqual({});
    expect(state.movies.error).toBe('Failed to fetch shows');
  });

  // Test fetchAsyncMovieOrShowDetail
  it('should handle fetching movie/show details asynchronously', async () => {
    const mockMovieDetail = {
      Title: 'Inception',
      Year: '2010',
      imdbID: 'tt1375666',
      Plot: 'A mind-bending thriller...',
    };

    // Mock the API response
    movieApi.get.mockResolvedValue({ data: mockMovieDetail });

    // Dispatch the async action
    await store.dispatch(fetchAsyncMovieOrShowDetail('tt1375666'));

    // Get the updated state
    const state = store.getState();

    // Verify the state has been updated correctly
    expect(state.movies.selectedMovieOrShow).toEqual(mockMovieDetail);
    expect(state.movies.error).toBeNull(); // Ensure no error
  });

  it('should handle fetching movie/show details with error', async () => {
    // Mock the API response to simulate an error
    movieApi.get.mockRejectedValue(new Error("Failed to fetch movie/show details"));
    // Dispatch the async action
    await store.dispatch(fetchAsyncMovieOrShowDetail('tt1375666'));

    // Get the updated state
    const state = store.getState();

    // Verify the error is set correctly
    expect(state.movies.selectedMovieOrShow).toEqual({});
    expect(state.movies.error).toEqual('Failed to fetch movie/show details');
  });
});
