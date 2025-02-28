import { useState } from 'react';

function Question({ question, correctAnswer, incorrectAnswers, onAnswerSubmit }) {
  if (!question) return null;

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [message, setMessage] = useState('');

  const answers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedAnswer) {
      setMessage('Please select an answer before submitting.');
      return;
    }

    onAnswerSubmit(selectedAnswer); 
    setMessage('');
  };

  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
      <form onSubmit={handleSubmit}>
        {answers.map((answer, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`answer-${index}`}
              name="answer"
              value={answer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            <label htmlFor={`answer-${index}`} dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        ))}
        <button type="submit">Submit Your Answer</button>
      </form>
      {message && <div style={{ color: 'red' }}>{message}</div>} 
    </div>
  );
}

export default Question;

