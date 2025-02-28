import { useState } from 'react';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    { id: 21, name: 'Sports' },
    { id: 22, name: 'Geography' },
    { id: 23, name: 'History' },
    { id: 24, name: 'Politics' }
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.category || !formData.difficulty) {
      setError('Please fill in all fields before submitting.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
      );

      if (!response.ok) {
        throw new Error('Failed to retrieve data');
      }

      const data = await response.json();
      setSuccess('Form submitted successfully! Check console for quiz data.');
      console.log(data);

      setFormData({ name: '', category: '', difficulty: '' });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Open Trivia Database Quiz</h1>
      <p>Welcome! Please enter your name, choose a category, and select a difficulty level to generate trivia questions.</p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">First Name:</label><br />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="category">Choose a category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty">Choose difficulty:</label>
          <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
}

export default Home;


