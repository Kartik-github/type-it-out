import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
*{
 box-sizing: border-box;
}

body{
  background:black;
  color:white;
  margine:0;
  padding:0;
  transition: all 0.25s linear;
}

.canvas{
  display:grid;
  min-height:100vh;
  grid-auto-flow:row;
  grid-template-rrows:auto 1fr auto;
  gap:0.5rem;
  padding:2rem;
  width:100vw;
  align-items:center;
  text-align:center;
}

.type-box{
  display:block;
  max-width:1000px;
  height:140px;
  margin-left:auto;
  margin-right:auto;
  overflow:hidden
}

.words{
display:flex;
  flex-wrap:wrap;
  font-size:32px;
  
}

.word{
  margin:2px;
  padding-right:2px;
}
`;
