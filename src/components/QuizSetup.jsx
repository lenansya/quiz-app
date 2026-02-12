import React, { useState } from 'react';
import './QuizSetup.css';

function QuizSetup({ userName, onStartQuiz }) {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [timeLimit, setTimeLimit] = useState(10);

  const handleStart = () => {
    if (amount < 1 || amount > 50) {
      alert('Jumlah soal harus antara 1 dan 50!');
      return;
    }
    if (timeLimit < 1) {
      alert('Waktu minimal 1 menit!');
      return;
    }

    onStartQuiz({
      amount,
      category,
      difficulty,
      type,
      timeLimit: timeLimit * 60
    });
  };

  return (
    <div className="setup-container">
      <div className="setup-box">
        <h2>Halo, {userName}! 👋</h2>
        <p>Silakan atur pengaturan quiz Anda</p>

        <div className="setup-form">
          <div className="form-group">
            <label>Jumlah Soal (1-50):</label>
            <input
              type="number"
              min="1"
              max="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Waktu Pengerjaan (menit):</label>
            <input
              type="number"
              min="1"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Kategori:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
              <option value="18">Science: Computers</option>
              <option value="27">Animals</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tingkat Kesulitan:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tipe Soal:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>

          <button onClick={handleStart} className="start-button">
            🚀 Mulai Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizSetup;