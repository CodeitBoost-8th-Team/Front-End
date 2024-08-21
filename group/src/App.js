import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GroupCreatePage from './pages/GroupCreatePage';
import GroupDetailPage from './pages/GroupDetailPage'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-group" element={<GroupCreatePage />} />
        <Route path="/groups/:groupId" element={<GroupDetailPage />} /> {/* 그룹 상세 페이지 라우트 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
