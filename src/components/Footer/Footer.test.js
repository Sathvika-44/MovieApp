import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders the MovieApp text', () => {
    render(<Footer />);
    expect(screen.getByText('MovieApp')).toBeInTheDocument();
  });

  test('renders the copyright text with dynamic year', () => {
    render(<Footer />);
    expect(
      screen.getByText(`©2024, Movie, Inc. or its affiliates`)
    ).toBeInTheDocument();
  });

  test('uses the semantic <footer> tag', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
