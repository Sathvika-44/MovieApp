import { store } from './store';  // Path to your store file
import { fetchAsyncMovies } from './movies/slice';  // Path to your slice file
import movieApi from '../common/apis/movieApi';

jest.mock('../common/apis/movieApi', () => ({
    get: jest.fn(),
  }));

describe('Redux Store', () => {
    it('should initialize with the correct initial state', () => {
        const state = store.getState();

        expect(state.movies).toEqual({
            movies: {},
            shows: {},
            selectedMovieOrShow: {},
            error: null,
        });
    });

    it('should handle fetching movies asynchronously and populate Search', async () => {
        // Directly mock the data for now
        const mockData = {
           Title: 'Inception', Year: '2010', imdbID: 'tt1375666' 
        };
        movieApi.get.mockResolvedValue({ data: mockData });
        await store.dispatch(fetchAsyncMovies('Inception'));
        const state = store.getState();
        console.log('State after dispatch:', state);
        expect(state.movies.movies).toEqual(mockData);
      });

    it('should handle fetch failure (rejected state)', async () => {
        // Mock axios to simulate an error
        movieApi.get.mockRejectedValue(new Error('Failed to fetch movies'));

        // Dispatch the correct async action
        await store.dispatch(fetchAsyncMovies('NonExistingMovie'));

        // Get the updated state
        const state = store.getState();

        // Check if the error message is set correctly
        expect(state.movies.error).toBe('Failed to fetch movies');
    });
});
