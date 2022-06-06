import React from "react";
import "./App.css";

const Questionnaire = ({
  handleAnswer,
  data: { question, correct_answer, incorrect_answers },
}) => {
  const shuffledAnswers = [correct_answer, ...incorrect_answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div>
      <div className="question-section">
        <h2
          className="questions"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="answer-section">
        {shuffledAnswers.map((answer) => (
          <button
            className="answers"
            onClick={() => handleAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;
