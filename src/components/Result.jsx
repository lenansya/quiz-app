import React from 'react';
import './Result.css';

function Result({ results, totalQuestions, userName, onRestart }) {
  const percentage = ((results.correct / totalQuestions) * 100).toFixed(1);

  const getGrade = () => {
    if (percentage >= 80) return { grade: 'A', message: 'Luar Biasa! 🎉', color: '#4caf50' };
    if (percentage >= 60) return { grade: 'B', message: 'Bagus! 👍', color: '#2196f3' };
    if (percentage >= 40) return { grade: 'C', message: 'Cukup Baik! 😊', color: '#ff9800' };
    return { grade: 'D', message: 'Perlu Belajar Lagi! 📚', color: '#f44336' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="result-container">
      <div className="result-box">
        <div className="result-header">
          <h2>Quiz Selesai, {userName}! 🎊</h2>
          <p>{gradeInfo.message}</p>
        </div>

        <div className="grade-circle" style={{ borderColor: gradeInfo.color }}>
          <div className="grade-letter" style={{ color: gradeInfo.color }}>
            {gradeInfo.grade}
          </div>
          <div className="grade-percentage">{percentage}%</div>
        </div>

        <div className="result-stats">
          <div className="stat-card correct">
            <div className="stat-icon">✅</div>
            <div className="stat-number">{results.correct}</div>
            <div className="stat-label">Benar</div>
          </div>

          <div className="stat-card incorrect">
            <div className="stat-icon">❌</div>
            <div className="stat-number">{results.incorrect}</div>
            <div className="stat-label">Salah</div>
          </div>

          <div className="stat-card unanswered">
            <div className="stat-icon">⏭️</div>
            <div className="stat-number">{results.unanswered}</div>
            <div className="stat-label">Tidak Dijawab</div>
          </div>

          <div className="stat-card total">
            <div className="stat-icon">📝</div>
            <div className="stat-number">{totalQuestions}</div>
            <div className="stat-label">Total Soal</div>
          </div>
        </div>

        <div className="result-actions">
          <button onClick={onRestart} className="restart-button">
            🔄 Mulai Quiz Baru
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;