import React, { useState, useEffect } from "react";
import "./App.css";
import Questionnaire from "./Questionnaire";

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return questions.length > 0 ? (
    <div className="App">
      {currentIndex >= questions.length ? (
        <h1 className="score-section">Game Ended! Your Score is: {score}.</h1>
      ) : (
        <Questionnaire
          data={questions[currentIndex]}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  ) : (
    <div className="loader">Loading...</div>
  );
}

export default App;
