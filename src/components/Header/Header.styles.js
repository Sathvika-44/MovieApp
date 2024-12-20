import styled from 'styled-components';
import {theme} from '../../common/colors.styles';

export const HeaderContainer = styled.header`
  background-color: ${theme.colors.secondary};
  height: 80px;
  padding: 0 40px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  color: ${theme.fonts.primary};
  font-size: 20px;
  font-weight: 600;
`;

export const UserImage = styled.div`
  width: 38px;
  height: 38px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;

  .user-login {
    padding-left: 20px;
  }
`;

export const SearchBar = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;

  form {
    display: flex;
    justify-content: center;
    width: 70%;

    button {
      padding: 0 8px;
      font-size: 20px;
      cursor: pointer;
      height: 38px;
      border-radius:20%;
    }
  }

  input {
    font-size: 18px;
    width: 100%;
    padding: 5px 5px 5px 10px;
    height: 38px;
    outline: none;
  }
`;
