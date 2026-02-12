import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    } else {
      alert('Silakan masukkan nama Anda!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🎯Quiz App</h1>
        <p>Selamat datang! Silakan masukkan nama Anda untuk memulai.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Masukkan nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Mulai Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;