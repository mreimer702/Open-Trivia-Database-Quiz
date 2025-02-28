import { useState } from 'react';

function Question({ question, correctAnswer, incorrectAnswers }) {
    if (!question) return null;
  const [answerInput, setAnswerInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const answers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5); // Shuffle answers

  const handleChange = (event) => {
    setAnswerInput(event.target.value);
  };

  const validateForm = () => {
    if (!answerInput) {
      setError('Please select an answer before submitting.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (answerInput === correctAnswer) {
      setSuccess('✅ Correct answer! 🎉');
    } else {
      setError('❌ Wrong answer. Try again!');
    }
  };

  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: question }}/>
      <form onSubmit={handleSubmit}>
        {answers.map((answer, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`answer-${index}`}
              name="answer"
              value={answer}
              onChange={handleChange}
            />
            <label htmlFor={`answer-${index}`} dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        ))}
        <button type="submit">Submit Your Answer</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
}

export default Question;
