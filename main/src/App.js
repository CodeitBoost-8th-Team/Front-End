import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GroupCreatePage from "./pages/group/GroupCreatePage";
import GroupDetailPage from "./pages/group/GroupDetailPage";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostCreatePage from "./pages/post/PostCreatePage";
import PostModifyModal from "./components/post/PostModifyModal";
import PostDeleteModal from "./components/post/PostDeleteModal";
import CommentDelete from "./pages/comment/CommentDelete";
import CommentEdit from "./pages/comment/CommentEdit";

// 전체 앱의 라우팅 설정을 통합한 App 컴포넌트
function App() {
  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route path="/" element={<MainPage />} />

        {/* Group 관련 라우트 */}
        <Route path="/create-group" element={<GroupCreatePage />} />
        <Route path="/groups/:groupId" element={<GroupDetailPage />} />

        {/* Post 관련 라우트 */}
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/create-post" element={<PostCreatePage />} />
        <Route path="/modify-post" element={<PostModifyModal />} />
        <Route path="/delete-post" element={<PostDeleteModal />} />

        {/* Comment 관련 라우트 */}
        <Route path="/comments/:commentId/edit" element={<CommentEdit />} />
        <Route path="/comments/:commentId/delete" element={<CommentDelete />} />
      </Routes>
    </Router>
  );
}

export default App;
