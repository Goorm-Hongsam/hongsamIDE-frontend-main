import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Question from './Pages/Question';
import { AuthProvider } from './api/AuthContext';
import DarkModeToggle from './Components/DarkModeToggle';
import Chat from './Pages/Chat';
import Mypage from './Pages/Mypage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 페이지 로드 시 로컬 스토리지에서 다크 모드 설정 불러오기
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      const darkMode = storedDarkMode === 'true';
      setIsDarkMode(darkMode);
    }
  }, [setIsDarkMode]);

  // body의 배경색을 설정
  useEffect(() => {
    // 기존의 별 삭제
    const existingStars = document.querySelectorAll('.star');
    existingStars.forEach((star) => {
      document.body.removeChild(star);
    });

    if (isDarkMode) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';

      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 1 + 0.9}s`;
        document.body.appendChild(star);
      }
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  }, [isDarkMode]); // isDarkMode가 변경될 때만 실행

  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <DarkModeToggle setIsDarkMode={setIsDarkMode} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/question" element={<Question />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
