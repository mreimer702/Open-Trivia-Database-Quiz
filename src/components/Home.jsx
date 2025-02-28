import { useState } from 'react';
import Question from './Question';
import Results from './Results';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: '',
  });

  const [questionData, setQuestionData] = useState({
    question: '',
    correctAnswer: '',
    incorrectAnswers: [],
  });

  const [error, setError] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const fetchQuestion = async () => {
    if (!formData.category || !formData.difficulty || !formData.name.trim()) {
      setError('Please fill in all fields before getting a question.');
      return;
    }

    try {
      setError(''); 

      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch a question');
      }

      const data = await response.json();
      const newQuestion = data.results[0];

      setQuestionData({
        question: newQuestion.question,
        correctAnswer: newQuestion.correct_answer,
        incorrectAnswers: newQuestion.incorrect_answers,
      });
    } catch (error) {
      setError(`❌ ${error.message}`);
      setQuestionData({
        question: '',
        correctAnswer: '',
        incorrectAnswers: [],
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAnswerSubmit = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchQuestion();
  };

  return (
    <div>
      <h1>Open Trivia Database Quiz</h1>
      <h2>Enter your name, pick a category and difficulty level and start answering some trivia questions.</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="category">Choose a category:</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
          </select>
        </div>
        <div>
          <label htmlFor="difficulty">Choose the difficulty:</label>
          <select
            name="difficulty"
            id="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit">Get Question</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {questionData.question && (
        <Question
          question={questionData.question}
          correctAnswer={questionData.correctAnswer}
          incorrectAnswers={questionData.incorrectAnswers}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}

      {selectedAnswer && questionData.correctAnswer && (
        <Results
        correctAnswer={questionData.correctAnswer}
        userAnswer={selectedAnswer}
        setQuestionData={setQuestionData}
        name={formData.name}
      />
      
      )}
      <footer class="footer">
      <p>&copy; Martin Reimer 2025</p>
      <p>All data used in this website is from the <a href="https://opentdb.com/">Open Trivia Database API</a></p>
      <p>The icon image is from this <a href="https://media.istockphoto.com/id/1396725757/vector/did-you-know-circle-message-bubble-with-light-bulb-emblem-banner-design-for-business-and.jpg?s=612x612&w=0&k=20&c=3K4fE6lfnxdW9c0LtrUFJ_eLHQ1XZkHCXV0NhrzGiK0=">link</a></p>
    </footer>
    </div>
  );
}

export default Home;


