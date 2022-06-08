import React, { useState, useEffect } from "react";
import "./App.css";
import Questionnaire from "./Questionnaire";

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));

        setQuestions(questions);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (!answerSelected) {
      // to prevent double answers
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }

    setAnswerSelected(true);
  };

  const handleNextQuestion = () => {
    setAnswerSelected(false);

    setCurrentIndex(currentIndex + 1);
  };

  const handleResetClick = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswerSelected(false);
  };

  return questions.length > 0 ? (
    <div className="App">
      {currentIndex >= questions.length ? (
        <button className="button" onClick={handleResetClick}>
          Game Ended, your Score is: {score}. Click here to Play Again!
        </button>
      ) : (
        <Questionnaire
          data={questions[currentIndex]}
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
          answerSelected={answerSelected}
        />
      )}
    </div>
  ) : (
    <div className="loader">Loading...</div>
  );
}

export default App;
