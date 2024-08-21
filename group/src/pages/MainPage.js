// src/pages/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate('/create-group');
  };

  return (
    <div>
      <h1>조각집에 오신 것을 환영합니다</h1>
      <button onClick={handleCreateGroup}>그룹 만들기</button>
    </div>
  );
};

export default MainPage;
