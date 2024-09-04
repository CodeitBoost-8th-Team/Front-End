import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GroupCreatePage from "./pages/GroupCreatePage";
import GroupDetailPage from "./pages/GroupDetailPage";
import PasswordPage from "./pages/PasswordPage.js";
// import PostCreatePage from "../../../Post/src/pages/PostCreatePage";
// src 폴더 외의 경로는 가져올 수 없다함 (나중에 분야 모두 폴더 정리 필요할 것 같아요)
// 서버랑 연결하려면 그룹아이디 동적으로 가져와야 해서 일부 수정했어요!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-group" element={<GroupCreatePage />} />
        {/* 그룹 상세 페이지 라우트 추가 */}
        <Route path="/groups/:groupId" element={<GroupDetailPage />} />
        {/* 게시글 등록 페이지 라우트 추가 */}
        {/* <Route path="/groups/:groupId/posts" element={<PostCreatePage />} /> */}
        {/* 게시글 상세 페이지 라우트 추가 */}
        {/* <Route path="/posts/:postId"></Route> */}
        {/* 비공개 그룹 게시글 비밀번호 페이지 라우트 추가 */}
        <Route path="/groups/:groupId/private" element={<PasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
