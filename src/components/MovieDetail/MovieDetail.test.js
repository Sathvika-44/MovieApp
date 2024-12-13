import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MovieDetail from './MovieDetail';
import { fetchAsyncMovieOrShowDetail, removeSelectedMovieOrShow } from '../../features/movies/slice';

// Mock Redux hooks and actions
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('../../features/movies/slice', () => ({
    fetchAsyncMovieOrShowDetail: jest.fn(),
    removeSelectedMovieOrShow: jest.fn(),
}));

describe('MovieDetail Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
    });

    test('should render loading state initially', () => {
        useSelector.mockReturnValue({}); // Mock empty state

        render(
            <MemoryRouter initialEntries={['/movie/tt1234567']}>
                <Routes>
                    <Route path="/movie/:imdbID" element={<MovieDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('....Loading')).toBeInTheDocument();
        expect(mockDispatch).toHaveBeenCalledWith(fetchAsyncMovieOrShowDetail('tt1234567'));
    });

    test('should display movie details when data is available', async () => {
        const mockData = {
            Title: 'Inception',
            imdbRating: '8.8',
            imdbVotes: '2,000,000',
            Runtime: '148 min',
            Year: '2010',
            Plot: 'A skilled thief is offered a chance to erase his criminal record.',
            Director: 'Christopher Nolan',
            Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
            Genre: 'Action, Sci-Fi',
            Language: 'English',
            Awards: 'Oscar for Best Cinematography',
            Poster: 'https://via.placeholder.com/300',
        };

        useSelector.mockReturnValue(mockData);

        render(
            <MemoryRouter initialEntries={['/movie/tt1234567']}>
                <Routes>
                    <Route path="/movie/:imdbID" element={<MovieDetail />} />
                </Routes>
            </MemoryRouter>
        );

        // Assert movie details
        expect(await screen.findByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('IMDB Rating : 8.8')).toBeInTheDocument();
        expect(screen.getByText('IMDB Votes : 2,000,000')).toBeInTheDocument();
        expect(screen.getByText('Runtime : 148 min')).toBeInTheDocument();
        expect(screen.getByText('Year : 2010')).toBeInTheDocument();
        expect(screen.getByText('Director')).toBeInTheDocument();
        expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();

        // Assert that the dispatch function is called
        expect(mockDispatch).toHaveBeenCalledWith(fetchAsyncMovieOrShowDetail('tt1234567'));
    });

    test('dispatches fetchAsyncMovieOrShowDetail on mount', () => {
        render(<MovieDetail />);
        expect(mockDispatch).toHaveBeenCalledWith(fetchAsyncMovieOrShowDetail('tt1234567'));
    });

    test('dispatches removeSelectedMovieOrShow on unmount', () => {
        const mockData = {
          Title: 'Movie Title',
          imdbRating: '8.0',
          imdbVotes: '1000',
          Runtime: '120 min',
          Year: '2023',
          Plot: 'This is a plot',
          Director: 'Director Name',
          Actors: 'Actor 1, Actor 2',
          Genre: 'Action',
          Language: 'English',
          Awards: 'Best Picture',
          Poster: 'https://example.com/poster.jpg'
        };
      
        useSelector.mockReturnValue(mockData);
      
        const { unmount } = render(<MovieDetail />);
        
        // Ensure that data is being rendered
        expect(screen.getByText('Movie Title')).toBeInTheDocument();
      
        // Unmount the component and check if cleanup is performed
        unmount();
        expect(mockDispatch).toHaveBeenCalledWith(removeSelectedMovieOrShow());
      });
      
});
