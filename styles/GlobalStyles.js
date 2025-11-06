import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
  --font-01: "Urbanist";
  --font-02: "Inter";
}
 *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  input{
    display: flex;
padding: 12px 12px;
border-radius: 32px;
background: #474747;
border:none;
color: white;
  }

  input:focus{
   outline: none;
  box-shadow: none;
  }

button{
  
}
`;

export default GlobalStyles;
