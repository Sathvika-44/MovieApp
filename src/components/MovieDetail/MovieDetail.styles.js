import styled from 'styled-components';
import {theme} from '../../common/colors.styles';

// Movie Section
export const MovieSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  padding: 40px 0;
  color: ${theme.fonts.primary};
  font-weight: 400;
`;

// Movie Rating
export const MovieRating = styled.div`
  padding-left: 3px;
  margin-top: 20px;
  color: ${theme.fonts.secondary};
  display: flex;

  span {
    margin-right: 20px;
  }
`;

// Movie Title
export const MovieTitle = styled.h1`
  font-size: 40px;
  color: ${theme.fonts.primary};
`;

// Movie Plot
export const MoviePlot = styled.p`
  margin-top: 20px;
  line-height: 1.8rem;
`;

// Movie Info (for spans inside divs)
export const MovieInfo = styled.div`
  > div span:first-child {
    padding: 10px 0;
    color: ${theme.fonts.primary};
    font-weight: 600;
    width: 100px;
    display: inline-block;
  }

  > div span {
    color: ${theme.fonts.secondary};
  }
`;

// Icons with custom colors
export const FaStar = styled.i`
  color: #ff9e00;
`;

export const FaThumbsUp = styled.i`
  color: #fafafa;
`;

export const FaFilm = styled.i`
  color: rgb(191, 213, 214);
`;

export const FaCalendar = styled.i`
  color: peachpuff;
`;

// Section Right
export const SectionRight = styled.div`
  margin-left: 30px;
`;
