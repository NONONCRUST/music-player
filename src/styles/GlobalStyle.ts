import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";

const globalStyle = css`
  ${reset};
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;
