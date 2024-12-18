import styled from 'styled-components';
import {theme} from '../../common/colors.styles';

export const CardItem = styled.div`
  background: ${theme.colors.secondary};
  cursor: pointer;
  transition: all 0.3s;
  min-height: 450px;
  height: 100%;
  margin: 10px;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

export const CardTop = styled.div`
  height: 300px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const CardBottom = styled.div`
  padding: 20px;
`;

export const CardInfo = styled.div`
  color: ${theme.fonts.primary};

  h4 {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;
