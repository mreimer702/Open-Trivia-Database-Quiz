# Trivia Quiz App

This is a simple trivia quiz application built using React. It fetches questions from the Open Trivia Database API and allows users to test their knowledge in various categories and difficulty levels.

## Features
- Users can enter their name before starting the quiz.
- Choose from multiple categories (Sports, Geography, History, Politics).
- Select difficulty level (Easy, Medium, Hard).
- Fetches a random question from OpenTDB API.
- Displays multiple-choice answers.
- Provides feedback on whether the selected answer is correct or incorrect.
- Option to reset the quiz and fetch a new question.

## Technologies Used
- React.js
- Open Trivia Database API (https://opentdb.com/)
- CSS for styling

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/trivia-quiz-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd trivia-quiz-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
```
trivia-quiz-app/
│── src/
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── Question.jsx
│   │   ├── Results.jsx
│   ├── App.jsx
│   ├── main.jsx
│── public/
│── styles.css
│── README.md
│── package.json
│── vite.config.js
```

## API Usage
This app uses the Open Trivia Database API to fetch quiz questions. API request example:
```sh
https://opentdb.com/api.php?amount=1&category={CATEGORY}&difficulty={DIFFICULTY}&type=multiple
```

## Future Enhancements
- Add more categories dynamically from API.
- Implement a scoreboard to track correct answers.
- Enhance UI with animations and better styling.
