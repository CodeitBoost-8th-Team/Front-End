import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GroupCreatePage from "./pages/GroupCreatePage";
import GroupDetailPage from "./pages/GroupDetailPage";
// import PostCreatePage from "../../../Post/src/pages/PostCreatePage";
// src 폴더 외의 경로는 가져올 수 없다함 (나중에 분야 모두 폴더 정리 필요할 것 같아요)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-group" element={<GroupCreatePage />} />
        {/* 그룹 상세 페이지 라우트 추가 */}
        {/* <Route path="/groups/:groupId" element={<GroupDetailPage />} /> */}
        <Route path="/groups/groupId" element={<GroupDetailPage />} />
        {/* 게시글 추가 페이지 라우트 추가 */}
        {/* <Route path="/groups/{groupId}/posts" element={<PostCreatePage />} /> */}
        {/* <Route path="/groups/groupId/posts" element={<PostCreatePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
