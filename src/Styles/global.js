import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
*{
 box-sizing: border-box;
}

body{
  background:${({theme}) => theme.background};
  color:${({theme}) => theme.textColor};
  margin:0;
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
  color: ${({theme}) => theme.typeBoxColor}
  
}

.word{
  margin:2px;
  padding-right:2px;
}

.hidden-input{
opacity:0;
}

.current{
  border-left:1px solid;
  animation: blinking 2s infinite;
  animation-timing-function:ease;
}

  @keyframes blinking{
    0% {border-left-color:white;}
    25% {border-left-color:black;}
    50% {border-left-color:white;}
    75% {border-left-color:black;}
    100% {border-left-color:white;}
  }
  
  .current-right{
  border-right:1px solid;
  animation: blinkingRI 2s infinite;
  animation-timing-function:ease;
}

  @keyframes blinkingRI{
    0% {border-right-color:white;}
    25% {border-right-color:black;}
    50% {border-right-color:white;}
    75% {border-right-color:black;}
    100% {border-right-color:white;}
  }

.correct{
  color:green;
}

.incorrect{
  color:red;
}

.upper-menu{
  display:flex;
  width:1000px;
  margin-left:auto;
  margin-right:auto;
  font-size:1.35rem;
  justify-content:space-between;
  padding:0.5rem;
}

.modes{
  display:flex;
  gap:0.4rem;

}

.time-mode:hover{
color:green;
cursor:pointer;
}


.footer{
  width: 1000px;
  display:flex;
  justify-content:space-between;
  margin-left:auto;
  margin-right:auto;
}

`;
