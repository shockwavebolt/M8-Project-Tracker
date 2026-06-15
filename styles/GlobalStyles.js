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
background: var(--color-white00);
  box-shadow: 0 4px 4px 0 var(--color-shadow) inset;
border-bottom: 2px solid var(--color-highlight);

color: var(--color-black00);
  }

  input:focus{
   outline: none;
   box-shadow: var(--shadow-focus) inset;
  }

  [data-theme="midnight"] input {
    background: var(--color-black01);
    border: 2px solid var(--color-mauve00);
    color: var(--color-white01);
  }

  [data-theme="midnight"] input:focus {
    box-shadow: none ;
  
  }

button{

}

  @media screen and (min-width: 320px) and (max-width: 768px) {
    .toast {
      font-size: 12px !important;
      padding: 0.75rem 1rem !important;
    }
  }


`;

export default GlobalStyles;
