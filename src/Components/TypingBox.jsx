import React, { useMemo, createRef, useEffect, useRef, useState } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";

const TypingBox = () => {
  const inputRef = useRef(null);
  const [wordsArray, setWordsArray] = useState(() => generate(50));
  const {testTime} = useTestMode();
  const SPACEBAR = 32;
  const BACKSPACE=8;
  const [currentWordIndex, setcurrentWordIndex] = useState(0);
  const [intervalId,setIntervalId] = useState(null);
  const [currentCharacterIndex, setcurrentCharacterIndex] = useState(0);
  const [countDown,setCountDown] = useState(testTime)
  const [testStart,setTestStart] = useState(false);
  const [testEnd,setTestEnd] = useState(false);


  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);


  const startTimer = ()=>{
    const intervalId = setInterval(timer,1000);
    setIntervalId(intervalId);
    
    function timer(){
      setCountDown((latestCountDown) => {
        if(latestCountDown === 1){
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown-1;
      });
    }
  
}

  const resetTest = () =>{
    setCountDown(testTime);
    setcurrentWordIndex(0);
    setcurrentCharacterIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    resetWordSpanRefClassName();
    focusInput()
    clearInterval(intervalId);
  }

  const resetWordSpanRefClassName = ()=>{
    wordsSpanRef.map(i=> Array.from(i.current.childNodes).map(j=> j.className=''));
    wordsSpanRef[0].current.childNodes[0].className = 'current'
  }

  const handleUserInput = (e) => {

    if(!testStart){
      startTimer();
      setTestStart(true);
    }


    const allCurrChars = wordsSpanRef[currentWordIndex].current.childNodes;

    if(e.keyCode === SPACEBAR){
      if(allCurrChars.length<=currentCharacterIndex){
        //remove cursor from right  
        allCurrChars[currentCharacterIndex-1].classList.remove("current-right");

      }else{
        //remove cursor from in between
        allCurrChars[currentCharacterIndex].classList.remove("current");
      }
      wordsSpanRef[currentWordIndex+1].current.childNodes[0].className="current";
      setcurrentWordIndex(currentWordIndex+1);
      setcurrentCharacterIndex(0);
      return;
    }

 

    if(e.keyCode === BACKSPACE){
      if(currentCharacterIndex!==0){

        if(allCurrChars.length === currentCharacterIndex){

          if(allCurrChars[currentCharacterIndex-1].className.includes('extra')){
            allCurrChars[currentCharacterIndex-1].remove()
            allCurrChars[currentCharacterIndex-2].className+=' current-right'
          }else{
          allCurrChars[currentCharacterIndex-1].className='current';
          }
          setcurrentCharacterIndex(currentCharacterIndex-1)
          return
        }

        allCurrChars[currentCharacterIndex].className='';
        allCurrChars[currentCharacterIndex-1].className='current';
        setcurrentCharacterIndex(currentCharacterIndex-1);
      }
      return
    }

    if(currentCharacterIndex === allCurrChars.length){
      let newSpan = document.createElement('span');
      newSpan.innerHTML=e.key
      newSpan.className='incorrect extra current-right'
      allCurrChars[currentCharacterIndex-1].classList.remove('current-right')
      wordsSpanRef[currentWordIndex].current.append(newSpan)
      setcurrentCharacterIndex(currentCharacterIndex+1)
      return

     }

    if (e.key === allCurrChars[currentCharacterIndex].innerText) {
      allCurrChars[currentCharacterIndex].className = "correct"
    } else {
      allCurrChars[currentCharacterIndex].className = "incorrect"
    }
    //if we are the last word
    if(currentCharacterIndex +1 === allCurrChars.length){
      allCurrChars[currentCharacterIndex].className+=" current-right"
    }else{
    allCurrChars[currentCharacterIndex+1].className="current";
    }
    setcurrentCharacterIndex(currentCharacterIndex+1);
  };


  

  const focusInput = () => inputRef.current.focus();
  useEffect(() => {
    focusInput();
    //set cursor to first character
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  useEffect(()=>{
    resetTest()
    setCountDown(testTime);
    
  },[testTime])

  return (
    <div>
      <UpperMenu countDown={countDown}/>
    {testEnd ? <h1>TEST OVER !! </h1> :  <div className="type-box" onClick={focusInput}>
        <div className="words">
          {wordsArray.map((words, index) => (
            <span className="word" ref={wordsSpanRef[index]}>
              {words.split("").map((char) => (
                <span>{char}</span>
              ))}
            </span>
          ))}
        </div>
      </div> }
      <input
        type="text"
        ref={inputRef}
        className="hidden-input"
        onKeyDown={handleUserInput}
      />
    </div>
  );
};
export default TypingBox;
