import React, { useState, useEffect } from 'react';
import './QuizQuestion.css';

function QuizQuestion({ question, currentIndex, totalQuestions, onAnswer }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const allAnswers = [
      ...question.incorrect_answers,
      question.correct_answer
    ].sort(() => Math.random() - 0.5);
    
    setAnswers(allAnswers);
  }, [question]);

  const handleAnswerClick = (answer) => {
    onAnswer(answer);
  };

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="quiz-question-container">
      <div className="question-box">
        <div className="progress-bar">
          <div className="progress-info">
            <span>Soal {currentIndex + 1} dari {totalQuestions}</span>
            <span>{Math.round(((currentIndex) / totalQuestions) * 100)}% Selesai</span>
          </div>
          <div className="progress">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="question-content">
          <div className="question-type">
            <span className={`badge ${question.difficulty}`}>
              {question.difficulty}
            </span>
            <span className="badge category">
              {decodeHTML(question.category)}
            </span>
          </div>

          <h3 className="question-text">
            {decodeHTML(question.question)}
          </h3>

          <div className="answers-grid">
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className="answer-button"
              >
                <span className="answer-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="answer-text">
                  {decodeHTML(answer)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizQuestion;