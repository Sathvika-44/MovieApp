import React from 'react';
import {Link} from "react-router-dom";
import { CardBottom, CardInfo, CardItem, CardTop } from './MovieCard.styles';
// import './MovieCard.scss';
const MovieCard=(props)=>{
    const { data } = props;
  return (
    <CardItem>
      <Link to={`/movie/${data.imdbID}`}>
        <div className="card-inner">
          <CardTop>
            <img src={data.Poster} alt={data.Title} />
          </CardTop>
          <CardBottom>
            <CardInfo>
              <h4>{data.Title}</h4>
              <p>{data.Year}</p>
            </CardInfo>
          </CardBottom>
        </div>
      </Link>
    </CardItem>
  );
}

export default MovieCard;