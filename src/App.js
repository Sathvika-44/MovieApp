
import './App.scss';
import React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { AppProvider } from './components/AppContext';
import Login from './components/Login/Login';
import SignUpForm from './firebase/SignUpForm/SignUpForm';
import ErrorFallback from './common/ErrorFallback';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <div className='container'>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => console.log("Error boundary reset")}
            >
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
  );
}

export default App;
