import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';

test('renders PageNotFound with correct elements', () => {
  const { getByText, getByAltText } = render(
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>
  );

  expect(getByText(/click here to go back/i)).toBeInTheDocument();
  expect(getByAltText(/invalid url/i)).toBeInTheDocument();
});
