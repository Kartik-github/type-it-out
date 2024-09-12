import React, { useState } from 'react'
var randomWords = require('random-words');

const TypingBox = () =>{

  const [wordsArray,setWordsArray] = useState(() => {return randomWords(50);});
  
  return (
    <div>
     <div className='type-box'>
      <div className='words'>
        {
        wordsArray.map(words => (
          <span className='word' >
            {words.split('').map(char => (
              <span className='char'>{char}</span>
            ))}
          </span>
        ))
        }
     </div>
    </div>
    </div>
  )
}
export default TypingBox;