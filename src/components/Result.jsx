import React from 'react';
import './Result.css';

function Result({ results, totalQuestions, userName, timeTaken, onRestart }) {
  const percentage = ((results.correct / totalQuestions) * 100).toFixed(1);

  const getGrade = () => {
    if (percentage >= 80) return { grade: 'A', message: 'Luar Biasa! 🎉' };
    if (percentage >= 60) return { grade: 'B', message: 'Bagus! 👍' };
    if (percentage >= 40) return { grade: 'C', message: 'Cukup Baik! 😊' };
    return { grade: 'D', message: 'Perlu Belajar Lagi! 📚' };
  };

  const gradeInfo = getGrade();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}d`;
  };

  return (
    <div className="result-container">
      <div className="result-box">

        <div className="result-header">
          <h2>Quiz Selesai, {userName}! 🎊</h2>
          <p>{gradeInfo.message}</p>
        </div>

        <div className="grade-circle">
          <div className="grade-letter">{gradeInfo.grade}</div>
          <div className="grade-percentage">{percentage}%</div>
        </div>

        <div className="result-divider"></div>

        <div className="result-stats">
          <div className="stat-card correct">
            <div className="stat-number">{results.correct}</div>
            <div className="stat-label">Benar</div>
          </div>
          <div className="stat-card incorrect">
            <div className="stat-number">{results.incorrect}</div>
            <div className="stat-label">Salah</div>
          </div>
          <div className="stat-card unanswered">
            <div className="stat-number">{results.unanswered}</div>
            <div className="stat-label">Dilewati</div>
          </div>
        </div>

        <div className="result-meta">
          <div className="meta-item">
            <div>
              <div className="meta-label">Waktu</div>
              <div className="meta-value">{timeTaken ? formatTime(timeTaken) : '-'}</div>
            </div>
          </div>
          <div className="meta-item">
            <div>
              <div className="meta-label">Akurasi</div>
              <div className="meta-value">{percentage}%</div>
            </div>
          </div>
          <div className="meta-item">
            <div>
              <div className="meta-label">Total Soal</div>
              <div className="meta-value">{totalQuestions}</div>
            </div>
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