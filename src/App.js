
// import './App.scss';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { AppProvider } from './common/AppContext/AppContext';
import Login from './components/Login/Login';
import SignUpForm from './firebase/SignUpForm/SignUpForm';
import ErrorBoundary from './common/ErrorBoundary';
import { theme } from './common/colors.styles';
import GlobalStyles from './App.styles';
import MovieListing from './components/MovieListing/MovieListing';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
    <div className="App">
      <AppProvider>
        <Router>
          <div className='container'>
          <ErrorBoundary fallback="Error">
              <Header />
              <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/movie/:imdbID' element={<MovieDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <Footer />
            </ErrorBoundary>
          </div>
        </Router>
      </AppProvider>
    </div>
    </ThemeProvider>
  );
}

export default App;
