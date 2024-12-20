import React, { useEffect,useState } from 'react';
import MovieListing from '../MovieListing/MovieListing'
//import { useDispatch } from "react-redux";
// import {fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/slice';
import { useAppContext } from '../../common/AppContext/AppContext';

const Home = () => {
  const {term}=useAppContext();
 
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing searchTerm={term}/>
    </div>
  );

};

export default Home;


// const Home = () => {

//     const dispatch = useDispatch();
//     const movieText="Harry";
//     const seriesText="Friends";
//     useEffect(() => {
//         dispatch(fetchAsyncMovies(movieText));
//         dispatch(fetchAsyncShows(seriesText));
//     }, [dispatch]);

//     return (
//         <div>
//             <div className='banner-img'></div>
//             <MovieListing />
//         </div>

//     );
// };

// export default Home;