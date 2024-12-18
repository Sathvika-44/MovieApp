import React, { useEffect ,useState} from 'react';
// import "./MovieDetail.scss";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovieOrShowDetail, getSelectedMovieOrShow, removeSelectedMovieOrShow } from '../../features/movies/slice';
import Booking from '../Booking/Booking';
import { MovieInfo, MoviePlot, MovieRating, MovieSection, MovieTitle, SectionRight } from './MovieDetail.styles';
// import { useAppContext } from '../../common/AppContext/AppContext';

const MovieDetail = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const data =useSelector(getSelectedMovieOrShow);
    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetail(imdbID));
        return ()=>{
            dispatch(removeSelectedMovieOrShow());
        }
    }, [dispatch, imdbID]);

    

    return (
        <MovieSection>
          {data && Object.keys(data).length === 0 ? (
            <div>....Loading</div>
          ) : (
            <>
              <div className='section-left'>
                <MovieTitle>{data?.Title || 'N/A'}</MovieTitle>
                <MovieRating>
                  <span>IMDB Rating <i className='fa fa-star'></i> : {data?.imdbRating || 'N/A'}</span>
                  <span>IMDB Votes <i className='fa fa-thumbs-up'></i> : {data?.imdbVotes || 'N/A'}</span>
                  <span>Runtime <i className='fa fa-film'></i> : {data?.Runtime || 'N/A'}</span>
                  <span>Year <i className='fa fa-calendar'></i> : {data?.Year || 'N/A'}</span>
                </MovieRating>
                <MoviePlot>{data?.Plot || 'No plot available'}</MoviePlot>
                <MovieInfo>
                  <div>
                    <span>Director</span>
                    <span>{data?.Director || 'N/A'}</span>
                  </div>
                  <div>
                    <span>Stars</span>
                    <span>{data?.Actors || 'N/A'}</span>
                  </div>
                  <div>
                    <span>Genres</span>
                    <span>{data?.Genre || 'N/A'}</span>
                  </div>
                  <div>
                    <span>Languages</span>
                    <span>{data?.Language || 'N/A'}</span>
                  </div>
                  <div>
                    <span>Awards</span>
                    <span>{data?.Awards || 'N/A'}</span>
                  </div>
                </MovieInfo>
                <Booking data={data} />
              </div>
              <SectionRight>
                <img src={data?.Poster || 'https://example.com/default-poster.jpg'} alt={data?.Title || 'No title'} />
              </SectionRight>
            </>
          )}
        </MovieSection>
      );      
}

export default MovieDetail;