import React, { useMemo, createRef, useEffect, useRef, useState } from "react";
import { generate } from "random-words";

const TypingBox = () => {
  const inputRef = useRef(null);
  const [wordsArray, setWordsArray] = useState(() => generate(50));

  const [currentWordIndex, setcurrentWordIndex] = useState(0);
  const [currentCharacterIndex, setcurrentCharacterIndex] = useState(0);
  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  const handleUserInput = (e) => {
    const allCurrChars = wordsSpanRef[currentWordIndex].current.childNodes;

    if (e.key === allCurrChars[currentCharacterIndex].innerText) {
      allCurrChars[currentCharacterIndex].className = "correct"
    } else {
      allCurrChars[currentCharacterIndex].className = "incorrect"
    }
  };

  console.log(wordsSpanRef);

  const focusInput = () => inputRef.current.focus();
  useEffect(() => {
    focusInput();
    //set cursor to first character
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);
  return (
    <div>
      <div className="type-box" onClick={focusInput}>
        <div className="words">
          {wordsArray.map((words, index) => (
            <span className="word" ref={wordsSpanRef[index]}>
              {words.split("").map((char) => (
                <span>{char}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
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
