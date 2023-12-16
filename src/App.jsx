import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './Pages/Main';
import QuestionList from './Pages/QuestionList';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Mypage from './Pages/Mypage';
import Chat from './Chat/Chat';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/question" element={<QuestionList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
