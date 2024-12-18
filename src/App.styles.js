import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.fonts.primary};
  }

  body {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.fonts.primary};
  }

  .container {
    margin: 0 40px;
  }
  button{
    background-color: blue;
    border-radius:4px solid blue;

  }
`;

export default GlobalStyles;
