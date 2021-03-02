import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  body{
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
    font-family: 'Noto Sans KR', sans-serif;
    background-color: white;
  }

ul,
  ol {
    list-style: none;
  }
  a,
  a:visited {
    text-decoration: none;
  }
  *:focus {
    outline: none;
  }
  button {
    border: none;
    outline: none;
    text-shadow: none;
    background: none;
    cursor: pointer;
  }
  * {
    box-sizing: border-box;
    font: inherit;
  }
  `;

export default GlobalStyles;
