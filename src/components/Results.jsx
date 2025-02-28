import { useState, useEffect } from 'react';

function Results({ correctAnswer, userAnswer, setQuestionData, name }) {
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      if (userAnswer !== '') {
        checkAnswer();
      }
    }, [userAnswer]);
  
    const checkAnswer = () => {
      if (userAnswer === correctAnswer) {
        setMessage(`Congratulations, ${name}! You got the right answer!`);
      } else {
        setMessage(`Wrong answer. The answer was ${correctAnswer}`);
      }
    };
  
    const reset = () => {
      setMessage('');
      setQuestionData({ question: '', correctAnswer: '', incorrectAnswers: [] });
    };
  
    return (
      <div>
        <p>{message}</p>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }
  

export default Results;



