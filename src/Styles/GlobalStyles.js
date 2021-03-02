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
  `;

export default GlobalStyles;
