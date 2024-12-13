import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieCard from './MovieCard';

describe('MovieCard Component', () => {
  const mockData = {
    imdbID: 'tt1234567',
    Poster: 'https://via.placeholder.com/150',
    Title: 'Sample Movie',
    Year: '2023',
  };

  test('renders correctly with given props', () => {
    render(
      <Router>
        <MovieCard data={mockData} />
      </Router>
    );

    // Check if the movie title is rendered
    expect(screen.getByText(mockData.Title)).toBeInTheDocument();

    // Check if the movie year is rendered
    expect(screen.getByText(mockData.Year)).toBeInTheDocument();

    // Check if the movie poster is rendered
    const posterImage = screen.getByAltText(mockData.Title);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', mockData.Poster);

    // Check if the Link component has the correct path
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/movie/${mockData.imdbID}`);
  });
});
