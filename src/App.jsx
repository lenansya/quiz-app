import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import QuizSetup from './components/QuizSetup';
import QuizQuestion from './components/QuizQuestion';
import Timer from './components/Timer';
import Result from './components/Result';
import './App.css';

function App() {
  const [stage, setStage] = useState('login'); 
  const [userName, setUserName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizConfig, setQuizConfig] = useState(null);
  const [results, setResults] = useState({ correct: 0, incorrect: 0, unanswered: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quizState');
    if (saved) {
      const state = JSON.parse(saved);
      const confirmResume = window.confirm('Ada kuis yang belum selesai. Lanjutkan?');
      if (confirmResume) {
        setStage(state.stage);
        setUserName(state.userName);
        setQuestions(state.questions);
        setCurrentQuestion(state.currentQuestion);
        setUserAnswers(state.userAnswers);
        setQuizConfig(state.quizConfig);
      } else {
        localStorage.removeItem('quizState');
      }
    }
  }, []);

  useEffect(() => {
    if (stage === 'quiz') {
      localStorage.setItem('quizState', JSON.stringify({
        stage,
        userName,
        questions,
        currentQuestion,
        userAnswers,
        quizConfig
      }));
    }
  }, [stage, userName, questions, currentQuestion, userAnswers, quizConfig]);

  const handleLogin = (name) => {
    setUserName(name);
    setStage('setup');
  };

  const handleStartQuiz = async (config) => {
    setLoading(true);
    try {
      let url = `https://opentdb.com/api.php?amount=${config.amount}`;
      
      if (config.category) url += `&category=${config.category}`;
      if (config.difficulty) url += `&difficulty=${config.difficulty}`;
      if (config.type) url += `&type=${config.type}`;
      
      const response = await axios.get(url);
      
      if (response.data.results.length === 0) {
        alert('Tidak ada soal yang tersedia dengan pengaturan ini. Coba ubah pengaturan!');
        setLoading(false);
        return;
      }

      setQuestions(response.data.results);
      setQuizConfig(config);
      setUserAnswers(new Array(response.data.results.length).fill(null));
      setCurrentQuestion(0);
      setStage('quiz');
      setLoading(false);
    } catch (error) {
      alert('Error mengambil soal dari server. Periksa koneksi internet Anda!');
      console.error(error);
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 300);
  };

  const handleTimeUp = () => {
    finishQuiz(userAnswers);
  };

  const finishQuiz = (answers) => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q, index) => {
      if (answers[index] === null) {
        unanswered++;
      } else if (answers[index] === q.correct_answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    setResults({ correct, incorrect, unanswered });
    setStage('result');
    localStorage.removeItem('quizState');
  };

  const handleRestart = () => {
    setStage('setup');
    setQuestions([]);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setResults({ correct: 0, incorrect: 0, unanswered: 0 });
    setQuizConfig(null);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Memuat soal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {stage === 'login' && <Login onLogin={handleLogin} />}
      
      {stage === 'setup' && (
        <QuizSetup userName={userName} onStartQuiz={handleStartQuiz} />
      )}
      
      {stage === 'quiz' && (
        <div className="quiz-container">
          <Timer timeLimit={quizConfig.timeLimit} onTimeUp={handleTimeUp} />
          <QuizQuestion
            question={questions[currentQuestion]}
            currentIndex={currentQuestion}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        </div>
      )}
      
      {stage === 'result' && (
        <Result
          results={results}
          totalQuestions={questions.length}
          userName={userName}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;