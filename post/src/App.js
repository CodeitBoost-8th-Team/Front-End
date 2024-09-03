import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";
import PostModifyModal from "./components/PostModifyModal";
import PostDeleteModal from "./components/PostDeleteModal";
import PostCreatePage from "./pages/PostCreatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostDetailPage />} />
        <Route path="/modify-post" element={<PostModifyModal />} />
        <Route path="/delete-post" element={<PostDeleteModal />} />
        {/* test용 */}
        <Route path="/create-post" element={<PostCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
