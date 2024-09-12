import React, { useState } from "react";
import { generate } from "random-words";
// const randomWords = require('random-words');

const TypingBox = () => {
  // var list=generate(12)
  // const [wordsArray,setWordsArray] = useState(()=>{return randomWords(12generate
  const [wordsArray, setWordsArray] = useState(() => generate(50));

  return (
    // <div>
    <div className="type-box">
      <div className="words">
        {wordsArray.map((words) => (
          <span className="word">
            {words.split("").map((char) => (
              <span className="char">{char}</span>
            ))}
          </span>
        ))}
      </div>
    </div>
    // </div>
  );
};
export default TypingBox;
