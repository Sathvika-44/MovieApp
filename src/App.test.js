

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';

jest.mock('./components/Header/Header', () => () => <div>Mocked_Header</div>);
jest.mock('./components/Footer/Footer', () => () => <div>Mocked_Footer</div>);
jest.mock('./components/Home/Home', () => () => <div>Mocked_Home_Page</div>);
jest.mock('./components/MovieDetail/MovieDetail', () => () => <div>Mocked_Movie_Detail_Page</div>);
jest.mock('./components/Login/Login', () => () => <div>Mocked_Login_Page</div>);
jest.mock('./firebase/SignUpForm/SignUpForm', () => () => <div>Mocked_Sign-Up_Form</div>);

describe('App Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui);
  };

  test('renders the Home page by default', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText('Mocked_Home_Page')).toBeInTheDocument();
    expect(screen.getByText('Mocked_Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked_Footer')).toBeInTheDocument();
  });

  test('renders the Movie Detail page', () => {
    renderWithRouter(<App />, { route: '/movie/12345' });
    expect(screen.getByText('Mocked_Movie_Detail_Page')).toBeInTheDocument();
  });

  test('renders the Login page', () => {
    renderWithRouter(<App />, { route: '/login' });
    expect(screen.getByText('Mocked_Login_Page')).toBeInTheDocument();
  });

  test('renders the Sign-Up Form page', async () => {
    renderWithRouter(<App />, { route: '/signup' });
    const signUpForm = await screen.findByText('Mocked_Sign-Up_Form');
    expect(signUpForm).toBeInTheDocument();
  });

  test('renders the 404 page for unknown routes', () => {
    renderWithRouter(<App />, { route: '/unknown-route' });
    expect(screen.getByText(/click here to go back/i)).toBeInTheDocument();
    expect(screen.getByAltText(/invalid url/i)).toBeInTheDocument();
  });
});
