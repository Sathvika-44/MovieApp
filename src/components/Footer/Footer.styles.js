import styled from "styled-components";
import {theme} from '../../common/colors.styles';

export const FooterContainer = styled.footer`
  background: ${theme.colors.secondary};
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.fonts.primary};
  flex-direction: column;
`;
