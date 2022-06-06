import React from "react";
import "./App.css";

const Questionnaire = ({
  showAnswers,
  handleAnswer,
  handleNextQuestion,
  data: { question, correct_answer, answers },
}) => {
  return (
    <div className="grid">
      <div className="question-section">
        <h2
          className="questions"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>

      <div className="answer-section">
        {answers.map((answer) => {
          const textColor = showAnswers
            ? answer === correct_answer
              ? "correct-answer"
              : "incorrect-answer"
            : "no-answer";

          return (
            <button
              className={`${textColor}`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      {showAnswers && (
        <button onClick={handleNextQuestion} className="next-question">
          Next Question
        </button>
      )}
    </div>
  );
};

export default Questionnaire;
