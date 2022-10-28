import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
margin: 0;
padding: 0;
    font-family: 'poppins', sans-serif;
    font-size: 16px
  }
  
  body {
    width: 100vw;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
  }

  @media (max-width: 600px) {
    * {
    font-size: 13.5px
  }  }


`;

export default Global;
