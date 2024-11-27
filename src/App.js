
import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { AppProvider } from './components/AppContext';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <AppProvider>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/movie/:imdbID' element={<MovieDetail />} />
            <Route path="/login" element={<Login/>} />
            <Route element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      </AppProvider>
    </div>
  );
}

export default App;
