import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/slice';
import MovieCard from "../MovieCard/MovieCard"
// import "./MovieListing.scss";
import Slider from 'react-slick';
import { Settings } from '../../common/settings';
import { MovieList, ShowList } from './MovieListing.styles';

const MovieListing = () => {

    
    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    let renderMovies, renderShows = "";

    renderMovies = movies.Response === "True" ? (
        movies.Search.map((movie, index) => (
            <MovieCard key={index} data={movie} />
        ))
    ) : (
        <div className="movies-error">
            <h3>{movies.Error}</h3>
        </div>)

    renderShows = shows.Response === "True" ? (
        shows.Search.map((show, index) => (
            <MovieCard key={index} data={show} />
        ))
    ) : (
        <div className="shows-error">
            <h3>{shows.Error}</h3>
        </div>)

    return (
        <div className='movie-wrapper'>
            <MovieList>
                <h2>Movies</h2>
                <div className='movie-container'>
                    <Slider {...Settings}>{renderMovies}</Slider>
                </div>
            </MovieList>
            <ShowList>
                <h2>Shows</h2>
                <div className='movie-container'>
                 <Slider {...Settings}>{renderShows}</Slider>
                </div>
            </ShowList>
        </div>
    )
}

export default MovieListing;