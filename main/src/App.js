import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 프엔 배포 에러 해결
import MainPage from "./pages/MainPage.js"; // 프엔 배포 에러 해결

import GroupCreatePage from "./pages/group/GroupCreatePage";
import GroupDetailPage from "./pages/group/GroupDetailPage";
import PostDetail from "./pages/post/PostDetail";
import PostCreatePage from "./pages/post/PostCreatePage";
import PostModifyModal from "./components/post/PostModifyModal";
import PostDeleteModal from "./components/post/PostDeleteModal";
import CommentDelete from "./pages/comment/CommentDelete";
import CommentEdit from "./pages/comment/CommentEdit";
import PasswordPage from "./pages/group/PasswordPage";

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
        {/* 비공개 그룹 접근 비밀번호 창 */}
        <Route path="/groups/:groupId/private" element={<PasswordPage />} />

        {/* Post 관련 라우트 */}
        {/* 공개 그룹 */}
        <Route path="/posts/:postId" element={<PostDetail />} />
        {/* 비공개 그룹 */}
        {/* <Route path="/posts/:postId/private" element={<PostDetail />} /> */}
        <Route path="/groups/:groupId/posts" element={<PostCreatePage />} />
        {/* <Route path="/posts/:postId" element={<PostModifyModal />} />
        <Route path="/posts/:postId" element={<PostDeleteModal />} /> */}

        {/* Comment 관련 라우트 */}
        <Route path="/comments/:commentId/edit" element={<CommentEdit />} />
        <Route path="/comments/:commentId/delete" element={<CommentDelete />} />
      </Routes>
    </Router>
  );
}

export default App;
